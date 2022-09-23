/**
 * All routes that will be utilized in the backend.
 * 
 * This is a way to centralize all paths for improved readability
 * The prefix will always be the first element of the path when calling a route
 * 
 * example:
 * prefix: user
 * create: create
 * full route: user/create
 */

// routes used in the user controller
const UserRoutes = {
    // user prefix
    prefix: "user",

    // get user
    getUserOnName: ":username",

    // create user
    create: "create",

    // remove user
    remove: "remove",

    // enabeling 2fa
    enableTfa: "enable2fa",

    // uploading banner pic
    uploadBanner: "upload-banner",

    // uploading profile pic
    uploadProfilePic: "upload-profile-pic",

    // seeding database
    seed: "seeder"
}
export default UserRoutes;
