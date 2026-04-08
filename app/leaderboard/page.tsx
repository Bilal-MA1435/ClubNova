import { TopNav } from "@/components/top-nav";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/platform-data";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();

  return (
    <main className="shell py-12 md:py-16">
      <TopNav />
      <div className="space-y-3">
        <p className="eyebrow">Leaderboard</p>
        <h1 className="text-4xl md:text-5xl">Current standings across the club.</h1>
        <p className="max-w-2xl">
          Scores are calculated from reviewed submissions. This gives you a clean demo story for competition and
          contribution visibility.
        </p>
      </div>

      <section className="mt-10 space-y-4">
        {leaderboard.map((entry: LeaderboardEntry, index: number) => (
          <article key={entry.user.id} className="surface flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Rank #{index + 1}</p>
              <h2 className="mt-2 text-2xl">{entry.user.name ?? "Member"}</h2>
              <p>{entry.submissions} reviewed submissions</p>
            </div>
            <div className="text-right">
              <p className="font-display text-4xl font-semibold text-slate-950">{entry.score}</p>
              <p className="text-sm text-muted">{entry.user.role}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
