import { generateGroupChats } from "./chats";
import { generateProfile } from "./profile";
import { generateGameResult } from "./game";

const get_img_url = (width: number, height: number) =>
    `https://picsum.photos/${width}/${height}`;

export { generateProfile, generateGroupChats, generateGameResult, get_img_url };
