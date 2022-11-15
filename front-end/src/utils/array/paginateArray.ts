/**
 * Paginates an array into a double array
 * @param items
 * @param amountPerPage
 * @returns
 */
const paginateArray = <T>(items: Array<T>, amountPerPage: number): T[][] => {
    const pageCollection: T[][] = [];

    let page: T[] = [];

    for (let i = 0; i < items.length; i++) {
        // If a page is full push it to the collection
        if (i % amountPerPage === 0 && i !== 0) {
            pageCollection.push(page);
            page = [];
        }

        page.push(items[i]);
    }

    // Any leftovers can be added now
    if (page.length !== 0) pageCollection.push(page);

    return pageCollection;
};

export { paginateArray };
