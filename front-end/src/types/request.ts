import { Profile } from "./profile";

interface RequestError {
    error: string;
    requestUrl: string;
    type: string;
}

interface LoginConfirmResponse {
    shouldCreateUser: boolean;
    profile: null | Profile;
    authToken: string;
}

export type { RequestError, LoginConfirmResponse };
