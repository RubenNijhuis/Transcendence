import { ProfileType } from "./profile";

// Game types
const enum AuthStatusType {
    Valid,
    Invalid,
    Revoked
}

interface AuthTokenType {
    jsonWebToken: string;
    refreshToken: string;
}

interface RequestErrorType {
    error: string;
    requestUrl: string;
    type: string;
}

interface LoginConfirmResponse {
    shouldCreateUser: boolean;
    profile: null | ProfileType;
    authToken: AuthTokenType;
}

export type { RequestErrorType, LoginConfirmResponse, AuthTokenType };

export { AuthStatusType };
