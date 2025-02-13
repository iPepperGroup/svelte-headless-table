<script lang="ts" module>
  export const isNumber = (value: unknown): value is number => typeof value === 'number';
</script>

<script lang="ts">
  import { createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { Readable, Writable } from 'svelte/store';


  interface Props {
    filterValue: Writable<number | undefined>;
    preFilteredValues: Readable<unknown[]>;
  }

  let { filterValue, preFilteredValues }: Props = $props();
  let min = $derived($preFilteredValues.length === 0 ? 0 : Math.min(...$preFilteredValues.filter(isNumber)));
  let max = $derived($preFilteredValues.length === 0 ? 0 : Math.max(...$preFilteredValues.filter(isNumber)));
</script>

<input type="range" {min} {max} bind:value={$filterValue} onclick={stopPropagation(bubble('click'))} />
