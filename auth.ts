import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  events: {
    async createUser({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          role: "MEMBER"
        }
      });
    }
  },
  ...authConfig
});
