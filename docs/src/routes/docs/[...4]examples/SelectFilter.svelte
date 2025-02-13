<script lang="ts">
  import { createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import { getDistinct } from '$lib/utils/array';

  import type { Readable, Writable } from 'svelte/store';

  interface Props {
    filterValue: Writable<string>;
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
