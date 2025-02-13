<script lang="ts">
  interface Props {
    label: string;
    order: string | undefined;
    toggle: (ev: Event) => void;
  }

  let { label, order, toggle }: Props = $props();
  let indicator = $derived(order === 'asc' ? '🔼' : order === 'desc' ? '🔽' : '');
</script>

<div onclick={toggle}>{label} {indicator}</div>