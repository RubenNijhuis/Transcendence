import { formatObjectToString, logTypes } from "./Logger.config";

/**
 * Logs a stylized console message
 *
 * @param type Error type
 * @param from Function of origin
 * @param message Anything extra
 * @param obj The data to be displayed
 */
const Logger = (type: string, from: string, message: string, obj: any) => {
    const formattedObj: string = formatObjectToString(obj);

    // If the type isn't allowed to output don't output
    if (logTypes[type].allowed === false) return;

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
