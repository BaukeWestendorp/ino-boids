<script>
	import { onMount } from 'svelte';
	import Boids from './Boids.svelte';

	let headerBounds;
	onMount(() => {
		headerBounds = header.getBoundingClientRect();
	});

	let header;
</script>

<header bind:this={header}>
	<div class="overlay">
		<h1>Boids</h1>
	</div>
	{#if headerBounds}
		<Boids width={headerBounds.width} height={headerBounds.height} separation alignment cohesion />
	{/if}
</header>

<style>
	header {
		width: 100vw;
		height: 50rem;
		position: relative;
	}

	.overlay {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		color: var(--dark-blue);
	}
</style>
