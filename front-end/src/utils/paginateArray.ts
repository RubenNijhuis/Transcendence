const PaginateArray = (matches: any[]): any[][] => {
    const paginatedItems: any[][] = [];

    let amountPerPage = 8;

    let page: any[] = [];

    for (let i = 0; i < matches.length; i++) {
        if (i % amountPerPage === 0 && i !== 0) {
            paginatedItems.push(page);
            page = [];
        }

        page.push(matches[i]);
    }

    if (page.length !== 0) paginatedItems.push(page);

    return paginatedItems;
};

export { PaginateArray };
