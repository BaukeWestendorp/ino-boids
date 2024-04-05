function draw() {
    // ...

    // Voor iedere boid in de `boids` array:
    for (let i = 0; i < boids.length; i++) {
        // Het boids algoritme.
        boids[i].flock();
        // Update de positie en dergelijke van de boid.
        boids[i].update();
        // Zorg er voor dat de boid niet van het scherm verdwijnt.
        boids[i].wrapAtBorder();
        // Draw deze boid.
        boids[i].draw();
    }
}

class Boid {
    // ...
    constructor(x, y) {
        // ...

        // De maximale snelheid van de boid.
        this.maxSpeed = 3.0;
        // De maximale kracht die het algoritme op de boid mag uitvoeren.
        this.maxForce = 0.05;
    }

    flock() {
        // Stap 1.
        let separation = this.separate(boids);

        this.applyForce(separation);
    }

    separate(boids) {
        // Dit is de afstand die we het liefst hebben van een andere boid.
        const desiredSeperation = 25.0;

        let steer = createVector(0, 0);
        let count = 0;

        // Voor iedere boid in de zwerm, check of deze te dichtbij is.
        for (let i = 0; i < boids.length; i++) {
            // We berekenen de afstand tot de andere boid.
            let distance = p5.Vector.dist(this.position, boids[i].position);

            // Als de afstand meer dan 0 is en minder is dan de gewenste afstand:
            // (De afstand is 0 als het deze boid zelf is)
            if (distance > 0 && distance < desiredSeperation) {
                // Bereken de vector die weg wijst van de boid ernaast.
                let difference = p5.Vector.sub(
                    this.position,
                    boids[i].position,
                );
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

    applyForce(force) {
        this.acceleration.add(force);
    }
}
