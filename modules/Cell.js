class Cell {
    constructor() {
        this.array = [];
        this.map = {};
        this.size = 0;
    }

    add(agent) {
        if (!(agent.__unique_id in this.map)) {
            this.map[agent.__unique_id] = this.size;
            this.array.push(agent);
            this.size++;
        }
    }

    remove(agent) {
        const agent_id = agent.__unique_id;
        if (agent_id in this.map) {
            const index = this.map[agent_id];
            const last = this.size - 1;
            [this.array[index], this.array[last]] = [this.array[last], this.array[index]];
            this.array.pop();
            delete this.map[agent_id];
            if (index != last) {
                this.map[this.array[index].__unique_id] = index;
            }
            this.size--;
            return true;
        }
        return false;
    }

    find(agent) {
        const agent_id = agent.__unique_id;
        if (agent_id in this.map) {
            return this.map[agent_id];
        }
        return -1;
    }
}