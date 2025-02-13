<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();

	onMount(() => {
		console.log('mount Italic');
		return () => {
			console.log('unmount Italic');
		};
	});
</script>

<em>{text}</em>
