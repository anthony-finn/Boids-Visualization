const CELL_SIZE = 100;
const SHOW_GRID = false;
const world = new SpatialHash(CELL_SIZE);
const flock = []

const NUM_BOIDS = 1500;

function init() {
    canvas = document.createElement('CANVAS');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.position = 'absolute';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');

    for (let i = 0; i < NUM_BOIDS; i++) {
        flock.push(new Boid(world, Math.random() * window.innerWidth, Math.random() * window.innerHeight));
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

    if (SHOW_GRID) {
        // Calculate the number of rows and columns in the grid
        var numRows = canvas.height / CELL_SIZE;
        var numCols = canvas.width / CELL_SIZE;

        // Loop through each cell in the grid and draw a rectangle for it
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numCols; j++) {
                ctx.beginPath();
                ctx.rect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                ctx.stroke();


                ctx.fillStyle = "white";
                ctx.font = "12px Arial";
                hash = SpatialHash.get_voxel_hash(new Vector(j, i));
                ctx.fillText("(" + j + ", " + i + ")", j * CELL_SIZE + 2, i * CELL_SIZE + CELL_SIZE - 2);
            }
        }
    }
}

init();
window.requestAnimationFrame(draw);