/**
 * Returns a random int from a range
 * @param min
 * @param max
 * @returns int
 */
const randomIntFromRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
};

export default randomIntFromRange;
