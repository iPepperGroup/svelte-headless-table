<script lang="ts">
  import type { Readable, Writable } from 'svelte/store';

  interface Props {
    isSelected: Writable<boolean>;
    isSomeSubRowsSelected: Readable<boolean>;
  }

  let { isSelected, isSomeSubRowsSelected }: Props = $props();
</script>

<input type="checkbox" bind:checked={$isSelected} indeterminate={$isSomeSubRowsSelected} />
