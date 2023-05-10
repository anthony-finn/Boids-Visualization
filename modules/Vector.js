class Vector {

    constructor(...components) {
        this.components = components;
        this.dimensions = this.components.length;
        this._magnitude = null;
        this._isMagnitudeDirty = true;
    }

    // Getter & Setters
    get(index) {
        return this.components[index];
    }

    set(index, value) {
        this.components[index] = value;
    }

    get magnitude() {
        if (this._isMagnitudeDirty) {
            let magnitude = 0.0;
            for (const component of this.components) {
                magnitude += Math.pow(component, 2);
            }

            this._magnitude = Math.sqrt(magnitude);
            this._isMagnitudeDirty = false;
        }
        
        return this._magnitude;
    }

    // Functions
    add(a) {
        for (let i = 0; i < a.dimensions; i++) {
            this.components[i] += a.components[i];
        }

        this._isMagnitudeDirty = true;
        return this;
    }

    subtract(a) {
        for (let i = 0; i < a.dimensions; i++) {
            this.components[i] -= a.components[i];
        }

        this._isMagnitudeDirty = true;
        return this;
    }

    multiply(scalar) {
        for (let i = 0; i < this.dimensions; i++) {
            this.components[i] *= scalar;
        }

        this._isMagnitudeDirty = true;
        return this;
    }
    
    divide(scalar) {
        for (let i = 0; i < this.dimensions; i++) {
            this.components[i] /= scalar;
        }

        this._isMagnitudeDirty = true;
        return this;
    }

    normalize() {
        const magnitude = this.magnitude;

        if (magnitude != 0 && magnitude != 1) {
            for (let i = 0; i < this.dimensions; i++) {
                this.components[i] /= magnitude;
            }

            this._isMagnitudeDirty = false;
            this._magnitude = 1;
        }

        return this;
    }

    truncate(scaler) {
        const magnitude = this.magnitude;

        if (magnitude > scaler) {
            for (let i = 0; i < this.dimensions; i++) {
                this.components[i] = this.components[i] * scaler / magnitude;
            }

            this._magnitude = scaler;
            this._isMagnitudeDirty = false;
        }

        return this;
    }

    floor() {
        for (let i = 0; i < this.dimensions; i++) {
            this.components[i] = Math.floor(this.components[i]);
        }

        this._isMagnitudeDirty = true;
    }

    round() {
        for (let i = 0; i < this.dimensions; i++) {
            this.components[i] = Math.floor(this.components[i] + 0.5);
        }

        this._isMagnitudeDirty = true;
    }

    toString() {
        return this.components.toString();
    }

    // Static Functions
    static add(a, b) {
        let components = [];
        for (let i = 0; i < a.dimensions; i++) {
            components[i] = a.components[i] + b.components[i];
        }

        return new Vector(...components);
    }

    static subtract(a, b) {
        let components = [];
        for (let i = 0; i < a.dimensions; i++) {
            components[i] = a.components[i] - b.components[i];
        }

        return new Vector(...components);
    }

    static subtract_with_magnitude(a, b) {
        let components = [];
        let magnitude = 0;
        for (let i = 0; i < a.dimensions; i++) {
            const difference = a.components[i] - b.components[i];
            components[i] = difference;
            magnitude += Math.pow(difference, 2);
        }

        const new_vector = new Vector(...components);
        new_vector._isMagnitudeDirty = false;
        new_vector._magnitude = Math.sqrt(magnitude);

        return new_vector
    }

    static multiply(a, scalar) {
        let components = [];
        for (let i = 0; i < a.dimensions; i++) {
            components[i] = a.components[i] * scalar;
        }

        return new Vector(...components);
    }

    static divide(a, scalar) {
        let components = [];
        for (let i = 0; i < a.dimensions; i++) {
            components[i] = a.components[i] / scalar;
        }

        return new Vector(...components);
    }

    static dot(a, b) {
        let sum = 0.0;
        for (let i = 0; i < a.dimensions; i++) {
            sum += a.components[i] * b.components[i];
        }

        return sum;
    }
    
    static normalize(a) {
        let magnitude = a.magnitude;

        if (magnitude != 0 || magnitude != 1) {
            let components = [];
            for (let i = 0; i < a.dimensions; i++) {
                components[i] = a.components[i] / magnitude;
            }
    
            return new Vector(...components); 
        }
        else {
            return new Vector(...a.components); 
        }
    }

    static truncate(a, scaler) {
        const magnitude = a.magnitude;

        if (magnitude > scaler) {
            let components = [];
            for (let i = 0; i < this.dimensions; i++) {
                components[i] = a.components[i] * scaler / magnitude;
            }

            let new_vector = new Vector(...components);
            new_vector._isMagnitudeDirty = false;
            new_vector._magnitude = scaler;
            return new_vector;
        }

        return new Vector(...a.components);
    }

    static floor(a) {
        let components = [];
        for (let i = 0; i < a.dimensions; i++) {
            components[i] = Math.floor(a.components[i]);
        }

        return new Vector(...components);
    }

    static round(a) {
        let components = [];
        for (let i = 0; i < a.dimensions; i++) {
            components[i] = Math.floor(a.components[i] + 0.5);
        }

        return new Vector(...components);
    }
}