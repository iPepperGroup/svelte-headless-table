<script lang="ts">
  import type { Writable, Readable } from 'svelte/store';

  interface Props {
    filterValue: Writable<string>;
    values: Readable<string[]>;
    preFilteredValues: Readable<string[]>;
  }

  let { filterValue, values, preFilteredValues }: Props = $props();
</script>

<label for="filter-input">
  {$values.length} out of {$preFilteredValues.length}
</label>
<input
  id="filter-input"
  class="demo"
  type="text"
  bind:value={$filterValue}
  placeholder="filter..."
/>

<style>
  input {
    width: 8rem;
  }
</style>
