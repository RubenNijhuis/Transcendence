const capitalizeString = (str: string) => {
    const firstLetterCap = str.charAt(0).toUpperCase();
    const remainingLetters = str.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;

    return capitalizedWord;
};

export { capitalizeString };