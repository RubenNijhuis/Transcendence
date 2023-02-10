// Api config
import ApiRoutes from "../../config/ApiRoutes";
import { API } from "../instances/apiInstance";

// Types
import * as Request from "../../types/Request";
import * as Profile from "../../types/Profile";

// Proxies
import { addImagesToProfile } from "./addImagesToProfile";

import * as Match from '../../types/Match'
import { getProfileByUid } from "./getProfileByUid";

////////////////////////////////////////////////////////////

/**
 * Retrieves a profile based on the uid
 * @param uid
 * @returns
 */
const getMatchesByUsername = async (
    username:string,
): Promise<Match.Record[]> => {
    try {
        const route = ApiRoutes.getMatchesByUsername(username);

        const { data } = await API.get<Match.Record[]>(route);

        for (const record of data) {
            record.playerOne = await getProfileByUid(record.playerOne as unknown as string, { profile: true, banner: false });
            record.playerTwo = await getProfileByUid(record.playerTwo as unknown as string, { profile: true, banner: false });
        }

        return Promise.resolve(data.reverse());
    } catch (err) {
        return Promise.reject(err);
    }
};

///////////////////////////////////////////////////////////

export { getMatchesByUsername };
