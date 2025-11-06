export type Snapshot = {
    tick: number;
    sizeOfWorld: number;
    creatures: Creature[];
    OccupancyGrid: number[][];
}

export type Creature = {
    id: number;
    position: Vec;
    energy: number;
    age: number;
}

export type Vec = {
    x: number;
    y: number;
}

