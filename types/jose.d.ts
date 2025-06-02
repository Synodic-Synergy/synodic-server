declare module 'jose' {
  export class SignJWT {
    constructor(payload: any);
    setProtectedHeader(header: { alg: string }): this;
    setIssuedAt(): this;
    setExpirationTime(time: string): this;
    sign(key: Uint8Array): Promise<string>;
  }

  export const jwtVerify: (token: string, key: Uint8Array) => Promise<{ payload: any }>;
} 