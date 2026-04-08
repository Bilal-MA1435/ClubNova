import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { TopNav } from "@/components/top-nav";
import { getAdminOverview } from "@/lib/platform-data";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const overview = await getAdminOverview();
  const pendingCount = overview.submissions.filter((submission) => submission.status !== "Reviewed").length;
  const reviewedCount = overview.submissions.filter((submission) => submission.status === "Reviewed").length;

  return (
    <main className="shell py-12 md:py-16">
      <TopNav />
      <div className="space-y-3">
        <p className="eyebrow">Admin</p>
        <h1 className="text-4xl md:text-5xl">Admin control center</h1>
        <p className="max-w-2xl">
          This route is protected by middleware and session role checks. It now includes a usable overview of members,
          submissions, challenge activity, and leaderboard momentum for your demo.
        </p>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Members", value: overview.users.length, detail: "Tracked user accounts" },
          { title: "Challenges", value: overview.challenges.length, detail: "Active club briefs" },
          { title: "Reviewed", value: reviewedCount, detail: "Scored submissions" },
          { title: "Pending", value: pendingCount, detail: "Awaiting manual follow-up" }
        ].map((item) => (
          <article key={item.title} className="surface p-6">
            <p className="text-sm font-medium text-muted">{item.title}</p>
            <h2 className="mt-3 text-4xl">{item.value}</h2>
            <p className="mt-2">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="surface p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Review queue</p>
              <h2 className="mt-2 text-2xl">Latest submissions</h2>
            </div>
            <div className="rounded-md bg-brand-soft px-4 py-2 text-sm font-semibold text-brand-strong">
              {overview.submissions.length} total
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {overview.submissions.length > 0 ? (
              overview.submissions.slice(0, 6).map((submission) => (
                <div key={submission.id} className="rounded-md border border-line/60 px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{submission.challenge.title}</p>
                      <p className="mt-1 text-sm">
                        {submission.user.name ?? "Member"} • {submission.status}
                      </p>
                      <p className="mt-1 text-sm text-muted">{submission.feedback ?? "No feedback yet."}</p>
                    </div>
                    <p className="font-display text-2xl font-semibold text-slate-950">{submission.score}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-md border border-dashed border-line/70 px-4 py-6 text-sm text-muted">
                No submissions have been received yet.
              </div>
            )}
          </div>
        </article>

        <article className="surface p-6">
          <p className="eyebrow">Operations</p>
          <h2 className="mt-2 text-2xl">Leaderboard and challenge health</h2>
          <div className="mt-6 space-y-4">
            {overview.leaderboard.slice(0, 5).map((entry, index) => (
              <div key={entry.user.id} className="rounded-md border border-line/60 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      #{index + 1} {entry.user.name ?? "Member"}
                    </p>
                    <p className="text-sm text-muted">{entry.submissions} submissions</p>
                  </div>
                  <p className="font-display text-2xl font-semibold text-slate-950">{entry.score}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {overview.challenges.map((challenge) => (
              <div key={challenge.id} className="rounded-md bg-panelAlt/70 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{challenge.title}</p>
                    <p className="text-sm text-muted">
                      {challenge.category} • {challenge.difficulty}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{challenge.submissions.length} submissions</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
