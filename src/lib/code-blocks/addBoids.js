// Maak een lege lijst met boids.
let boids = [];

// Alle code in de setup functie gebeurt maar 1 keer aan het begin van je sketch.
function setup() {
    // Geef aan dat je een canvas van 400px bij 600px wilt gebruiken.
    createCanvas(600, 400);

    // Herhaal 100 keer:
    for (let i = 0; i < 100; i++) {
        // Maak een nieuwe boid op een willekeurige plek op het scherm.
        const boid = new Boid(random(0, width), random(0, height));
        // Voeg deze boid toe aan de lijst.
        boids.push(boid);
    }
}
