import { redirect } from "next/navigation";
import { Activity, FolderKanban, ShieldCheck, Trophy } from "lucide-react";
import { auth, signOut } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";

const metrics = [
  { label: "Challenges joined", value: "12", icon: Trophy },
  { label: "Projects tracked", value: "5", icon: FolderKanban },
  { label: "Review completion", value: "84%", icon: Activity },
  { label: "Access role", value: "Member", icon: ShieldCheck }
];

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="shell py-12 md:py-16">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="space-y-3">
          <p className="eyebrow">Dashboard</p>
          <h1 className="text-4xl md:text-5xl">Welcome back, {session.user.name ?? "member"}.</h1>
          <p className="max-w-2xl">
            This protected route is now backed by Auth.js and Prisma. Next we can connect real analytics, submissions,
            challenge history, and profile completion flows.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <SignOutButton />
        </form>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className="surface p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-soft text-brand-strong">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-medium">{metric.label}</p>
              <h2 className="mt-2 text-3xl">{metric.label === "Access role" ? session.user.role : metric.value}</h2>
            </article>
          );
        })}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="surface p-6">
          <h3>Auth-backed session data</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-700">
            <p>User ID: {session.user.id}</p>
            <p>Role: {session.user.role}</p>
            <p>Profile completed: {session.user.profileCompleted ? "Yes" : "No"}</p>
            <p>Onboarding status: {session.user.onboardingStatus}</p>
          </div>
        </article>

        <article className="surface p-6">
          <h3>What comes next</h3>
          <div className="mt-5 space-y-3">
            <p>1. Add member profile models and profile settings forms.</p>
            <p>2. Create challenge, submission, leaderboard, and project schemas.</p>
            <p>3. Add server actions and realtime updates for leaderboard movement.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
