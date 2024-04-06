class Boid {
    flock() {
        // Stap 1.
        let separation = this.separate(boids);

        // Stap 2.
        let alignment = this.align(boids);

        this.applyForce(separation);
        this.applyForce(alignment);
    }

    align(boids) {
        // Dis is de maximale afstand die we checken voor onze buren.
        const neighbourDistance = 50.0;

        let totalVelocity = createVector(0, 0);
        let count = 0;

        for (let i = 0; i < boids.length; i++) {
            let distance = p5.Vector.dist(this.position, boids[i].position);
            if (distance > 0 && distance < neighbourDistance) {
                // We pakken alle snelheden van alle vogels en voegen ze samen.
                // Dit geeft de gemiddelde richting die de buren allemaal opvliegen.
                totalVelocity.add(boids[i].velocity);

                count++;
            }
        }

        if (count > 0) {
            // We delen door het aantal boids in de buurt, zodat we het gemiddelde krijgen.
            totalVelocity.div(count);
            totalVelocity.normalize();
            // We geven ze de maximale snelheid, zodat ze niet ineens trager gaan dan ze gingen.
            totalVelocity.mult(this.maxSpeed);
            // We berekenen de richting die deze boid op moet vliegen om te compenseren voor de groepsrichting.
            let steer = p5.Vector.sub(totalVelocity, this.velocity);
            steer.limit(this.maxForce);

            return steer;
        } else {
            return createVector(0, 0);
        }
    }
}
