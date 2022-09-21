import { ProfileType } from "./profile";

interface AuthTokenType {
    jsonWebToken: string;
    refreshToken: string;
}

interface RequestError {
    error: string;
    requestUrl: string;
    type: string;
}

interface LoginConfirmResponse {
    shouldCreateUser: boolean;
    profile: null | ProfileType;
    authToken: AuthTokenType;
}

export type { RequestError, LoginConfirmResponse, AuthTokenType };
