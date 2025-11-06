import type { Creature, Snapshot, Vec } from './types';

export const decideMovement = (
    snapshot: Readonly<Snapshot>,
    creature: Readonly<Creature>
): Vec | null => {
    const currentPosition = creature.position;
    const newPosition: Vec = { x: currentPosition.x + 1, y: currentPosition.y };

    if (!inBounds(newPosition, snapshot.sizeOfWorld)) {
        return null;
    }   

    return newPosition;
};

export const inBounds = (position: Vec, sizeOfWorld: Vec): boolean => {
    return (
        position.x >= 0 &&
        position.x < sizeOfWorld.x &&
        position.y >= 0 &&
        position.y < sizeOfWorld.y
    );
};
