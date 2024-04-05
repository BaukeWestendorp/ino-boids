<script>
	import imgMarley from '$lib/img/marley.png';
	import Boids from './Boids.svelte';
	import CodeBlock from './CodeBlock.svelte';
	import Sketch from './Sketch.svelte';

	let page;
	$: pageWidth = page?.getBoundingClientRect().width ?? 0;
</script>

<article bind:this={page}>
	<section>
		<h2 id="introductie">Introductie</h2>
		<p>
			Het Boids-algoritme, bedacht door Craig Reynolds in 1987, is een simulatie van hoe vogels,
			vissen en insecten in groepen bewegen. Het werkt met drie simpele regels: blijf uit de buurt
			van anderen (<i>Seperation</i>), volg de richting van je buren (<i>Alignment</i>) en blijf bij
			de groep (<i>Cohesion</i>). Als je deze regels volgt, kun je een zwerm simuleren die er net zo
			uitziet als echte dieren. Mensen gebruiken dit algoritme om games, animatiefilms en zelfs
			verkeerssimulaties realistischer te maken.
		</p>
		<p>In dit artiekel ga ik er vanuit dat je al enige kennis hebt over JavaScript.</p>
	</section>

	<section id="ontmoet-marley">
		<h2>Ontmoet Marley</h2>
		<img class="marley" src={imgMarley} alt="Marley de spreeuw" />
		<p>
			Dit is Marley de spreeuw. Spreeuwen vliegen vaak in grote zwermen, net zoals dit algoritme kan
			simuleren! Marley gaat je op weg helpen om te snappen hoe je dit algoritme kunt implementeren
			in JavaScript.
		</p>
	</section>

	<section>
		<h2>Marley in code</h2>
		<p>
			Om Marley te simuleren moeten we eerst bedenken hoe we haar in code kunnen representeren.
			Hiervoor hebben we eerst een plek nodig om haar in te plaatsen.
			<br />
			Ik heb er voor gekozen om de <a href="https://p5js.org">p5js</a> library te gebruiken. Dit is
			een toegankelijke <i>Creative Coding</i> library.
			<br />
			Om een lege sketch met een lichtblauwe achtergrond te maken kun je de volgende code gebruiken.
		</p>
		<CodeBlock code="p5jsInitial" />
		<p>Dit geeft het volgende resultaat.</p>
		<Sketch width={pageWidth} height={400} sketchName="empty" />
		<p>Best saai nog...</p>
		<p>
			Om hier iets aan te doen moeten we eerst beschrijven wat een boid is. In JavaScript kun je
			hier een
			<code class="inline">class</code>
			voor gebruiken.
			<br />
			De in de <code class="inline">constructor</code> zetten we de code die de
			<code class="inline">Boid</code> initialiseerd.
		</p>
		<CodeBlock code="boidClass1" />
		<p>Nu moeten we een aantal boids maken. Laten we beginnen met 100 boids in de lucht.</p>
		<CodeBlock code="addBoids" highlightedLines={[0, 1, 8, 9, 10, 11, 12, 13, 14]} />
		<p>
			Op dit moment bestaan de boids wel, maar laten we ze nog niet zien op het scherm. Daar gaan we
			wat aan doen!
		</p>
		<p>
			We voegen aan de <code class="inline">Boid</code> class een
			<code class="inline">draw</code> functie toe.
			<br />
			In deze functie tekenen we de boid op het scherm met een paar simpele regels.
			<br />
			Vervolgens moeten we deze <code class="inline">draw</code>
			fuctie op iedere boid in de <code class="inline">boids</code> lijst callen in de
			<code class="inline">draw</code> functie van de sketch. Dit doen we met een for-loop.
		</p>
		<CodeBlock
			code="renderBoids"
			highlightedLines={[4, 5, 6, 7, 8, 14, 15, 16, 17, 18, 19, 20, 21]}
		/>

		<p>Nu zijn de boids te zien op het canvas.</p>
		<Sketch width={pageWidth} height={400} sketchName="boidDots" />
	</section>

	<section>
		<h2>Beweging</h2>
	</section>

	<!-- <section id="marley-en-haar-vriendjes">
		<h2>Marley en haar vriendjes</h2>
		{#if pageWidth > 0}
			<Boids width={pageWidth} height={400} />
		{/if}
		<p>
			Dit zijn Marley en haar vriendjes. Marley kun je altijd terug vinden in het rood! Op het
			moment vliegen ze alleen maar in het rond. Soms botsen ze zelfs tegen elkaar aan... Dit moet
			toch beter kunnen?
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
	</section> -->
</article>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		margin-bottom: 2rem;
	}

	section:last-child {
		margin-bottom: 0;
	}

	#ontmoet-marley .marley {
		width: 20rem;
		margin: 0 auto;
	}

	h2 {
		text-align: center;
	}
</style>
