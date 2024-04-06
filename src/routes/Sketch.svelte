<script>
	import P5 from 'p5-svelte';
	import { onMount } from 'svelte';

	export let sketchName;
	export let width;
	export let height;
	export let options = {};

	let sketch;
	let sketchElement;

	let running = false;

	function isRunning() {
		return running;
	}

	onMount(async () => {
		let sketchModule = await import(`$lib/sketches/${sketchName}.js`);
		sketch = sketchModule.default(width, height, isRunning, options);

		let intersectionOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.0
		};

		let observer = new IntersectionObserver((entries, observer) => {
			running = entries[0].isIntersecting;
		}, intersectionOptions);

		observer.observe(sketchElement);
	});
</script>

<div bind:this={sketchElement} class="sketch">
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
