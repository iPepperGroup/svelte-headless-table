<script lang="ts">
	import { createBubbler, stopPropagation } from 'svelte/legacy';

	const bubble = createBubbler();
	import type { Readable, Writable } from 'svelte/store';

	interface Props {
		filterValue: Writable<string>;
		values: Readable<string[]>;
	}

	let { filterValue, values }: Props = $props();
</script>

<input
	type="text"
	bind:value={$filterValue}
	onclick={stopPropagation(bubble('click'))}
	placeholder="Search {$values.length} records..."
/>
