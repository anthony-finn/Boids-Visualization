class Boid {
    constructor(x = 0, y = 0) {
        this.mass = Math.random() * 3 + 1;
        this.position = new Vector(x, y);
        this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.acceleration = new Vector(0, 0);
        this.orientation = [new Vector(1, 0), new Vector(0, 1)];
        this.perception = [100, 60];
        this.max_speed = 5;
        this.max_force = 1;
        this.size = 15;
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
        if (this.position.get(0) < 0 - this.size) {
            this.position.set(0, width + this.size);
        }

        if (this.position.get(0) > width + this.size) {
            this.position.set(0, 0 - this.size);
        }
		
        if (this.position.get(1) < 0 - this.size) {
            this.position.set(1, height - this.size);
        }

        if (this.position.get(1) > height + this.size) {
            this.position.set(1, 0 - this.size);
        }
	}

    draw(ctx) {
        if (this.visible) {
            ctx.beginPath();
            ctx.moveTo(this.position.get(0), this.position.get(1));

            let left_point = new Vector(this.size * Math.sin(Math.PI/ 6), this.size * Math.cos(Math.PI/ 6));
            let new_left_point = Vector.subtract(Vector.multiply(this.orientation[0], left_point.get(0)), Vector.multiply(this.orientation[1], left_point.get(1)));
            new_left_point.add(this.position);

            let right_point = new Vector(-this.size * Math.sin(Math.PI/ 6), this.size * Math.cos(Math.PI/ 6));
            let new_right_point = Vector.subtract(Vector.multiply(this.orientation[0], right_point.get(0)), Vector.multiply(this.orientation[1], right_point.get(1)));
            new_right_point.add(this.position);

            ctx.lineTo(new_left_point.get(0), new_left_point.get(1));
            ctx.moveTo(this.position.get(0), this.position.get(1));
            ctx.lineTo(new_right_point.get(0), new_right_point.get(1));

            ctx.lineWidth = 2;
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
    }
}