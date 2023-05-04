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
            throw new Error('');
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
        for (let i = 0; i < rhs.dimensions(); i++) {
            components[i] = lhs.get(i) - rhs.get(i);
        }

        return new Vector(...components);
    }
}