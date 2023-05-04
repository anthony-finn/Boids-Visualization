class Boid {
    constructor(x, y) {
        this.mass = 1;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.orientation = [new Vector(0.707106781187, 0.707106781187), new Vector(-0.707106781187, 0.707106781187)];
        this.perception = [100, 145];
        this.max_speed = 1;
        this.max_force = 1;
    }

    update(boids) {
        for (boid of boids) {
            const to_direction = Vector.subtract(boid.position, this.position);
            const distance = to_direction.magnitude();

            if (distance <= this.perception[0]) {
                console.log(distance);
            }
        }
    }
}