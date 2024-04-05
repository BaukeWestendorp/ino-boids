function draw() {
    // ...

    // Voor iedere boid in de `boids` array:
    for (let i = 0; i < boids.length; i++) {
        // Update de positie en dergelijke van de boid.
        boids[i].update();
        // Zorg er voor dat de boid niet van het scherm verdwijnt.
        boids[i].wrapAtBorder();
        // Draw deze boid.
        boids[i].draw();
    }
}

class Boid {
    constructor(x, y) {
        // ...

        // Zet de radius van de boid op 5. Dit wordt gebruikt als de grootte van de boid.
        this.radius = 5.0;
    }

    wrapAtBorder() {
        if (this.position.x < -this.radius)
            this.position.x = width + this.radius;
        if (this.position.y < -this.radius)
            this.position.y = height + this.radius;
        if (this.position.x > width + this.radius)
            this.position.x = -this.radius;
        if (this.position.y > height + this.radius)
            this.position.y = -this.radius;
    }
}
