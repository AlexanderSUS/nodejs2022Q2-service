export interface JwtTokenPayload {
  login: string;
  userId: string;
  iat: number;
  exp: number;
}
