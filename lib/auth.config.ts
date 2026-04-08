import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  pages: {
    signIn: "/signin"
  },
  session: {
    strategy: "database"
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const pathname = request.nextUrl.pathname;

      if (pathname.startsWith("/admin")) {
        return auth?.user?.role === "ADMIN";
      }

      if (pathname.startsWith("/dashboard")) {
        return isLoggedIn;
      }

      return true;
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role ?? "MEMBER";
        session.user.profileCompleted = user.profileCompleted ?? false;
        session.user.onboardingStatus = user.onboardingStatus ?? "pending";
      }

      return session;
    }
  }
} satisfies NextAuthConfig;
