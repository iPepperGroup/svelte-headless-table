<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div>
  {@render children?.()}
</div>

<style lang="postcss">
  div {
    @apply px-4 border-2 rounded-lg text-sm;
    @apply border-gray-200 bg-gray-100/50;
    :global(.dark) & {
      @apply border-gray-800 bg-gray-800/50;
    }
  }
</style>
