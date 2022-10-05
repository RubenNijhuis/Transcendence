import User from "src/entities/user/user.entity";

type JwtPayload = {
  sub: string;
  username: string;
};

type PayloadType = {
  intraID: string;
};

interface AuthTokenType {
  accessToken: string;
  refreshToken: string;
}

interface LoginConfirmPayload {
  shouldCreateUser: boolean;
  profile: null | User;
  authToken: AuthTokenType;
}

export { AuthTokenType, PayloadType, JwtPayload, LoginConfirmPayload };
