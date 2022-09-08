/**
 * Generates a random number between two number
 * @param min 
 * @param max 
 * @returns 
 */
const randomIntFromInterval = (min: number, max: number) => {
    // var randomNum: Number = Math.random();
    // if (randomNum < 0.5) return min;
    // else return max;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export default randomIntFromInterval;
