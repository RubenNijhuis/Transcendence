/**
 * Capitalizes the first letter of any string
 * @param str 
 * @returns 
 */
const capitalizeString = (str: string): string => {
    const firstLetterCap = str.charAt(0).toUpperCase();
    const remainingLetters = str.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;

    return capitalizedWord;
};

export { capitalizeString };