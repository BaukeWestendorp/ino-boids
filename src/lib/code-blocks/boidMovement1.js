class Boid {
    constructor(x, y) {
        this.position = createVector(x, y);
        // Laat de boid in een willekeurige richting opvliegen.
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        // Geef de boid een versnelling van 0. Dit veranderen we later.
        this.acceleration = createVector(0, 0);
        // Zet de maximale snelheid van de boid op 3.
        this.maxSpeed = 3.0;
    }

    // ...
}
