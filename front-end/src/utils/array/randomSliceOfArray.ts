import randomNum from "../numbers/randomIntFromRange";
import shuffleArray from "./shuffleArray";

const randomSliceOfArray = <T>(items: Array<T>, size: number): T[] => {
    let randomSlice: T[] = [];

    const arrayLen: number = items.length;
    const startPos: number = randomNum(0, arrayLen - size - 1);
    const endPos: number = startPos + size;

    randomSlice = items.slice(startPos, endPos);
    return shuffleArray(randomSlice);
};

export default randomSliceOfArray;
