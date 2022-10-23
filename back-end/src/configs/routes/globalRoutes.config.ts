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

  // set user
  setUser: "setUser",

  // remove user
  remove: "remove",

  // enabeling 2fa
  enableTfa: "enable2fa",

  // getting a profile/banner picture
  getPic: "get-img/:imageType/:username",

  // uploading banner pic
  uploadBannerPic: "upload-banner-pic",

  // uploading profile pic
  uploadProfilePic: "upload-profile-pic",

  // seeding database
  // seed: "seeder",

  // seeding database with amount
  // seedAmount: "seeder-amount",

  // seeding database based on amount of friends
  // seedFriendAmount: "seeder-amount"
};
export default UserRoutes;
