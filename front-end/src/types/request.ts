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

interface CreateUserParams {
    username: string;
    color: string;
    description: string;
}

interface TokenValidityResponse {
    user: ProfileType;
}

interface ImageSelect {
    profile: boolean;
    banner: boolean;
}

export type {
    RequestErrorType,
    ConfirmLoginResponse,
    AuthTokenType,
    SignInResponse,
    CreateUserParams,
    TokenValidityResponse,
    ImageSelect
};

export { AuthStatusType };
