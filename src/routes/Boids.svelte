<script>
	import P5 from 'p5-svelte';
	import { createSketch } from '$lib/sketches/boids.js';
	import { onMount } from 'svelte';

	export let width;
	export let height;
	export let separation = false;
	export let alignment = false;
	export let cohesion = false;

	let sketch;

	onMount(() => {
		sketch = createSketch(width, height, separation, alignment, cohesion);
	});
</script>

<P5 {sketch} />
