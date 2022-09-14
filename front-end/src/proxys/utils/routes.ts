/**
 * All routes the front-end uses to interact with the api/backend
 * 
 * Every path is a function as sometimes a parameter might
 * be required to create a full path. To keep it simple every route
 * is a function
 */
const ApiRoutes = {
    createUser: () => '/api/users/create',
    getUser: (id: string) => `/api/id/${id}`
};

export default ApiRoutes;