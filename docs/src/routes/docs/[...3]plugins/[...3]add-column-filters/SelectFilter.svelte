<script lang="ts" module>
  export const getDistinct = (items: unknown[]): unknown[] => {
    return Array.from(new Set(items));
  };
</script>

<script lang="ts">
  import { createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { Readable, Writable } from 'svelte/store';

  interface Props {
    filterValue: Writable<string | undefined>;
    preFilteredValues: Readable<unknown[]>;
  }

  let { filterValue, preFilteredValues }: Props = $props();
  let uniqueValues = $derived(getDistinct($preFilteredValues));
</script>

<select bind:value={$filterValue} onclick={stopPropagation(bubble('click'))} class="demo">
  <option value={undefined}>All</option>
  {#each uniqueValues as value}
    <option {value}>{value}</option>
  {/each}
</select>
