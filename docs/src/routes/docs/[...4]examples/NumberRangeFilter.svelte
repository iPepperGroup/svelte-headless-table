<script lang="ts">
  import { createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { Readable, Writable } from 'svelte/store';
  import { isNumber } from '$lib/utils/filter';


  interface Props {
    filterValue: Writable<[number | null, number | null]>;
    values: Readable<unknown[]>;
  }

  let { filterValue, values }: Props = $props();
  let min = $derived($values.length === 0 ? 0 : Math.min(...$values.filter(isNumber)));
  let max = $derived($values.length === 0 ? 0 : Math.max(...$values.filter(isNumber)));
</script>

<div class="flex items-center">
  <input
    type="number"
    bind:value={$filterValue[0]}
    onclick={stopPropagation(bubble('click'))}
    placeholder="Min ({min})"
    class="demo"
  />
  to
  <input
    type="number"
    bind:value={$filterValue[1]}
    onclick={stopPropagation(bubble('click'))}
    placeholder="Max ({max})"
    class="demo"
  />
</div>

<style>
  div {
    display: flex;
    gap: 0.5rem;
  }
</style>
