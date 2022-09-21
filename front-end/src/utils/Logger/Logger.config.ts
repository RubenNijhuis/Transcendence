interface LoggableType {
    [key: string]: {
        emoij: string;
        color: string;
        allowed: boolean;
    };
}

const formatObjectToString = (obj: any) =>
    JSON.stringify(obj, null, 4).replace(/"/g, "");

/**
 * Config this to the types you want for your dev env
 */
const logTypes: LoggableType = {
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

export type { LoggableType };
export { logTypes, formatObjectToString };
