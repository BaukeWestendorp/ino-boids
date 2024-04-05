// Alle code in de draw functie gebeurt steeds maar weer in een loop, ~60x per seconde.
function draw() {
    // ...

    // Voor iedere boid in de `boids` array:
    for (let i = 0; i < boids.length; i++) {
        // Draw deze boid.
        boids[i].draw();
    }
}

class Boid {
    // ...

    draw() {
        // Zet de kleur van de stip op een lichtblauw.
        stroke("#5eb9e3");
        // Maak de dikte van de stop 5px.
        strokeWeight(5);
        // Zet de stip op de positie van de boid.
        point(this.position.x, this.position.y);
    }
}
