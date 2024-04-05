<script>
	import Sketch from './Sketch.svelte';

	export let width;
	export let height;
	export let separation = false;
	export let alignment = false;
	export let cohesion = false;
</script>

<Sketch {width} {height} sketchName="boids" options={{ separation, alignment, cohesion }} />
