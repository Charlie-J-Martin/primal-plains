import { add } from './main';

describe('add function', () => {
    it('should add two positive numbers correctly', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(10, 15)).toBe(25);
        expect(add(1, 1)).toBe(2);
    });

    it('should add negative numbers correctly', () => {
        expect(add(-2, -3)).toBe(-5);
        expect(add(-10, 5)).toBe(-5);
        expect(add(10, -5)).toBe(5);
    });

    it('should handle zero correctly', () => {
        expect(add(0, 0)).toBe(0);
        expect(add(0, 5)).toBe(5);
        expect(add(5, 0)).toBe(5);
        expect(add(-5, 0)).toBe(-5);
    });

    it('should handle decimal numbers correctly', () => {
        expect(add(1.5, 2.5)).toBe(4);
        expect(add(0.1, 0.2)).toBeCloseTo(0.3);
        expect(add(-1.5, 1.5)).toBe(0);
    });

    it('should handle large numbers correctly', () => {
        expect(add(1000000, 2000000)).toBe(3000000);
        expect(add(Number.MAX_SAFE_INTEGER - 1, 1)).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle edge cases', () => {
        expect(add(Infinity, 5)).toBe(Infinity);
        expect(add(-Infinity, 5)).toBe(-Infinity);
        expect(add(Infinity, -Infinity)).toBeNaN();
    });
});
