import { decideMovement, inBounds } from './movement';
import type { Creature, Snapshot, Vec } from './types';

describe('decideMovement', () => {
    const createSnapshot = (sizeX: number, sizeY: number): Snapshot => ({
        tick: 0,
        sizeOfWorld: { x: sizeX, y: sizeY },
        creatures: [],
        OccupancyGrid: [],
    });

    const createCreature = (x: number, y: number): Creature => ({
        id: 1,
        position: { x, y },
        energy: 100,
        age: 5,
    });

    it('should move creature one position to the right', () => {
        const snapshot = createSnapshot(10, 6);
        const creature = createCreature(5, 3);

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition).toEqual({ x: 6, y: 3 });
    });

    it('should return null when moving right would go out of bounds', () => {
        const snapshot = createSnapshot(10, 6);
        const creature = createCreature(9, 3); // At right edge

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition).toBeNull();
    });

    it('should allow movement from left edge', () => {
        const snapshot = createSnapshot(10, 6);
        const creature = createCreature(0, 3);

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition).toEqual({ x: 1, y: 3 });
    });

    it('should not change y position', () => {
        const snapshot = createSnapshot(10, 6);
        const creature = createCreature(5, 2);

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition?.y).toBe(2);
    });

    it('should work at top edge of grid', () => {
        const snapshot = createSnapshot(10, 6);
        const creature = createCreature(5, 0);

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition).toEqual({ x: 6, y: 0 });
    });

    it('should work at bottom edge of grid', () => {
        const snapshot = createSnapshot(10, 6);
        const creature = createCreature(5, 5);

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition).toEqual({ x: 6, y: 5 });
    });

    it('should return null at bottom-right corner', () => {
        const snapshot = createSnapshot(10, 6);
        const creature = createCreature(9, 5);

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition).toBeNull();
    });

    it('should return null at top-right corner', () => {
        const snapshot = createSnapshot(10, 6);
        const creature = createCreature(9, 0);

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition).toBeNull();
    });

    it('should work with small grid size', () => {
        const snapshot = createSnapshot(2, 2);
        const creature = createCreature(0, 0);

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition).toEqual({ x: 1, y: 0 });
    });

    it('should return null when at edge of small grid', () => {
        const snapshot = createSnapshot(2, 2);
        const creature = createCreature(1, 1);

        const newPosition = decideMovement(snapshot, creature);

        expect(newPosition).toBeNull();
    });
});

describe('inBounds', () => {
    const worldSize: Vec = { x: 10, y: 6 };

    describe('valid positions', () => {
        it('should return true for position in center of world', () => {
            expect(inBounds({ x: 5, y: 3 }, worldSize)).toBe(true);
        });

        it('should return true for top-left corner (0, 0)', () => {
            expect(inBounds({ x: 0, y: 0 }, worldSize)).toBe(true);
        });

        it('should return true for bottom-right corner (max-1, max-1)', () => {
            expect(inBounds({ x: 9, y: 5 }, worldSize)).toBe(true);
        });

        it('should return true for position on left edge', () => {
            expect(inBounds({ x: 0, y: 3 }, worldSize)).toBe(true);
        });

        it('should return true for position on right edge', () => {
            expect(inBounds({ x: 9, y: 3 }, worldSize)).toBe(true);
        });

        it('should return true for position on top edge', () => {
            expect(inBounds({ x: 5, y: 0 }, worldSize)).toBe(true);
        });

        it('should return true for position on bottom edge', () => {
            expect(inBounds({ x: 5, y: 5 }, worldSize)).toBe(true);
        });
    });

    describe('out of bounds positions', () => {
        it('should return false for negative x', () => {
            expect(inBounds({ x: -1, y: 3 }, worldSize)).toBe(false);
        });

        it('should return false for negative y', () => {
            expect(inBounds({ x: 5, y: -1 }, worldSize)).toBe(false);
        });

        it('should return false for x >= world width', () => {
            expect(inBounds({ x: 10, y: 3 }, worldSize)).toBe(false);
        });

        it('should return false for y >= world height', () => {
            expect(inBounds({ x: 5, y: 6 }, worldSize)).toBe(false);
        });

        it('should return false for position far beyond right boundary', () => {
            expect(inBounds({ x: 100, y: 3 }, worldSize)).toBe(false);
        });

        it('should return false for position far beyond bottom boundary', () => {
            expect(inBounds({ x: 5, y: 100 }, worldSize)).toBe(false);
        });

        it('should return false for both coordinates negative', () => {
            expect(inBounds({ x: -5, y: -3 }, worldSize)).toBe(false);
        });

        it('should return false for both coordinates beyond bounds', () => {
            expect(inBounds({ x: 15, y: 10 }, worldSize)).toBe(false);
        });
    });

    describe('edge cases', () => {
        it('should work with 1x1 world', () => {
            const tinyWorld: Vec = { x: 1, y: 1 };
            expect(inBounds({ x: 0, y: 0 }, tinyWorld)).toBe(true);
            expect(inBounds({ x: 1, y: 0 }, tinyWorld)).toBe(false);
            expect(inBounds({ x: 0, y: 1 }, tinyWorld)).toBe(false);
        });

        it('should work with rectangular world (wide)', () => {
            const wideWorld: Vec = { x: 20, y: 5 };
            expect(inBounds({ x: 19, y: 4 }, wideWorld)).toBe(true);
            expect(inBounds({ x: 20, y: 4 }, wideWorld)).toBe(false);
        });

        it('should work with rectangular world (tall)', () => {
            const tallWorld: Vec = { x: 5, y: 20 };
            expect(inBounds({ x: 4, y: 19 }, tallWorld)).toBe(true);
            expect(inBounds({ x: 4, y: 20 }, tallWorld)).toBe(false);
        });
    });
});