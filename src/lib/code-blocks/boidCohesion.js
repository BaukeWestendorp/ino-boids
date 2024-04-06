class Boid {
    flock() {
        // Stap 1.
        let separation = this.separate(boids);

        // Stap 2.
        let alignment = this.align(boids);

        // Stap 3.
        let cohesion = this.cohese(boids);

        // Geef de Alignment kracht meer sterkte, zodat de boids minder snel tegen elkaar aan botsen.
        alignment.mult(2.5);

        this.applyForce(separation);
        this.applyForce(alignment);
        this.applyForce(cohesion);
    }

    cohese(boids) {
        // Dis is de maximale afstand die we checken voor onze buren.
        let neighbourDistance = 50.0;

        let summedLocation = createVector(0, 0);
        let count = 0;

        for (let i = 0; i < boids.length; i++) {
            let distance = p5.Vector.dist(this.position, boids[i].position);
            if (distance > 0 && distance < neighbourDistance) {
                // We voegen alle posities van alle boids in de buurt bij elkaar op.
                summedLocation.add(boids[i].position);
                count++;
            }
        }

        if (count > 0) {
            // Nu nemen we het gemiddelde van alle locaties.
            // Dit is het midden van de boids in de buurt.
            summedLocation.div(count);

            // Stuur naar de nieuwe locatie toe.
            return this.seek(summedLocation);
        } else {
            return createVector(0, 0);
        }
    }

    // Deze functie berekent de stuurkracht die nodig is om te compenseren van de huidige richting naar een doel.
    seek(target) {
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
}
