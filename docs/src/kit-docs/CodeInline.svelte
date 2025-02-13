<script lang="ts">
  import hljs from 'highlight.js';
  import { getHljsLang } from '$lib/utils/useHljs';

  interface Props {
    code: string;
  }

  let { code }: Props = $props();
  const language = getHljsLang();
  const codeHtml = language !== undefined ? hljs.highlight(code, { language }).value : undefined;
</script>

<code>
  {#if codeHtml !== undefined}
    {@html codeHtml}
  {:else}
    {code}
  {/if}
</code>
