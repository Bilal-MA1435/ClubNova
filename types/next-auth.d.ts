import type { DefaultSession } from "next-auth";
import type { Role } from "@prisma/client";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: Role;
      profileCompleted: boolean;
      onboardingStatus: string;
    };
  }

  interface User {
    role?: Role;
    profileCompleted?: boolean;
    onboardingStatus?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: Role;
    profileCompleted?: boolean;
    onboardingStatus?: string;
  }
}
