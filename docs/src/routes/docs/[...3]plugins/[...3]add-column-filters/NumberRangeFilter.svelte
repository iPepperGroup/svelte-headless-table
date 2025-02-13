<script lang="ts" module>
  export const isNumber = (value: unknown): value is number => typeof value === 'number';
</script>

<script lang="ts">
  import { createBubbler, stopPropagation } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { Readable, Writable } from 'svelte/store';


  interface Props {
    filterValue: Writable<[number | null, number | null]>;
    values: Readable<unknown[]>;
  }

  let { filterValue, values }: Props = $props();
  let min = $derived($values.length === 0 ? 0 : Math.min(...$values.filter(isNumber)));
  let max = $derived($values.length === 0 ? 0 : Math.max(...$values.filter(isNumber)));
</script>

<div>
  <input
    type="number"
    bind:value={$filterValue[0]}
    onclick={stopPropagation(bubble('click'))}
    class="demo"
    placeholder="Min ({min})"
  />
  to
  <input
    type="number"
    bind:value={$filterValue[1]}
    onclick={stopPropagation(bubble('click'))}
    class="demo"
    placeholder="Max ({max})"
  />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
  }
  input {
    width: 5rem;
  }
</style>
