const world = new SpatialHash(100);
const flock = []

const NUM_BOIDS = 200;

function init() {
    canvas = document.createElement('CANVAS');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.position = 'absolute';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');

    for (let i = 0; i < NUM_BOIDS; i++) {
        flock.push(new Boid(world, Math.random() * 1980, Math.random() * 1080));
    }
}

function draw() {
    window.requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    for (let boid of flock) {
        boid.edges(window.innerWidth, window.innerHeight);
        boid.update(flock);
        boid.draw(ctx);
    }
}

init();
window.requestAnimationFrame(draw);