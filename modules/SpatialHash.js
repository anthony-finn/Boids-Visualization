class SpatialHash {
    constructor(cell_size = 20) {
        this.cell_size = cell_size;
        this.size = 0;
        this.collection = {};
    }

    hash_voxel_position(voxel_position) {
        const dimensions = voxel_position.dimensions();
        if (dimensions > 1) {
            let x = voxel_position.get(0);
            let y = voxel_position.get(1);

            // Generalized Cantor Pair
            let result = (x + y) * (x + y + 1) / 2 + y;
            for (let i = 0; i < dimensions - 2; i ++) {
                let n = voxel_position.get(dimensions + i + 1);
                result = (result + n) * (result + n + 1) / 2 + n;
            }

            return {
                index: result, 
                position: voxel_position
            };;
        }

        return {
            index: voxel_position.get(0), 
            position: voxel_position
        };
    }

    hash_position(position) {
        let voxel_position = Vector.divide(position, this.cell_size);
        voxel_position.floor();
        
        const dimensions = voxel_position.dimensions();
        if (dimensions > 1) {
            let x = voxel_position.get(0);
            let y = voxel_position.get(1);

            // Generalized Cantor Pair
            let result = (x + y) * (x + y + 1) / 2 + y;
            for (let i = 0; i < dimensions - 2; i ++) {
                let n = voxel_position.get(dimensions + i + 1);
                result = (result + n) * (result + n + 1) / 2 + n;
            }

            return {
                index: result, 
                position: voxel_position
            };;
        }

        return {
            index: voxel_position.get(0), 
            position: voxel_position
        };
    }

    add(agent, hashed_position) {
        if (hashed_position.index in this.collection) {
            this.collection[hashed_position.index].push(agent);
        }
        else {
            this.collection[hashed_position.index] = [agent];
        }

        this.size += 1;
    }

    remove(agent, hashed_position) {
        if (hashed_position.index in this.collection) {
            let voxel = this.collection[hashed_position.index];
            const index = voxel.indexOf(agent);
            if (index != -1) {
                voxel.splice(index, 1);
                this.size -= 1;
                return true;
            }
        }
        return false;
    }

    update(agent, old_hashed_position, new_hashed_position) {
        this.remove(agent, old_hashed_position);
        this.add(agent, new_hashed_position);
    }

    get(index) {
        if (index in this.collection) {
            return this.collection[index]
        }
        return [];
    }

    query(hashed_position, distance) {
        const cells = Math.ceil(distance / this.cell_size);
        let agents = [];
        let position = hashed_position.position;
        let dimensions = position.dimensions();
        
        const base_vector = new Vector(...Array(dimensions).fill(cells));
        let start_position = Vector.subtract(position, base_vector);
        let end_position = Vector.add(position, base_vector);

        let c = 0;
        for (let x = start_position.get(0); x <end_position.get(0); x++) {
            for (let y = start_position.get(1); y <end_position.get(1); y++) {
                let hashed_voxel_position = this.hash_voxel_position(new Vector(x, y));
                agents.push(...this.get(hashed_voxel_position.index));
            }
        }

        return agents;
    }
}