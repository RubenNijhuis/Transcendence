/**
 * Returns a formatted authorization header.
 * Uses 
 */
const getAuthHeader = (authToken: string) => {
    const header = {
        Authorization: `Bearer ${authToken}`
    };

    return header;
};

export { getAuthHeader };
