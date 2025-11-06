import { makeInitialSnapshot } from './main';

describe('makeInitialSnapshot', () => {
    it('should create a snapshot with correct initial values', () => {
        const snapshot = makeInitialSnapshot();

        expect(snapshot.tick).toBe(0);
        expect(snapshot.sizeOfWorld).toEqual({ x: 10, y: 6 });
        expect(snapshot.creatures).toHaveLength(3);
    });

    it('should create creatures with correct properties', () => {
        const snapshot = makeInitialSnapshot();

        expect(snapshot.creatures[0]).toEqual({
            id: 1,
            position: { x: 2, y: 3 },
            energy: 100,
            age: 5,
        });
        expect(snapshot.creatures[1]).toEqual({
            id: 2,
            position: { x: 5, y: 1 },
            energy: 80,
            age: 3,
        });
        expect(snapshot.creatures[2]).toEqual({
            id: 3,
            position: { x: 8, y: 4 },
            energy: 120,
            age: 7,
        });
    });

    it('should create an occupancy grid with correct dimensions', () => {
        const snapshot = makeInitialSnapshot();

        expect(snapshot.OccupancyGrid).toHaveLength(6); // y dimension
        expect(snapshot.OccupancyGrid[0]).toHaveLength(10); // x dimension
    });

    it('should place creatures in correct positions on occupancy grid', () => {
        const snapshot = makeInitialSnapshot();

        // Creature 1 at (2, 3)
        expect(snapshot.OccupancyGrid[3]![2]).toBe(1);

        // Creature 2 at (5, 1)
        expect(snapshot.OccupancyGrid[1]![5]).toBe(2);

        // Creature 3 at (8, 4)
        expect(snapshot.OccupancyGrid[4]![8]).toBe(3);
    });

    it('should initialize empty cells with 0', () => {
        const snapshot = makeInitialSnapshot();

        // Check some empty positions
        expect(snapshot.OccupancyGrid[0]![0]).toBe(0);
        expect(snapshot.OccupancyGrid[2]![2]).toBe(0);
        expect(snapshot.OccupancyGrid[5]![9]).toBe(0);
    });

    it('should have mostly empty occupancy grid', () => {
        const snapshot = makeInitialSnapshot();

        let emptyCount = 0;
        let occupiedCount = 0;

        for (const row of snapshot.OccupancyGrid) {
            for (const cell of row) {
                if (cell === 0) emptyCount++;
                else occupiedCount++;
            }
        }

        expect(occupiedCount).toBe(3); // 3 creatures
        expect(emptyCount).toBe(60 - 3); // 10*6 - 3 = 57
    });
});
