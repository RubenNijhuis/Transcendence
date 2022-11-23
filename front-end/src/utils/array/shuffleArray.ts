const shuffleArray = <T>(array: T[]): T[] => {
    let curId: number = array.length;
    // There remain elements to shuffle

    while (0 !== curId) {
        // Pick a remaining element
        const randId: number = Math.floor(Math.random() * curId);
        curId -= 1;

        // Swap it with the current element.
        const tmp: T = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }

    return array;
};

export default shuffleArray;
