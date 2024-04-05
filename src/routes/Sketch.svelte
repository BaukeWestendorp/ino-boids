<script>
	import P5 from 'p5-svelte';
	import { onMount } from 'svelte';

	export let sketchName;
	export let width;
	export let height;
	export let options = {};

	let sketch;

	onMount(async () => {
		const createSketch = await import(`$lib/sketches/${sketchName}.js`);
		sketch = createSketch.default(width, height, options);
	});
</script>

<div class="sketch">
	{#if sketch}
		<P5 {sketch} />
	{/if}
</div>

<style>
	.sketch {
		width: 100%;
		height: 100%;

		background: var(--light-blue);
		border-radius: 6px;

		overflow: hidden;
	}
</style>
