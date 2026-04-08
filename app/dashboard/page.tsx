import { redirect } from "next/navigation";
import { Activity, FolderKanban, ShieldCheck, Trophy } from "lucide-react";
import { auth, signOut } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { TopNav } from "@/components/top-nav";
import { featuredProjects, getDashboardData, tagList } from "@/lib/platform-data";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  const data = await getDashboardData(session.user.id);
  const metrics = [
    { label: "Open challenges", value: String(data.challenges.length), icon: Trophy },
    { label: "Projects tracked", value: String(featuredProjects.length), icon: FolderKanban },
    {
      label: "Review completion",
      value: `${data.submissions.length ? Math.round((data.reviewedCount / data.submissions.length) * 100) : 0}%`,
      icon: Activity
    },
    { label: "Current rank", value: `#${data.rank}`, icon: ShieldCheck }
  ];

  return (
    <main className="shell py-12 md:py-16">
      <TopNav />
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="space-y-3">
          <p className="eyebrow">Dashboard</p>
          <h1 className="text-4xl md:text-5xl">Welcome back, {session.user.name ?? "member"}.</h1>
          <p className="max-w-2xl">
            Your member space now reflects real submission history, challenge availability, and leaderboard position
            from the local demo dataset.
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
              <h2 className="mt-2 text-3xl">{metric.value}</h2>
            </article>
          );
        })}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="surface p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Performance</p>
              <h3 className="mt-2">Submission history</h3>
            </div>
            <div className="rounded-md bg-brand-soft px-4 py-2 text-sm font-semibold text-brand-strong">
              {data.totalScore} pts total
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {data.submissions.length > 0 ? (
              data.submissions.map((submission) => (
                <div key={submission.id} className="rounded-md border border-line/60 px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{submission.challenge.title}</p>
                      <p className="mt-1 text-sm">{submission.feedback ?? "Awaiting review."}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-semibold text-slate-950">{submission.score}</p>
                      <p className="text-sm text-muted">{submission.status}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-md border border-dashed border-line/70 px-4 py-6 text-sm text-muted">
                No submissions yet. Head to challenges and send one in.
              </div>
            )}
          </div>
        </article>

        <article className="surface p-6">
          <p className="eyebrow">Focus queue</p>
          <h3 className="mt-2">Open challenge opportunities</h3>
          <div className="mt-5 space-y-4">
            {data.challenges.map((challenge) => (
              <div key={challenge.id} className="rounded-md border border-line/60 px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{challenge.title}</p>
                    <p className="mt-1 text-sm">
                      {challenge.category} • {challenge.difficulty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{challenge.points} pts</p>
                    <p className="text-sm text-muted">{new Date(challenge.deadline).toLocaleDateString("en-IN")}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tagList(challenge.tags).map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-10 rounded-lg border border-line/70 bg-slate-950 px-6 py-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">Account state</p>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-sm text-slate-300">Role</p>
            <p className="mt-2 text-xl font-semibold">{session.user.role}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">Profile completed</p>
            <p className="mt-2 text-xl font-semibold">{session.user.profileCompleted ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">Onboarding</p>
            <p className="mt-2 text-xl font-semibold">{session.user.onboardingStatus}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">User ID</p>
            <p className="mt-2 break-all text-sm text-slate-100">{session.user.id}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
