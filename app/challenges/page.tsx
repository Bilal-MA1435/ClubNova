import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SubmissionButton } from "@/components/challenges/submission-button";
import { TopNav } from "@/components/top-nav";
import {
  createSubmission,
  getChallenges,
  getLeaderboard,
  tagList,
  type ChallengeWithRelations,
  type LeaderboardEntry
} from "@/lib/platform-data";

async function submitChallenge(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  const challengeId = String(formData.get("challengeId") ?? "");
  const githubUrl = String(formData.get("githubUrl") ?? "").trim();
  const liveUrl = String(formData.get("liveUrl") ?? "").trim();
  const urlPattern = /^https?:\/\/.+/i;

  if (!urlPattern.test(githubUrl) || !urlPattern.test(liveUrl)) {
    redirect("/challenges?error=invalid-url");
  }

  try {
    await createSubmission({
      challengeId,
      userId: session.user.id,
      githubUrl,
      liveUrl
    });
  } catch {
    redirect("/challenges?error=duplicate");
  }

  revalidatePath("/challenges");
  revalidatePath("/leaderboard");
  revalidatePath("/dashboard");
  revalidatePath("/admin");
  redirect("/challenges?success=submitted");
}

export default async function ChallengesPage({
  searchParams
}: {
  searchParams?: Promise<{
    error?: string | string[];
    success?: string | string[];
  }>;
}) {
  const session = await auth();
  const [challenges, leaderboard] = await Promise.all([getChallenges(), getLeaderboard()]);
  const params = ((searchParams ? await searchParams : {}) ?? {}) as {
    error?: string | string[];
    success?: string | string[];
  };

  const error = typeof params?.error === "string" ? params.error : "";
  const success = typeof params?.success === "string" ? params.success : "";

  return (
    <main className="shell py-12 md:py-16">
      <TopNav />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="eyebrow">Challenges</p>
          <h1 className="text-4xl md:text-5xl">Pick a challenge and submit your work.</h1>
          <p className="max-w-3xl">
            Add your GitHub repo and live link, avoid duplicates, and move up the leaderboard.
          </p>
        </div>
        <div className="surface px-5 py-4">
          <p className="text-sm font-medium text-slate-700">
            {session?.user ? `Signed in as ${session.user.name ?? "member"}` : "Sign in to submit"}
          </p>
        </div>
      </div>

      {success ? (
        <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Submission received and reflected in the leaderboard.
        </div>
      ) : null}
      {error ? (
        <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error === "duplicate" ? "Duplicate GitHub or live URL detected." : "Both links must be valid URLs."}
        </div>
      ) : null}

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {challenges.map((challenge: ChallengeWithRelations) => (
            <article key={challenge.id} className="surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-strong">
                      {challenge.difficulty}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                      {challenge.category}
                    </span>
                  </div>
                  <h2 className="text-2xl">{challenge.title}</h2>
                  <p>{challenge.description}</p>
                </div>
                <div className="rounded-md border border-line/70 bg-panelAlt/60 px-4 py-3 text-sm">
                  <p className="font-semibold text-slate-900">{challenge.points} pts</p>
                  <p>Due {new Date(challenge.deadline).toLocaleDateString("en-IN")}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {tagList(challenge.tags).map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                <form action={submitChallenge} className="contents">
                  <input type="hidden" name="challengeId" value={challenge.id} />
                  <input
                    type="url"
                    name="githubUrl"
                    placeholder="GitHub repository URL"
                    required
                    className="rounded-md border border-line/70 px-4 py-3"
                  />
                  <input
                    type="url"
                    name="liveUrl"
                    placeholder="Live project URL"
                    required
                    className="rounded-md border border-line/70 px-4 py-3"
                  />
                  <SubmissionButton />
                </form>
              </div>
            </article>
          ))}
        </div>

        <aside className="surface p-6">
          <p className="eyebrow">Leaderboard</p>
          <h2 className="mt-3 text-2xl">Top members</h2>
          <div className="mt-6 space-y-4">
            {leaderboard.slice(0, 5).map((entry: LeaderboardEntry, index: number) => (
              <div key={entry.user.id} className="flex items-center justify-between rounded-md border border-line/60 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-900">
                    #{index + 1} {entry.user.name ?? "Member"}
                  </p>
                  <p className="text-sm">{entry.submissions} submissions</p>
                </div>
                <p className="font-display text-2xl font-semibold text-slate-950">{entry.score}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
