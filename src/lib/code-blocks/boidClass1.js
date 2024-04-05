class Boid {
    constructor(x, y) {
        // Geef de boid een acceleratie van 0.
        this.acceleration = createVector(0, 0);
        // Laat de boid in een willekeurige richting opvliegen.
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        // Zet de positie van de boid naar de coordinaten die we hebben gegeven.
        this.position = createVector(x, y);
    }
}
