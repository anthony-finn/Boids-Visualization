class Vector {
    constructor(...components) {
        this.components = components;
    }

    toString() {
        return this.components.toString();
    }

    get(index) {
        return this.components[index];
    }

    set(index, value) {
        if (isNaN(index) || index < 0 || index >= this.components.length) {
            throw new Error(`Index out of range: ${index}`);
        }

        this.components[index] = value;
    }

    magnitude() {
        let magnitude = 0.0;
        for (const component of this.components) {
            magnitude += Math.pow(component, 2);
        }
        
        return Math.sqrt(magnitude);
    }

    dimensions() {
        return this.components.length;
    }

    add(v1) {
        if (this.dimensions() != v1.dimensions()) {
            throw new Error(`Mismatched vector dimensions: ${this.dimensions()}!=${v1.dimensions()}`);
        }

        for (let i = 0; i < v1.dimensions(); i++) {
            this.set(i, this.get(i) + v1.get(i));
        }

        return this;
    }

    subtract(v1) {
        if (this.dimensions() != v1.dimensions()) {
            throw new Error(`Mismatched vector dimensions: ${this.dimensions()}!=${v1.dimensions()}`);
        }

        for (let i = 0; i < v1.dimensions(); i++) {
            this.set(i, this.get(i) - v1.get(i));
        }

        return this;
    }

    multiply(scalar) {
        for (let i = 0; i < this.dimensions(); i++) {
            this.set(i, this.get(i) * scalar);
        }

        return this;
    }
    
    divide(scalar) {
        for (let i = 0; i < this.dimensions(); i++) {
            this.set(i, this.get(i) / scalar);
        }

        return this;
    }

    normalize() {
        const magnitude = this.magnitude();

        if (magnitude != 0) {
            for (let i = 0; i < this.dimensions(); i++) {
                this.set(i, this.get(i) / magnitude);
            }
        }

        return this;
    }

    truncate(scaler) {
        const magnitude = this.magnitude();
        this.normalize();
        this.multiply(Math.min(magnitude, scaler));

        return this;
    }

    floor() {
        for (let i = 0; i < this.dimensions(); i++) {
            this.set(i, Math.floor(this.get(i)));
        }
    }

    static add(v1, v2) {
        if (v1.dimensions() != v2.dimensions()) {
            throw new Error(`Mismatched vector dimensions: ${v1.dimensions()}!=${v2.dimensions()}`);
        }
        
        let components = [];
        for (let i = 0; i < v1.dimensions(); i++) {
            components[i] = v1.get(i) + v2.get(i);
        }

        return new Vector(...components);
    }

    static subtract(lhs, rhs) {
        if (lhs.dimensions() != rhs.dimensions()) {
            throw new Error(`Mismatched vector dimensions: ${lhs.dimensions()}!=${rhs.dimensions()}`);
        }
        
        let components = [];
        for (let i = 0; i < lhs.dimensions(); i++) {
            components[i] = lhs.get(i) - rhs.get(i);
        }

        return new Vector(...components);
    }

    static multiply(v1, scalar) {
        let components = [];
        for (let i = 0; i < v1.dimensions(); i++) {
            components[i] = v1.get(i) * scalar;
        }

        return new Vector(...components);
    }

    static divide(v1, scalar) {
        let components = [];
        for (let i = 0; i < v1.dimensions(); i++) {
            components[i] = v1.get(i) / scalar;
        }

        return new Vector(...components);
    }

    static dot(lhs, rhs) {
        if (lhs.dimensions() != rhs.dimensions()) {
            throw new Error(`Mismatched vector dimensions: ${lhs.dimensions()}!=${rhs.dimensions()}`);
        }

        let sum = 0.0;
        for (let i = 0; i < lhs.dimensions(); i++) {
            sum += lhs.get(i) * rhs.get(i);
        }

        return sum;
    }
    
    static normalize(v1) {
        let magnitude = v1.magnitude();

        if (magnitude == 0) {
            magnitude = 1;
        }

        let components = [];
        for (let i = 0; i < v1.dimensions(); i++) {
            components[i] = v1.get(i) / magnitude;
        }

        return new Vector(...components);
    }

    static truncate(v1, scaler) {
        const magnitude = v1.magnitude();
        const normalized = Vector.normalize(v1);

        return normalized.multiply(Math.min(magnitude, scaler));
    }

    static floor(v1) {
        for (let i = 0; i < v1.dimensions(); i++) {
            v1.set(i, Math.floor(v1.get(i)));
        }
    }
}