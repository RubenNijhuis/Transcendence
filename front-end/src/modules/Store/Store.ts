/**
 * Sets an item in the store
 * @param name of the item
 * @param value can be any value
 */
const setItem = (name: string, value: any) => {
    if (value !== undefined) localStorage.setItem(name, JSON.stringify(value));
};

/**
 * Retrieves an item with type <T> from the store.
 * Returns null if the items wasn't found
 * @param name of the item
 * @returns item as type <T> or null
 */
const getItem = <T>(name: string): T | null => {
    const itemExists = localStorage.getItem(name) !== undefined;
    const value: string | null = itemExists ? localStorage.getItem(name) : null;

    if (value === null) return value as null;

    const transformedValue: T = JSON.parse(value);
    return transformedValue;
};

/**
 * Removes an items from the store
 * @param name
 * @returns 
 */
const removeItem = (name: string) => localStorage.removeItem(name);

/**
 * Clears all items from the store
 * @returns nothing
 */
const clearAll = () => localStorage.clear();

/**
 * Returns the amount of keys in the store
 * @returns number indicating amount of items in the store
 */
const amountKeys = (): number => localStorage.length;

export { setItem, getItem, removeItem, clearAll, amountKeys };
