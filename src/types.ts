export type Snapshot = {
    tick: number;
    sizeOfWorld: Vec;
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

