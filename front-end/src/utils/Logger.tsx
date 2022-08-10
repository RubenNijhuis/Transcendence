// Logger
const Logger = (type: string, message: string, obj: any) => {
    let typeEmoij = '';

    if (type === 'AUTH')
        typeEmoij = '💂‍♂️';
    
    console.log(typeEmoij, message, obj);
}

export default Logger;