const setItem = (name: string, value: any) => {
    if (value !== undefined) localStorage.setItem(name, JSON.stringify(value));
};

const getItem = <T>(name: string): T | null => {
    const itemExists = localStorage.getItem(name) !== undefined;
    const value: string | null = itemExists ? localStorage.getItem(name) : null;

    if (value !== null) {
        const transformedValue: T = JSON.parse(value);
        return transformedValue;
    }

    return value as null;
};

const removeItem = (name: string) => localStorage.removeItem(name);

const clearAll = () => localStorage.clear();

const amountKeys = (): number => localStorage.length;

export { setItem, getItem, removeItem, clearAll, amountKeys };
