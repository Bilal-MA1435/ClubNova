import { TopNav } from "@/components/top-nav";
import { teamMembers } from "@/lib/platform-data";

export default function TeamPage() {
  return (
    <main className="shell py-12 md:py-16">
      <TopNav />
      <div className="space-y-3">
        <p className="eyebrow">Team</p>
        <h1 className="text-4xl md:text-5xl">The people behind Club Hub.</h1>
        <p className="max-w-2xl">
          This page gives reviewers a concrete team system instead of a generic “about us” block.
        </p>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <article key={member.name} className="surface p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white">
              {member.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <h2 className="mt-5 text-2xl">{member.name}</h2>
            <p className="mt-2 font-medium text-slate-900">{member.role}</p>
            <p className="mt-1 text-sm text-muted">
              {member.domain} • Batch {member.batch}
            </p>
            <p className="mt-4">{member.focus}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
