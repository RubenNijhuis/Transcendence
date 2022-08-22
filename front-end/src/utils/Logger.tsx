// Logger
const Logger = (type: string, message: string, obj: any) => {
    let typeEmoij: String = '';

    if (type === 'AUTH')
        typeEmoij = '💂‍♂️';
    if (type === 'GAME')
        typeEmoij = '🏓';
    if (type === 'DEBUG')
        typeEmoij = '🕷';
    
    console.log(typeEmoij, message, obj);
}

export default Logger;