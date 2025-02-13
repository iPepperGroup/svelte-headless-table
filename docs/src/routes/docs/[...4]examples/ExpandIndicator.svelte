<script lang="ts">
  import type { Readable, Writable } from 'svelte/store';

  interface Props {
    isExpanded: Writable<boolean>;
    canExpand: Readable<boolean>;
    isAllSubRowsExpanded: Readable<boolean>;
    depth: number;
  }

  let {
    isExpanded,
    canExpand,
    isAllSubRowsExpanded,
    depth
  }: Props = $props();
</script>

{#if $canExpand}
  <span onclick={() => ($isExpanded = !$isExpanded)} style:--depth={depth}>
    {#if $isExpanded}
      {#if $isAllSubRowsExpanded}
        ⬇️
      {:else}
        ↘️
      {/if}
    {:else}
      ➡️
    {/if}
  </span>
{/if}

<style>
  span {
    padding-left: calc(var(--depth) * 1rem);
  }
</style>
