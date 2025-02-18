<script lang="ts">
  import { run } from 'svelte/legacy';

  import { getI18nContext } from '@svelteness/kit-docs';
  import clsx from 'clsx';
  import CopyFileIcon from '~icons/ri/file-copy-line';

  interface Props {
    lang?: string | null;
    ext?: string | null;
    code?: string | null;
    rawCode?: string | null;
    title?: string | null;
    linesCount?: any;
    showLineNumbers?: boolean;
    highlightLines?: [number, number][];
    showCopyCode?: boolean;
    copyHighlightOnly?: boolean;
    copySteps?: boolean;
  }

  let {
    lang = null,
    ext = null,
    code = null,
    rawCode = null,
    title = null,
    linesCount = (code?.match(/"line"/g) || []).length,
    showLineNumbers = false,
    highlightLines = [],
    showCopyCode = false,
    copyHighlightOnly = false,
    copySteps = false
  }: Props = $props();

  const i18n = getI18nContext();

  let currentStep = $state(1);
  let stepHighlightLines: [number, number][] = $state([]);

  run(() => {
    if (copySteps) {
      stepHighlightLines = [highlightLines[currentStep - 1] ?? [currentStep, currentStep]];
    }
  });

  let currentHighlightedLines = $derived(copySteps ? stepHighlightLines : highlightLines);

  const isHighlightLine = (lineNumber: number, currentHighlightedLines: [number, number][]) =>
    currentHighlightedLines.some(([start, end]) => lineNumber >= start && lineNumber <= end);

  // `linesCount-1` since last line is always empty (prettier)
  let lines = $derived([...Array(linesCount - 1).keys()].map((n) => n + 1));

  let unescapedRawCode = $derived(rawCode?.replace(/&#8203/g, ''));

  let showCopiedCodePrompt = $state(false);
  async function copyCodeToClipboard() {
    try {
      const copiedCode =
        currentHighlightedLines.length > 0 && (copyHighlightOnly || copySteps)
          ? unescapedRawCode
              ?.split('\n')
              .filter((_, i) => isHighlightLine(i + 1, currentHighlightedLines))
              .join('\n')
          : unescapedRawCode;
      await navigator.clipboard.writeText(copiedCode ?? '');
    } catch (e) {
      // no-op
    }

    showCopiedCodePrompt = true;
    if (copySteps) {
      const nextStep = currentStep + 1;
      const maxSteps = highlightLines.length > 0 ? highlightLines.length : lines.length;
      currentStep = nextStep > maxSteps ? 1 : nextStep;
    }
  }

  run(() => {
    if (showCopiedCodePrompt) {
      setTimeout(() => {
        showCopiedCodePrompt = false;
      }, 400);
    }
  });

  let showTopBar = $derived(title || showCopyCode);
  let hasTopbarTitle = $derived(title || ext);
  let topbarTitle = $derived(title ?? (ext === 'sh' ? 'terminal' : ext?.toUpperCase()));
</script>

<div
  class={clsx(
    'code-fence overflow-y-auto relative my-8 rounded-md shadow-lg mx-auto',
    'border border-gray-100 dark:border-gray-800',
    lang && `lang-${lang}`,
    ext && `ext-${ext}`,
  )}
>
  {#if showTopBar}
    <div
      class="sticky top-0 left-0 z-10 flex items-center pt-2 pb-1 rounded-md backdrop-blur supports-backdrop-blur:bg-white/60"
      style="background-color: var(--kd-code-fence-top-bar-bg);"
    >
      {#if hasTopbarTitle}
        <span class="ml-3.5 font-mono text-sm text-gray-300">{topbarTitle}</span>
      {/if}

      <div class="flex-1"></div>

      {#if showCopyCode}
        <button
          type="button"
          class="px-2 py-1 mr-2 hover:opacity-70 active:opacity-50"
          onclick={copyCodeToClipboard}
        >
          <div
            class={clsx(
              'text-white absolute top-2.5 right-4 transition-opacity z-10 duration-300 px-2 py-1 rounded-md ease-out text-sm font-mono',
              showCopiedCodePrompt ? 'opacity-100' : 'hidden opacity-0',
            )}
            aria-hidden="true"
            style="background-color: var(--kd-code-copied-bg-color);"
          >
            {$i18n?.code.copied}
          </div>

          <CopyFileIcon
            width="24"
            height="24"
            class={clsx(
              showCopiedCodePrompt
                ? 'opacity-0'
                : 'opacity-100 transition-opacity duration-600 ease-in',
            )}
          />
          <span class="sr-only">{$i18n?.code.copy}</span>
        </button>
      {/if}
    </div>
  {/if}

  <div class="relative z-0 overflow-hidden code">
    <div
      class={clsx(
        showLineNumbers && 'pl-10',
        'bg-white dark:bg-gray-900 [&>pre]:bg-transparent [&>pre]:brightness-[0.6] [&>pre]:dark:brightness-100 [&>pre]:saturate-[2.5] [&>pre]:dark:saturate-100 [&>pre]:hue-rotate-[10deg] [&>pre]:dark:hue-rotate-0',
      )}
    >
      {@html code}
    </div>

    {#if showLineNumbers}
      <pre
        class="absolute top-3.5 left-0 m-0 flex flex-col text-sm leading-[27px]"
        style="background-color: transparent; border-radius: 0; padding-top: 0;">
        <div
          class="flex-none hidden text-right select-none text-slate-600 992:block"
          aria-hidden="true">{lines.join('\n')}</div>
      </pre>
    {/if}

    {#if currentHighlightedLines.length > 0}
      <div
        class="pointer-events-none absolute inset-0 mt-[0.7em] h-full w-full leading-[27px]"
        aria-hidden="true"
      >
        {#each lines as lineNumber}
          {#if isHighlightLine(lineNumber + 1, currentHighlightedLines)}
            <div
              class="w-full border-l-[5px] font-mono text-transparent"
              style="border-color: var(--kd-code-highlight-border); background-color: var(--kd-code-highlight-color);"
            >
              &nbsp;
            </div>
          {:else}
            <br />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>
