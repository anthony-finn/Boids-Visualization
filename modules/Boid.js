class Boid {
    constructor(x = 0, y = 0) {
        this.mass = Math.random() * 100;
        this.position = new Vector(x, y);
        this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.acceleration = new Vector(0, 0);
        this.orientation = [new Vector(1, 0), new Vector(0, 1)];
        this.perception = [100000, 145];
        this.max_speed = 10;
        this.max_force = 10;
        this.size = this.mass / 3;
        this.visible = true;
    }

    update(boids) {
        let separation = new Vector(0, 0);
        let cohesion = new Vector(0, 0);
        let alignment = new Vector(0, 0);
        let num_boids = 0;
        for (const boid of boids) {
            const to_direction = Vector.subtract(boid.position, this.position);
            const distance = to_direction.magnitude();

            if (distance <= this.perception[0]) {
                const heading = this.orientation[1];
                const angle = Math.acos(Vector.dot(to_direction, heading) / (distance * heading.magnitude())) * 180 / Math.PI;
                
                if (angle <= this.perception[1]) {
                    // Separation
                    let away_direction = Vector.subtract(this.position, boid.position);
                    away_direction.normalize();
                    away_direction.divide(distance);
                    separation.add(away_direction);

                    // Cohesion
                    cohesion.add(boid.position);

                    // Alignment
                    alignment.add(boid.velocity);

                    num_boids += 1;
                }
            }
        }

        let steering_direction = new Vector(0, 0);
        if (num_boids > 0) {
            // Separation
            steering_direction.add(separation);

            // Cohesion
            cohesion.divide(num_boids);
            cohesion.subtract(this.position);
            steering_direction.add(cohesion);

            // Alignment
            alignment.divide(num_boids);
            alignment.subtract(this.velocity);
            steering_direction.add(alignment);
        }

        let steering_force = Vector.truncate(steering_direction, this.max_force);
        this.acceleration = Vector.divide(steering_force, this.mass);
        this.velocity.add(this.acceleration);
        this.velocity.truncate(this.max_speed);
        this.position.add(this.velocity);

        this.orientation[1] = Vector.normalize(this.velocity);
        this.orientation[0] = new Vector(this.orientation[1].get(1), -this.orientation[1].get(0));
    }

	edges(width, height) {
		if (this.position.get(0) <= this.size || this.position.get(0) >= width - this.size)
			this.velocity.set(0, 0 - this.velocity.get(0));
		
        if (this.position.get(1) <= this.size || this.position.get(1) >= height - this.size)
			this.velocity.set(1, 0 - this.velocity.get(1));
	}

    draw(ctx) {
        if (this.visible) {
            ctx.beginPath();
            ctx.arc(this.position.get(0), this.position.get(1), this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}