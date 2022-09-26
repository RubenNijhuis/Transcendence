const setItem = (name: string, value: any) =>
    localStorage.setItem(name, JSON.stringify(value));

const getItem = <T>(name: string): T | null => {
    const value: string | null = localStorage.getItem(name);

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
