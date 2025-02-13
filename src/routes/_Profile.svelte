<script lang="ts">
	interface Props {
		name: string;
		age: number;
		progress: number;
	}

	let { name, age, progress }: Props = $props();
</script>

<div>{name}, <strong>{age}</strong></div>
<div>{progress} / 100</div>

<style>
	div {
		font-size: 0.875rem;
	}
</style>
