export default (width, height, options) => {
	return (p5) => {
		// Eerst maken we een lege lijst met alle vogels (ookwel boids in het algoritme).
		const flock = [];

		p5.setup = () => {
			p5.createCanvas(width, height);

			// In die lijst zetten we 100 nieuwe boids.
			for (let i = 0; i < 100; i++) {
				// We maken een nieuwe boid in het midden van het scherm en zetten die in de lijst.
				let boid = new Boid(
					p5.width / 2,
					p5.height / 2,
					p5,
					options.separation,
					options.alignment,
					options.cohesion
				);
				flock.push(boid);
			}

			// We geven de laatste flock een andere kleur, zodat er altijd eentje te vinden is.
			// We nemen de laatste zodat deze altijd te zien is boven alle andere boids.
			flock[flock.length - 1].highlight = true;
		};

		p5.draw = () => {
			p5.background('#c5eef5');
			for (let i = 0; i < flock.length; i++) {
				flock[i].run(flock, p5);
			}
		};
	};
};

class Boid {
	constructor(x, y, p5, enableSeperation, enableAlignment, enableCoheseion) {
		// De acceleratie van de boid.
		this.acceleration = p5.createVector(0, 0);
		// De snelheid van de boid.
		this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
		// De positie van de boid.
		this.position = p5.createVector(x, y);
		this.radius = 5.0;
		// De maximale snelheid van de boid.
		this.maxSpeed = 3.0;
		// De maximale kracht waarmee de boid mag worden gestuurd.
		this.maxForce = 0.05;

		this.enableSeperation = enableSeperation;
		this.enableAlignment = enableAlignment;
		this.enableCoheseion = enableCoheseion;

		this.highlight = false;
	}

	run(flock, p5) {
		this.flock(flock, p5);

		this.update();
		this.checkBorders(p5);
		this.render(p5);
	}

	flock(flock, p5) {
		let seperation = this.seperate(flock, p5);
		let alignment = this.align(flock, p5);
		let cohesion = this.cohesion(flock, p5);

		if (this.enableSeperation) seperation.mult(3.0);
		if (this.enableAlignment) alignment.mult(1.0);
		if (this.enableCoheseion) cohesion.mult(1.0);

		if (this.enableSeperation) this.applyForce(seperation);
		if (this.enableAlignment) this.applyForce(alignment);
		if (this.enableCoheseion) this.applyForce(cohesion);
	}

	update() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);

		this.position.add(this.velocity);

		// We zetten de acceleratie na iedere ronde weer op 0.
		this.acceleration.mult(0);
	}

	checkBorders(p5) {
		if (this.position.x < -this.radius) this.position.x = p5.width + this.radius;
		if (this.position.y < -this.radius) this.position.y = p5.height + this.radius;
		if (this.position.x > p5.width + this.radius) this.position.x = -this.radius;
		if (this.position.y > p5.height + this.radius) this.position.y = -this.radius;
	}

	render(p5) {
		// Draw a triangle rotated in the direction of velocity
		const theta = this.velocity.heading() + p5.radians(90);
		if (this.highlight) {
			p5.fill('#e35e5e');
			p5.stroke('#911919');
		} else {
			p5.fill('#5eb9e3');
			p5.stroke('#196b91');
		}
		p5.push();
		p5.translate(this.position.x, this.position.y);
		p5.rotate(theta);
		p5.beginShape();
		p5.vertex(0, -this.radius * 2);
		p5.vertex(-this.radius, this.radius * 2);
		p5.vertex(this.radius, this.radius * 2);
		p5.endShape(p5.CLOSE);
		p5.pop();
	}

	seperate(flock, p5) {
		const desiredSeperation = 25.0;
		let steer = p5.createVector(0, 0);
		let count = 0;

		// Voor iedere boid in de zwerm, check of deze te dichtbij is.
		for (let i = 0; i < flock.length; i++) {
			let distance = p5.Vector.dist(this.position, flock[i].position);

			// Als de afstand meer dan 0 is en minder is dan de gewenste afstand:
			// (De afstand is 0 als het deze boid zelf is)
			if (distance > 0 && distance < desiredSeperation) {
				// Bereken de vector die weg wijst van de boid ernaast.
				let difference = p5.Vector.sub(this.position, flock[i].position);
				difference.normalize();
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

	align(flock, p5) {
		const neighbourDistance = 50.0;
		let totalVelocity = p5.createVector(0, 0);
		let count = 0;

		for (let i = 0; i < flock.length; i++) {
			let distance = p5.Vector.dist(this.position, flock[i].position);
			if (distance > 0 && distance < neighbourDistance) {
				totalVelocity.add(flock[i].velocity);
				count++;
			}
		}

		if (count > 0) {
			totalVelocity.div(count);
			totalVelocity.normalize();
			totalVelocity.mult(this.maxSpeed);
			let steer = p5.Vector.sub(totalVelocity, this.velocity);
			steer.limit(this.maxForce);

			return steer;
		} else {
			return p5.createVector(0, 0);
		}
	}

	cohesion(flock, p5) {
		let neighbourDistance = 50.0;
		let summedLocation = p5.createVector(0, 0);
		let count = 0;
		for (let i = 0; i < flock.length; i++) {
			let distance = p5.Vector.dist(this.position, flock[i].position);
			if (distance > 0 && distance < neighbourDistance) {
				summedLocation.add(flock[i].position);
				count++;
			}
		}

		if (count > 0) {
			summedLocation.div(count);

			// Stuur naar de nieuwe locatie toe.
			return this.seek(summedLocation, p5);
		} else {
			return p5.createVector(0, 0);
		}
	}

	seek(target, p5) {
		let desired = target.sub(this.position);

		// We moeten de vector normaliseren, zodat we geen last
		// hebben van de afstand tussen de boids
		desired.normalize();
		desired.mult(this.maxSpeed);

		// De stuurkracht is een vector met de richting
		// waarin de boid moet bewegen om naar het target toe te gaan.
		let steer = p5.Vector.sub(desired, this.velocity);
		steer.limit(this.maxForce);

		return steer;
	}

	applyForce(force) {
		this.acceleration.add(force);
	}
}
