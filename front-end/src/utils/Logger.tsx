interface Loggable {
    [key: string]: {
        emoij: string;
        color: string;
        allowed: boolean;
    };
}

const Logger = (type: string, from: string, message: string, obj: any) => {
    // Format the obj into a string and remove double qoutes
    const formattedObj: string = JSON.stringify(obj, null, 4).replace(/"/g, "");

    // All types and their settings
    const logTypes: Loggable = {
        AUTH: {
            emoij: "💂‍♂️",
            color: "#374f6b",
            allowed: false
        },
        GAME: {
            emoij: "🏓",
            color: "#fb21ff",
            allowed: true
        },
        DEBUG: {
            emoij: "🕷",
            color: "#fff536",
            allowed: true
        },
        ERROR: {
            emoij: "💥",
            color: "#ff8282",
            allowed: true
        }
    };

    // Get the log type based on type input
    if (logTypes[type].allowed !== false) {
        const { emoij, color } = logTypes[type];

        // Output the message
        console.log(
            `%c${emoij}%c ${message}\n%cFrom: ${from}\n%c${formattedObj}`,
            /* Emoij   */ `background-color: ${color}; font-size: 18px; border-radius: 2px; padding: 0 2px;`,
            /* Message */ `color: white; margin-bottom: 6px`,
            /* From    */ `color: rgba(255,255,255,0.25); margin-bottom: 6px`,
            /* Object  */ `color: rgb(230,230,230);`
        );
    }
};

export default Logger;
