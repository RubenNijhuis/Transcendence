/**
 * Takes an url and returns the value you want from it
 * @param inputString the url
 * @param valueName the bit you want back
 * @returns string
 */
const getValueFromUrl = (inputString: string, valueName: string): string => {
    let returnVal: string = "";

    const splitInputString: string[] = inputString.split("?");

    for (let i = 1; i < splitInputString.length; i++) {
        const splitValue: string[] = splitInputString[i].split("=");

        if (splitValue[0] === valueName) returnVal = splitValue[1];
    }

    return returnVal;
};

export { getValueFromUrl };
