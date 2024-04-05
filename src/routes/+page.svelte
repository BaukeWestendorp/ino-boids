<script>
	import imgMarley from '$lib/img/marley.png';
	import Boids from './Boids.svelte';

	let page;
	$: pageWidth = page?.getBoundingClientRect().width ?? 0;
</script>

<article bind:this={page}>
	<section>
		<h2 id="introductie">Introductie</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo magnam natus magni earum,
			distinctio aliquid suscipit odit. Expedita perferendis sed non, itaque voluptas iusto ut sunt
			iste vel cum vitae.
		</p>
	</section>

	<section id="ontmoet-marley">
		<h2>Ontmoet Marley</h2>
		<img class="marley" src={imgMarley} alt="Marley de spreeuw" />
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam cumque ea alias corporis
			illum, fuga nesciunt ipsa voluptatem in iure quos. Iusto cum accusamus, eaque recusandae
			expedita sit eum nostrum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
			necessitatibus aliquid ratione dolores voluptatibus voluptates. Voluptatem quisquam, deserunt
			obcaecati ab ratione sit quod, similique iure saepe eius aliquam a excepturi?
		</p>
	</section>

	<section id="marley-en-haar-vriendjes">
		<h2>Marley en haar vriendjes</h2>
		{#if pageWidth > 0}
			<Boids width={pageWidth} height={400} />
		{/if}
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam cumque ea alias corporis
			illum, fuga nesciunt ipsa voluptatem in iure quos. Iusto cum accusamus, eaque recusandae
			expedita sit eum nostrum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
			necessitatibus aliquid ratione dolores voluptatibus voluptates. Voluptatem quisquam, deserunt
			obcaecati ab ratione sit quod, similique iure saepe eius aliquam a excepturi?
		</p>
	</section>

	<section id="separation">
		<h2>Separation</h2>
		{#if pageWidth > 0}
			<Boids width={pageWidth} height={400} separation />
		{/if}
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam cumque ea alias corporis
			illum, fuga nesciunt ipsa voluptatem in iure quos. Iusto cum accusamus, eaque recusandae
			expedita sit eum nostrum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
			necessitatibus aliquid ratione dolores voluptatibus voluptates. Voluptatem quisquam, deserunt
			obcaecati ab ratione sit quod, similique iure saepe eius aliquam a excepturi?
		</p>
	</section>

	<section id="alignment">
		<h2>Alignment</h2>
		{#if pageWidth > 0}
			<Boids width={pageWidth} height={400} separation alignment />
		{/if}
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam cumque ea alias corporis
			illum, fuga nesciunt ipsa voluptatem in iure quos. Iusto cum accusamus, eaque recusandae
			expedita sit eum nostrum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
			necessitatibus aliquid ratione dolores voluptatibus voluptates. Voluptatem quisquam, deserunt
			obcaecati ab ratione sit quod, similique iure saepe eius aliquam a excepturi?
		</p>
	</section>

	<section id="cohesion">
		<h2>Cohesion</h2>
		{#if pageWidth > 0}
			<Boids width={pageWidth} height={400} separation alignment cohesion />
		{/if}
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam cumque ea alias corporis
			illum, fuga nesciunt ipsa voluptatem in iure quos. Iusto cum accusamus, eaque recusandae
			expedita sit eum nostrum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
			necessitatibus aliquid ratione dolores voluptatibus voluptates. Voluptatem quisquam, deserunt
			obcaecati ab ratione sit quod, similique iure saepe eius aliquam a excepturi?
		</p>
	</section>
</article>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		margin-bottom: 2rem;
	}

	section:last-child {
		margin-bottom: 0;
	}

	#ontmoet-marley .marley {
		width: 20rem;
	}

	h2 {
		text-align: center;
	}
</style>
