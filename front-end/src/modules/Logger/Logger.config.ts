const enum LogTypes {
    AUTH,
    GAME,
    DEBUG,
    ERROR
}

/**
 * Config this to the types you want for your dev env
 */
const logTypes = [
    {
        emoij: "💂‍♂️",
        color: "#374f6b",
        allowed: true
    },
    {
        emoij: "🏓",
        color: "#fb21ff",
        allowed: true
    },
    {
        emoij: "🕷",
        color: "#fff536",
        allowed: true
    },
    {
        emoij: "💥",
        color: "#ff8282",
        allowed: true
    }
];

///////////////////////////////////////////////////////////

export { LogTypes, logTypes };
