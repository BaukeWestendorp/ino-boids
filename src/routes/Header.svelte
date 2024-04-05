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
	<div class="overlay title">
		<h1>Boids</h1>
	</div>

	<div class="overlay scroll">
		<div>
			<p>Scroll naar beneden!</p>
			<p class="arrow">V</p>
		</div>
	</div>
	{#if headerBounds}
		<Boids width={headerBounds.width} height={headerBounds.height} separation alignment cohesion />
	{/if}
</header>

<style>
	header {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.overlay {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.overlay.title {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.overlay.scroll .arrow {
		margin-top: 2rem;

		display: flex;
		justify-content: center;

		font-size: 60px;
	}

	@keyframes bounce {
		from {
			bottom: 15vh;
		}

		to {
			bottom: 10vh;
		}
	}

	.overlay.scroll {
		display: flex;
		justify-content: center;
		align-items: end;

		bottom: 10vh;

		font-size: 40px;
		font-weight: bold;
		color: var(--blue);

		animation-name: bounce;
		animation-duration: 1s;
		animation-direction: alternate;
		animation-iteration-count: infinite;
	}

	h1 {
		color: var(--dark-blue);
	}
</style>
