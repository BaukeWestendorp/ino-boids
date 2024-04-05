class Boid {
    draw() {
        // Bereken de hoek van de boid.
        const theta = this.velocity.heading() + radians(90);

        // Zet de kleuren waarmee we gaan tekenen.
        fill("#5eb9e3");
        stroke("#196b91");

        // Teken een driehoek met de punt richting theta.
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.radius * 2);
        vertex(-this.radius, this.radius * 2);
        vertex(this.radius, this.radius * 2);
        endShape(CLOSE);
        pop();
    }
}
