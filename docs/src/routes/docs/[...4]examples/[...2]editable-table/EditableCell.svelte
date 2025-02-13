<script lang="ts">
  import { run, preventDefault } from 'svelte/legacy';

  import type { DataColumn, BodyRow } from 'svelte-headless-table';

  interface Props {
    row: BodyRow<any>;
    column: DataColumn<any>;
    value: unknown;
    onUpdateValue: (rowDataId: string, columnId: string, newValue: unknown) => void;
  }

  let {
    row,
    column,
    value = $bindable(),
    onUpdateValue
  }: Props = $props();

  let isEditing = $state(false);

  let inputElement: HTMLInputElement | undefined = $state();
  run(() => {
    if (isEditing) {
      inputElement?.focus();
    }
  });

  const handleCancel = () => {
    isEditing = false;
  };
  const handleSubmit = () => {
    isEditing = false;
    if (row.isData()) {
      onUpdateValue(row.dataId, column.id, value);
    }
  };
</script>

<div>
  {#if !isEditing}
    <span onclick={() => (isEditing = true)}>
      {value}
    </span>
  {:else}
    <form onsubmit={preventDefault(handleSubmit)}>
      <input bind:this={inputElement} type="text" bind:value />
      <button type="submit">✅</button>
      <button onclick={handleCancel}>❌</button>
    </form>
  {/if}
</div>

<style>
  form {
    display: flex;
    gap: 0.5rem;
  }
</style>
