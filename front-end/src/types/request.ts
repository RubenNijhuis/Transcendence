import Profile from "./profile";

////////////////////////////////////////////////////////////

namespace Request {
    export interface AuthToken {
        accessToken: string;
        refreshToken: string;
    }

    export interface RequestError {
        error: string;
        requestUrl: string;
        type: string;
    }

    export namespace Response {
        export interface ConfirmLogin {
            shouldCreateUser: boolean;
            profile: Profile.Instance;
            authToken: AuthToken;
            TWOfaEnabled: boolean;
        }

        export interface TokenValidity {
            profile: Profile.Instance;
        }
    }

    export namespace Payload {
        export interface CreateUser {
            username: string;
            color: string;
            description: string;
        }

        export interface ImageSelect {
            profile: boolean;
            banner: boolean;
        }
    }
}

////////////////////////////////////////////////////////////

export default Request;
