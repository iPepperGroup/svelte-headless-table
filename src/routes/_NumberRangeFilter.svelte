<script lang="ts">
	import { createBubbler, stopPropagation } from 'svelte/legacy';

	const bubble = createBubbler();
	import { isNumber } from '../lib/utils/filter.js';
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
		placeholder="Min ({min})"
	/>
	to
	<input
		type="number"
		bind:value={$filterValue[1]}
		onclick={stopPropagation(bubble('click'))}
		placeholder="Max ({max})"
	/>
</div>

<style>
	div {
		display: flex;
		gap: 0.5rem;
	}
</style>
