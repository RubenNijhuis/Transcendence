const Logger = (type: string, from: string, message: string, obj: any) => {
    // Formatting for in the console
    let typeEmoij: string = "";
    let color: string = "#fff";

    // Format the obj into a string and remove double qoutes
    const formattedObj: string = JSON.stringify(obj, null, 4).replace(/"/g, "");

    // Change icon and color based on message type
    if (type === "AUTH") {
        typeEmoij = "💂‍♂️";
        color = "#374f6b";
    } else if (type === "GAME") {
        typeEmoij = "🏓";
        color = "#fb21ff";
    } else if (type === "DEBUG") {
        typeEmoij = "🕷";
        color = "#fff536";
    }

    // Output the message
    console.log(
        `%c${typeEmoij}%c ${message}\n%cFrom: ${from}\n%c${formattedObj}`,
        /* Emoij   */ `background-color: ${color}; font-size: 18px; border-radius: 2px; padding: 0 2px;`,
        /* Message */ `color: white; margin-bottom: 6px`,
        /* From    */ `color: rgba(255,255,255,0.25); margin-bottom: 6px`,
        /* Object  */ `color: rgb(230,230,230);`
    );
};

export default Logger;
