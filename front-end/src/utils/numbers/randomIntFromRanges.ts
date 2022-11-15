import randomIntFromRange from "./randomIntFromRange";

type numberRange = [number, number];

/**
 * Returns a random int from a range
 * @param firstRange
 * @param secondRange
 * @returns int
 */
const randomIntFromRanges = (
    firstRange: numberRange,
    secondRange: numberRange
): number => {
    const grabFirstRange = Math.random() > 0.5;
    let randomInt = 0;
    let range: numberRange = [0, 0];

    if (grabFirstRange) {
        range = firstRange;
    } else {
        range = secondRange;
    }

    randomInt = randomIntFromRange(range[0], range[1]);

    return randomInt;
};

export default randomIntFromRanges;
