/**
 * Paginates an array into a double array
 * @param items
 * @param amountPerPage
 * @returns
 */
const PaginateArray = (items: any[], amountPerPage: number): any[][] => {
    const pageCollection: any[][] = [];

    let page: any[] = [];

    for (let i = 0; i < items.length; i++) {
        if (i % amountPerPage === 0 && i !== 0) {
            pageCollection.push(page);
            page = [];
        }

        page.push(items[i]);
    }

    if (page.length !== 0) pageCollection.push(page);

    return pageCollection;
};

export { PaginateArray };
