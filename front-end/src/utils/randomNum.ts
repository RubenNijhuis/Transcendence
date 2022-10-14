// Function to generate random number
function randomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export default randomNumberInRange;
