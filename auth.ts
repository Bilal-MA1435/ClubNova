import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";

const demoAdminEmail = process.env.DEMO_ADMIN_EMAIL ?? "admin@clubhub.dev";
const demoAdminPassword = process.env.DEMO_ADMIN_PASSWORD ?? "clubhub-admin";
const demoMemberEmail = process.env.DEMO_MEMBER_EMAIL ?? "member@clubhub.dev";
const demoMemberPassword = process.env.DEMO_MEMBER_PASSWORD ?? "clubhub-member";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    Credentials({
      name: "Demo Access",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").toLowerCase();
        const password = String(credentials?.password ?? "");

        if (email === demoAdminEmail && password === demoAdminPassword) {
          const user = await db.user.upsert({
            where: { email },
            update: {
              role: "ADMIN",
              profileCompleted: true,
              onboardingStatus: "complete",
              name: "Club Hub Admin"
            },
            create: {
              email,
              name: "Club Hub Admin",
              role: "ADMIN",
              profileCompleted: true,
              onboardingStatus: "complete",
              title: "Admin"
            }
          });

          return user;
        }

        if (email === demoMemberEmail && password === demoMemberPassword) {
          const user = await db.user.upsert({
            where: { email },
            update: {
              role: "MEMBER",
              profileCompleted: true,
              onboardingStatus: "complete",
              name: "Club Hub Member"
            },
            create: {
              email,
              name: "Club Hub Member",
              role: "MEMBER",
              profileCompleted: true,
              onboardingStatus: "complete",
              title: "Member"
            }
          });

          return user;
        }

        return null;
      }
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "MEMBER";
        token.profileCompleted = user.profileCompleted ?? false;
        token.onboardingStatus = user.onboardingStatus ?? "pending";
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.role = (token.role as "VISITOR" | "MEMBER" | "ORGANIZER" | "ADMIN" | undefined) ?? "MEMBER";
        session.user.profileCompleted = Boolean(token.profileCompleted ?? false);
        session.user.onboardingStatus = String(token.onboardingStatus ?? "pending");
      }

      return session;
    }
  },
  events: {
    async createUser({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          role: "MEMBER"
        }
      });
    }
  }
});
