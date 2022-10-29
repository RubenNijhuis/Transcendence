import { logTypes } from "./Logger.config";
import { formatConfig } from "./Logger.bl";

/**
 * Logs a stylized console message
 *
 * @param type Error type
 * @param from Function of origin
 * @param message Anything extra
 * @param obj The data to be displayed
 */
const Logger = (
    type: string,
    from: string,
    message: string,
    obj: any
): void => {
    // If the type isn't allowed to output don't output
    if (logTypes[type].allowed === false) return;

    // If the type doesn't exist in the config throw a warning
    if (logTypes.hasOwnProperty(type) === false) {
        console.warn(formatConfig.typeError(type));
        return;
    }

    const { emoij, color } = logTypes[type];

    // Output the message
    const emoijFormat = `background-color: ${color}; font-size: 18px; border-radius: 2px; padding: 0 2px;`;
    const messageFormat = `color: white; margin-bottom: 6px`;
    const fromFormat = `color: rgba(255,255,255,0.25); margin-bottom: 6px`;

    console.log(
        `%c${emoij}%c ${message}\n%cFrom: ${from}`,
        emoijFormat,
        messageFormat,
        fromFormat,
        obj
    );
};

export default Logger;
