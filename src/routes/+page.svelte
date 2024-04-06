<script>
	import imgMarley from '$lib/img/marley.png';
	import imgSeparation from '$lib/img/separation.png';
	import imgAlignment from '$lib/img/alignment.png';
	import imgCohesion from '$lib/img/cohesion.png';

	import CodeBlock from './CodeBlock.svelte';
	import Sketch from './Sketch.svelte';

	let page;
	$: pageWidth = page?.getBoundingClientRect().width ?? 0;
</script>

<article bind:this={page}>
	<section>
		<h2 id="introductie">Introductie</h2>
		<p>
			Het boids-algoritme, bedacht door Craig Reynolds in 1987, is een simulatie van hoe vogels,
			vissen en insecten in groepen bewegen. Het werkt met drie simpele regels: blijf uit de buurt
			van anderen (<i>Separation</i>), volg de richting van je buren (<i>Alignment</i>) en blijf bij
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
		<p>
			Om de Marley te laten bewegen hebben we wat meer code nodig. Eerst moet ze weten welke
			richting ze op moet. Dit doen we met een vector. Een vector is eigenlijk heel simpel. Het
			heeft een X waarde en een Y waarde.
			<br />
			Om aan te geven welke kant ze op moet, moet ze weten hoeveel ze naar links of naar rechts moet
			(X), en hoeveel naar voren of naar achter (Y).
			<br />
			Zo kunnen we dus de richting in een 'snelheidsvector' zetten, die aangeeft hoe snel ze naar welke
			kant moet bewegen. Ook is het handig om de versnelling te gebruiken om de snelheid te berekenen.
		</p>
		<CodeBlock code="boidMovement1" highlightedLines={[3, 4, 5, 6, 7, 8]} />
		<p>
			Vervolgens moeten we deze informatie gebruiken om de snelheid van de boid te veranderen. Dit
			doen we met de volgende code:
		</p>
		<CodeBlock
			code="boidMovement2"
			highlightedLines={[5, 6, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]}
		/>
		<Sketch width={pageWidth} height={400} sketchName="boidMovement" />
		<p>
			Top! Nu bewegen ze.
			<br />
			We zitten alleen nog met een probleem. Als ze weg gaan van het scherm komen ze nooit meer terug.
			Hier kunnen we ook wat aan doen.
		</p>
		<CodeBlock
			code="borderWrap"
			highlightedLines={[7, 8, 18, 19, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]}
		/>
		<p>
			Als de boid over de rand gaat, zetten we de positie op de plek van de tegenovergestelde rand.
		</p>
		<Sketch width={pageWidth} height={400} sketchName="boidBorderWrapping" />
		<p>
			Nu we toch bezig zijn met de kleine dingetjes verbeteren, kunnen we net zo goed eventjes de
			boid er wat beter uit laten zien!
			<br />
			Laten we er een driehoekje van maken, zodat je kunt zien welke kant hij op vliegt aan de vorm.
			<br />
			Hievoor hebben we eerst de hoek nodig waarop het driehoekje getekend moet worden. Deze hoek noemen
			we `theta`.
		</p>
		<CodeBlock
			code="betterBoidDraw"
			highlightedLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
		/>
		<Sketch width={pageWidth} height={400} sketchName="betterBoidDraw" />
	</section>

	<section>
		<h2>Separation</h2>
		<p>
			Dit ziet er al leuk uit, maar de boids vliegen de hele tijd tegen elkaar aan. Hier kunnen we
			ook iets aan doen.
			<br />
			Dit is waar het echte boids-algoritme begint: De <i>Separation</i> stap. Hier berekenen we de richting
			waar de boid heen moet gaan om weg te gaan van de rest van de boids in de buurt. Hieronder is een
			diagram. De dikke pijl wijst de richting aan waar de boid naartoe moet om weg te gaan.
		</p>
		<img src={imgSeparation} alt="Separation" />
		<CodeBlock
			code="boidSeparation"
			highlightedLines={[
				5, 6, 21, 22, 23, 24, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
				45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
				68, 69, 70, 71, 72, 73, 74, 75, 76, 78, 79, 80
			]}
		/>
		<p>
			Wow! Dat is heel veel code, maar niet schrikken. Het valt mee. Eerst maken we een nieuwe
			<code class="inline">flock</code> functie. Hier berekenen we het algoritme.
			<br />In de <code class="inline">separate</code> functie gaan we iedere andere boid bij langs.
			Als de afstand tot die andere boid groter is dan de gegeven afstand (hier 12px), berekenen we de
			vector die weg wijst van de boid ernaast. Van al die vectoren voor alle boids in de buurt, nemen
			we het gemiddelde. Dit is de richting die we op moeten om weg te gaan van alle boids in de buurt,
			en niet tegen ze aan te vliegen.
		</p>
		<Sketch width={pageWidth} height={400} sketchName="separation" />
	</section>

	<section>
		<h2>Alignment</h2>
		<p>
			De volgende stap is er voor zorgen dat de boids dezelfde kant op willen vliegen als hun buren.
			dit is de <i>Alignment</i> stap.
		</p>
		<img src={imgAlignment} alt="Alignment" />
		<CodeBlock
			code="boidAlignment"
			highlightedLines={[
				5, 6, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
				33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44
			]}
		/>
		<p>
			In de alignment stap kijken we naar alle boids in de buurt van deze boid. In dit geval 25px.
			Vervolgens nemen we het gemiddelde van alle richtingen van deze buurboids. Hiermee berekenen
			we de stuurkracht nodig om te compenseren voor de huidige richting. Die compensatie voegen we
			uiteindelijk op bij onze acceleratie.
		</p>
		<Sketch width={pageWidth} height={400} sketchName="alignment" />
		<p>Zoals je kunt zien, vliegen ze nu samen!</p>
	</section>

	<section>
		<h2>Cohesion</h2>
		<p>
			Het lijkt nu al ergens op! We hebben nu nog 1 probleem. De vogels vliegen wel dezelfde kant
			op, maar als er eentje uit de groep raakt vliegt deze weer alleen.
			<br />
			Hiervoor hebben we de laatste stap. <i>Cohesion</i>. Deze stap zorgt er voor dat boids altijd
			naar het midden van de zwerm om ze heen willen vliegen.
		</p>
		<img src={imgCohesion} alt="Cohesion" />
		<CodeBlock
			code="boidCohesion"
			highlightedLines={[
				8, 9, 11, 12, 16, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
				37, 38, 39, 40, 41, 42, 43, 44, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
				61, 62
			]}
		/>
		<Sketch width={pageWidth} height={400} sketchName="cohesion" />
		<p>Nu vliegen ze echt in zwermen!</p>
	</section>
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

	img {
		width: 30%;
		margin: 0 auto;
	}

	h2 {
		text-align: center;
	}
</style>
