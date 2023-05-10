function szudzikPair(x, y)  {
    return (x >= y ? (x * x) + x + y : (y * y) + x);
}

class SpatialHash {
    constructor(cell_size) {
        this.cell_size = cell_size;
        this.cells = {};
        this.agent_map = {};
        this.size = 0;
    }

    static get_voxel_hash(voxel) {
        let dimensions = voxel.dimensions;
        if (dimensions > 1) {
            let x = voxel.get(0);
            let y = voxel.get(1);

            let result = szudzikPair(x, y);
            for (let i = 0; i < dimensions - 2; i ++) {
                let n = voxel.get(dimensions + i - 1);
                result = szudzikPair(result, n);
            }

            return result;
        }

        return voxel.get(0);
    }

    get_voxel(position) {
        let rounded_position = Vector.round(position);
        let voxel = Vector.divide(rounded_position, this.cell_size);
        voxel.floor();

        return {
            location: voxel,
            hash: SpatialHash.get_voxel_hash(voxel)
        }
    }

    create_cell(voxel_hash) {
        const new_cell = new Cell();
        this.cells[voxel_hash] = new_cell;
        return new_cell;
    }

    add(agent) {
        const voxel_hash = agent.voxel.hash;
        const unique_id = agent.__unique_id;
        if (!(unique_id in this.agent_map)) {
            if (voxel_hash in this.cells) {
                this.cells[voxel_hash].add(agent);
            }
            else {
                const new_cell = this.create_cell(voxel_hash);
                new_cell.add(agent);
            }

            this.agent_map[unique_id] = voxel_hash;
            this.size++;
        }
    }

    remove(agent) {
        const unique_id = agent.__unique_id;
        if (unique_id in this.agent_map) {
            const voxel_hash = this.agent_map[unique_id];
            this.cells[voxel_hash].remove(agent);
            delete this.agent_map[unique_id];
            this.size--;
        }
    }

    update(agent) {
        const unique_id = agent.__unique_id;
        if (unique_id in this.agent_map) {
            const previous_voxel_hash = this.agent_map[unique_id];
            const voxel_hash = agent.voxel.hash;
            if (previous_voxel_hash != voxel_hash) {
                const previous_cell = this.cells[previous_voxel_hash];
                const index = previous_cell.find(agent);
                if (index != -1) {
                    if (previous_cell.remove(agent)) {
                        this.agent_map[unique_id] = voxel_hash;
                        if (voxel_hash in this.cells) {
                            const new_cell = this.cells[voxel_hash];
                            new_cell.add(agent);
                        }
                        else {
                            const new_cell = this.create_cell(voxel_hash);
                            new_cell.add(agent);
                        }
                    }
                }
            }
        } 
    }

    get_agents(voxel_hash) {
        if (voxel_hash in this.cells) {
            return this.cells[voxel_hash].array;
        }
        return [];
    }

    query(voxel_location, distance) {
        const cells = Math.ceil(distance / this.cell_size);
        let agents = [];
        const dimensions = voxel_location.dimensions;

        const base_vector = new Vector(...Array(dimensions).fill(cells));

        const start_voxel = Vector.subtract(voxel_location, base_vector);
        const end_voxel = Vector.add(voxel_location, base_vector);

        for (let x = start_voxel.get(0); x <= end_voxel.get(0); x++) {
            if (x >= 0) {
                for (let y = start_voxel.get(1); y <= end_voxel.get(1); y++) {
                    if (y >= 0) {
                        const peeked_voxel = new Vector(x, y);
                        const voxel_hash = SpatialHash.get_voxel_hash(peeked_voxel);
                        agents.push(...this.get_agents(voxel_hash));
                    }
                }
            }
        }

        return agents;
    }
}