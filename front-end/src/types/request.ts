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

interface ConfirmLoginResponse {
    shouldCreateUser: boolean;
    profile: ProfileType;
    authToken: AuthTokenType;
}

interface SignInResponse {
    profile: ProfileType;
    shouldCreateUser: boolean;
}

export type { RequestErrorType, ConfirmLoginResponse, AuthTokenType, SignInResponse };

export { AuthStatusType };
