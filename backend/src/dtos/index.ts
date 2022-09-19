import authDtos from "./auth";
import blocklistDtos from "./blocklist";
import chatDtos from "./chat";
import databaseDtos from "./database";
import friendlistDtos from "./friendlist";
import friendrequestDtos from "./friendrequest";

const dtos = [
    authDtos,
    blocklistDtos,
    databaseDtos,
    friendlistDtos,
    friendrequestDtos,
    chatDtos
];

export {
    authDtos,
    blocklistDtos,
    databaseDtos,
    friendlistDtos,
    friendrequestDtos,
    chatDtos
};

export default dtos;