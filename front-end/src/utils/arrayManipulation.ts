import randomNum from "./randomNum";

const shuffleArray = <T>(array: T[]): T[] => {
    let curId: number = array.length;
    // There remain elements to shuffle

    while (0 !== curId) {
        // Pick a remaining element
        let randId: number = Math.floor(Math.random() * curId);
        curId -= 1;

        // Swap it with the current element.
        let tmp: T = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }

    return array;
};

const randomSliceOfArray = <T>(items: Array<T>, size: number): T[] => {
    let randomSlice: T[] = [];

    const arrayLen: number = items.length;
    const startPos: number = randomNum(0, arrayLen - size - 1);
    const endPos: number = startPos + size;

    randomSlice = items.slice(startPos, endPos);
    return shuffleArray(randomSlice);
};

export { shuffleArray, randomSliceOfArray };
