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

export { AuthTokenType, PayloadType, JwtPayload };
