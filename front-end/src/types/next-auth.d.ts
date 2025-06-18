import { DefaultUser } from "next-auth";

// Module augmentation
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      username?: string;
      email?: string | null;
    };
    access_token?: string;
    refresh_token?: string;
    refresh_token_expiry?: string;
  }

  interface User extends DefaultUser {
    id?: string;
    username?: string;
    access_token?: string;
    refresh_token?: string;
    refresh_token_expiry?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    email?: string | null;
    access_token?: string;
    refresh_token?: string;
    refresh_token_expiry?: string;
  }
}
