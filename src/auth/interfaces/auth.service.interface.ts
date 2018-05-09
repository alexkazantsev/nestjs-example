export interface TokenResponse {
  expires_in: number;
  access_token: string;
}

export interface AuthServiceInterface {
  createToken(): Promise<TokenResponse>;
  validateUser(signedUser: any): Promise<{}>;
}
