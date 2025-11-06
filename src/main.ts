import type { Creature, Vec } from './types';

export const makeInitialSnapshot = () => {
    const size: Vec = { x: 10, y: 6 };
    const creatures: Creature[] = [
        { id: 1, position: { x: 2, y: 3 }, energy: 100, age: 5 },
        { id: 2, position: { x: 5, y: 1 }, energy: 80, age: 3 },
        { id: 3, position: { x: 8, y: 4 }, energy: 120, age: 7 },
    ];

    const occupancyGrid: number[][] = Array.from({ length: size.y }, () =>
        Array.from({ length: size.x }, () => 0)
    );

    for (const creature of creatures) {
        const { x, y } = creature.position;
        if (y >= 0 && y < size.y && x >= 0 && x < size.x) {
            occupancyGrid[y]![x] = creature.id;
        }
    }

    return {
        tick: 0,
        sizeOfWorld: size,
        creatures,
        OccupancyGrid: occupancyGrid,
    };
};
