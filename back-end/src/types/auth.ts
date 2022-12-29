import User from "src/entities/user/user.entity";

type JwtPayload = {
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
  TWOfaEnabled: boolean;
}

export { AuthTokenType, JwtPayload, LoginConfirmPayload };
