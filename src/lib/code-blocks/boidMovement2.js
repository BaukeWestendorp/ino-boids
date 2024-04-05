function draw() {
    // ...

    // Voor iedere boid in de `boids` array:
    for (let i = 0; i < boids.length; i++) {
        // Update de positie en dergelijke van de boid.
        boids[i].update();
        // Draw deze boid.
        boids[i].draw();
    }
}

class Boid {
    // ...

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
}
