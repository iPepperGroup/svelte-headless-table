<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  type ButtonVariant = 'filled' | 'unfilled';
  type ButtonSize = 'lg' | 'md';

  type $$Props = {
    variant?: ButtonVariant;
    size?: ButtonSize;
  } & (
    | ({ href?: never } & Partial<HTMLButtonElement>)
    | ({ href: string } & Partial<HTMLAnchorElement>)
  );

  interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { variant = 'filled', size = 'md', children, ...rest }: Props = $props();
</script>

<svelte:element
  this={rest.href === undefined ? 'button' : 'a'}
  {...rest}
  class="button {variant} {size}"
  onclick={bubble('click')}
>
  {@render children?.()}
</svelte:element>

<style lang="postcss">
  .button {
    @apply rounded-xl shadow;
    @apply transition-colors;
    @apply focus-visible:ring-2 ring-brand ring-offset-2;

    /* reset anchor tag */
    @apply no-underline border-b-0 font-normal cursor-pointer;

    &.lg {
      @apply px-6 py-3;
    }
    &.md {
      @apply px-4 py-1;
    }

    &:hover {
      @apply opacity-80;
    }
    &:active {
      @apply opacity-60;
    }

    &.filled {
      @apply bg-brand text-white font-bold;
    }

    &.unfilled {
      @apply text-brand font-bold;
      :global(.dark) & {
        @apply text-white;
      }
    }
  }
</style>
