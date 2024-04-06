// Maak een lege lijst met boids.
let boids = [];

export default (width, height, isRunning, options) => {
	return (p5) => {
		p5.setup = () => {
			// Geef aan dat je een canvas van 400px bij 600px wilt gebruiken.
			p5.createCanvas(width, height);

			// Herhaal 100 keer:
			for (let i = 0; i < 100; i++) {
				// Maak een nieuwe boid op een willekeurige plek op het scherm.
				const boid = new Boid(p5.random(0, width), p5.random(0, height), p5);
				// Voeg deze boid toe aan de lijst.
				boids.push(boid);
			}
		};

		p5.draw = () => {
			// Maak de achtergrond lightblauw.
			p5.background('#c5eef5');

			if (!isRunning()) return;

			// Voor iedere boid in de `boids` array:
			for (let i = 0; i < boids.length; i++) {
				// Update de positie en dergelijke van de boid.
				boids[i].update();

				boids[i].wrapAtBorder(p5);

				// Draw deze boid.
				boids[i].draw();
			}
		};
	};
};

class Boid {
	constructor(x, y, p5) {
		// Geef de boid een acceleratie van 0.
		this.acceleration = p5.createVector(0, 0);
		// Laat de boid in een willekeurige richting opvliegen.
		this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
		// Zet de positie van de boid naar de coordinaten die we hebben gegeven.
		this.position = p5.createVector(x, y);

		this.radius = 5;

		this.p5 = p5;
	}

	draw() {
		// Zet de kleur van de stip op een lichtblauw.
		this.p5.stroke('#5eb9e3');
		// Maak de dikte van de stop 5px.
		this.p5.strokeWeight(5);
		// Zet de stip op de positie van de boid.
		this.p5.point(this.position.x, this.position.y);
	}

	update() {
		// Voeg de versnelling toe aan de snelheid.
		this.velocity.add(this.acceleration);
		// Zorg er voor dat de boid niet sneller gaat dan de maximale snelheid.
		this.velocity.limit(this.maxSpeed);

		// Voeg de snelheid toe aan de positie. Dit zorgt er voor dat de boid de richting op gaat die hij heeft.
		this.position.add(this.velocity);
		// We zetten de acceleratie na iedere ronde weer op 0.
		this.acceleration.mult(0);
	}

	wrapAtBorder(p5) {
		if (this.position.x < -this.radius) this.position.x = p5.width + this.radius;
		if (this.position.y < -this.radius) this.position.y = p5.height + this.radius;
		if (this.position.x > p5.width + this.radius) this.position.x = -this.radius;
		if (this.position.y > p5.height + this.radius) this.position.y = -this.radius;
	}
}
