/**
 * Sets an item in the store
 * @param name of the item
 * @param value can be any value
 */
const setItem = (name: string, value: any): void => {
    localStorage.setItem(name, JSON.stringify(value));
};

/**
 * Retrieves an item with type <T> from the store.
 * Returns null if the items wasn't found
 * @param name of the item
 * @returns item as type <T> or null
 */
const getItem = <T>(name: string): T | null => {
    let itemToReturn: T;

    const valueFromStore = localStorage.getItem(name);
    if (valueFromStore === null) return null;

    itemToReturn = JSON.parse(valueFromStore);

    return itemToReturn;
};

/**
 * Removes an items from the store
 * @param name
 * @returns
 */
const removeItem = (name: string): void => localStorage.removeItem(name);

/**
 * Clears all items from the store
 * @returns nothing
 */
const clearAll = (): void => localStorage.clear();

/**
 * Returns the amount of keys in the store
 * @returns number indicating amount of items in the store
 */
const amountKeys = (): number => localStorage.length;

////////////////////////////////////////////////////////////

export { setItem, getItem, removeItem, clearAll, amountKeys };
