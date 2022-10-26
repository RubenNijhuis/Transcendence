import { ProfileType } from "./profile";

// Game types
const enum AuthStatusType {
    Valid,
    Invalid,
    Revoked
}

interface AuthTokenType {
    accessToken: string;
    refreshToken: string;
}

interface RequestErrorType {
    error: string;
    requestUrl: string;
    type: string;
}

interface LoginConfirmResponse {
    shouldCreateUser: boolean;
    profile: ProfileType;
    authToken: AuthTokenType;
}

export type { RequestErrorType, LoginConfirmResponse, AuthTokenType };

export { AuthStatusType };
