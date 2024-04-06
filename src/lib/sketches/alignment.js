// Maak een lege lijst met boids.
let boids = [];

export default (width, height, options) => {
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

			// Voor iedere boid in de `boids` array:
			for (let i = 0; i < boids.length; i++) {
				// Het boids algoritme.
				boids[i].flock();

				// Update de positie en dergelijke van de boid.
				boids[i].update();

				boids[i].wrapAtBorder();

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

		// De maximale snelheid van de boid.
		this.maxSpeed = 3.0;
		// De maximale kracht die het algoritme op de boid mag uitvoeren.
		this.maxForce = 0.05;
	}

	draw() {
		// Bereken de hoek van de boid.
		const theta = this.velocity.heading() + this.p5.radians(90);

		// Zet de kleuren waarmee we gaan tekenen.
		this.p5.fill('#5eb9e3');
		this.p5.stroke('#196b91');

		// Teken een driehoek met de punt richting theta.
		this.p5.push();
		this.p5.translate(this.position.x, this.position.y);
		this.p5.rotate(theta);
		this.p5.beginShape();
		this.p5.vertex(0, -this.radius * 2);
		this.p5.vertex(-this.radius, this.radius * 2);
		this.p5.vertex(this.radius, this.radius * 2);
		this.p5.endShape(this.p5.CLOSE);
		this.p5.pop();
	}

	flock() {
		// Stap 1.
		let separation = this.separate(boids);

		// Stap 2.
		let alignment = this.align(boids);

		this.applyForce(separation);
		this.applyForce(alignment);
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

	wrapAtBorder() {
		if (this.position.x < -this.radius) this.position.x = this.p5.width + this.radius;
		if (this.position.y < -this.radius) this.position.y = this.p5.height + this.radius;
		if (this.position.x > this.p5.width + this.radius) this.position.x = -this.radius;
		if (this.position.y > this.p5.height + this.radius) this.position.y = -this.radius;
	}

	separate(boids) {
		// Dit is de afstand die we het liefst hebben van een andere boid.
		const desiredSeperation = 20.0;

		let steer = this.p5.createVector(0, 0);
		let count = 0;

		// Voor iedere boid in de zwerm, check of deze te dichtbij is.
		for (let i = 0; i < boids.length; i++) {
			// We berekenen de afstand tot de andere boid.
			let distance = this.p5.Vector.dist(this.position, boids[i].position);

			// Als de afstand meer dan 0 is en minder is dan de gewenste afstand:
			// (De afstand is 0 als het deze boid zelf is)
			if (distance > 0 && distance < desiredSeperation) {
				// Bereken de vector die weg wijst van de boid ernaast.
				let difference = this.p5.Vector.sub(this.position, boids[i].position);
				// We normaliseren de vector (maken de waarden tussen -1 en 1).
				difference.normalize();
				// En voegen het de afstand toe op de `steer` vector.
				steer.add(difference);

				count++;
			}
		}

		// Pak het gemiddelde van de stuurkracht, zodat deze niet te groot is.
		if (count > 0) {
			steer.div(count);
		}

		if (steer.mag() > 0) {
			steer.normalize();
			steer.mult(this.maxSpeed);
			steer.sub(this.velocity);
			steer.limit(this.maxForce);
		}

		return steer;
	}

	align(boids) {
		const neighbourDistance = 25.0;
		let totalVelocity = this.p5.createVector(0, 0);
		let count = 0;

		for (let i = 0; i < boids.length; i++) {
			let distance = this.p5.Vector.dist(this.position, boids[i].position);
			if (distance > 0 && distance < neighbourDistance) {
				totalVelocity.add(boids[i].velocity);
				count++;
			}
		}

		if (count > 0) {
			totalVelocity.div(count);
			totalVelocity.normalize();
			totalVelocity.mult(this.maxSpeed);
			let steer = this.p5.Vector.sub(totalVelocity, this.velocity);
			steer.limit(this.maxForce);

			return steer;
		} else {
			return this.p5.createVector(0, 0);
		}
	}

	applyForce(force) {
		this.acceleration.add(force);
	}
}
