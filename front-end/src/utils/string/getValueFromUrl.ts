/**
 * Takes an url and returns the value you want from it
 * @param inputString the url
 * @param valueName the bit you want back
 * @returns string
 */
const getValueFromUrl = (inputString: string, valueName: string): string => {
    let returnVal: string = "";

    const delimiters = {
        query: "?",
        nameToValue: "="
    };

    const splitInput: string[] = inputString.split(delimiters.query);
    splitInput.shift();

    for (let i = 0; i < splitInput.length; i++) {
        const splitValue: string[] = splitInput[i].split(
            delimiters.nameToValue
        );

        if (splitValue[0] === valueName) {
            returnVal = splitValue[1];
        }
    }

    return returnVal;
};

export default getValueFromUrl;
