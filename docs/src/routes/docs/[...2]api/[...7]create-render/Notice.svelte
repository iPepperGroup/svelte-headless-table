<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  interface Props {
    count?: number;
  }

  let { count = 0 }: Props = $props();
</script>

<button onclick={bubble('click')} class="py-2 px-4 bg-primary text-white rounded-lg">
  I've been clicked {count} times
</button>
