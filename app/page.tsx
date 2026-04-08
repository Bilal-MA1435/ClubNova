import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { HomeSection } from "@/components/home-section";
import { SiteHeader } from "@/components/site-header";
import {
  pillars,
  previews,
  sampleProjects,
  stats,
  teamPreview,
  workflows
} from "@/lib/content";

export default function HomePage() {
  return (
    <main id="top">
      <SiteHeader />

      <section className="border-b border-line/70">
        <div className="shell grid gap-12 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="eyebrow stagger-item" style={{ animationDelay: "80ms" }}>
                For members, organizers, and builders
              </p>
              <h1 className="stagger-item max-w-4xl" style={{ animationDelay: "140ms" }}>
                Run your club, track your work, and show what your team is building.
              </h1>
              <p className="stagger-item max-w-2xl text-lg" style={{ animationDelay: "220ms" }}>
                Join events, submit challenges, explore projects, and manage your community from one clean workspace.
              </p>
            </div>

            <div className="stagger-item flex flex-wrap gap-4" style={{ animationDelay: "300ms" }}>
              <Link href="/signin" className="btn-primary">
                Enter Club Hub
              </Link>
              <Link href="/dashboard" className="btn-secondary">
                Open dashboard
              </Link>
              <Link href="/challenges" className="btn-secondary">
                View challenges
              </Link>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="surface stagger-item p-5"
                  style={{ animationDelay: `${360 + index * 80}ms` }}
                >
                  <dt className="text-sm font-medium text-muted">{stat.label}</dt>
                  <dd className="mt-3 font-display text-3xl font-semibold text-slate-950">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="surface p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-line/70 pb-4">
              <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Quick actions</p>
              <h2 className="mt-2 text-2xl">Jump into the app</h2>
              </div>
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong">
                live demo
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <Link href="/signin" className="flex items-center justify-between rounded-md border border-line/60 px-4 py-4 hover:border-brand/40">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-brand" />
                  <div>
                    <p className="font-medium text-slate-900">Sign in</p>
                    <p className="text-sm text-slate-700">Member and admin access</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </Link>
              <Link href="/challenges" className="flex items-center justify-between rounded-md border border-line/60 px-4 py-4 hover:border-brand/40">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-brand" />
                  <div>
                    <p className="font-medium text-slate-900">Challenges</p>
                    <p className="text-sm text-slate-700">Submit GitHub and live links</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </Link>
              <Link href="/leaderboard" className="flex items-center justify-between rounded-md border border-line/60 px-4 py-4 hover:border-brand/40">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-brand" />
                  <div>
                    <p className="font-medium text-slate-900">Leaderboard</p>
                    <p className="text-sm text-slate-700">See top contributors</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </Link>
            </div>

            <div className="mt-8 rounded-lg bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">Demo accounts</p>
              <p className="mt-3 text-base leading-7 text-slate-200">
                Admin: `admin@clubhub.dev` / `clubhub-admin`
              </p>
              <p className="mt-2 text-base leading-7 text-slate-200">
                Member: `member@clubhub.dev` / `clubhub-member`
              </p>
            </div>
          </aside>
        </div>
      </section>

      <HomeSection
        id="platform"
        eyebrow="Platform"
        title="Everything your club needs in one place"
        description="Use the core areas of the app directly from here."
      >
        <div className="grid-auto">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="surface flex h-full flex-col gap-5 p-6 transition-transform duration-200 ease-emphasis hover:-translate-y-1"
                style={{ animationDelay: `${120 + index * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-soft text-brand-strong">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="How it works"
        title="Simple paths for members and organizers"
        description="Follow the main user flow from sign-in to submissions and rankings."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <article key={workflow.step} className="surface flex gap-5 p-6">
                <div className="font-display text-3xl font-semibold text-brand">{workflow.step}</div>
                <div className="space-y-2">
                  <h3>{workflow.title}</h3>
                  <p>{workflow.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="surface-subtle h-full p-6 md:p-8">
            <p className="eyebrow">Inside the workspace</p>
            <h3 className="mt-3">The same design carries into the rest of the platform</h3>
            <p className="mt-4">
              Members see clear status, organizers get focused oversight, and every page follows the same visual rhythm.
            </p>
            <div className="mt-8 grid gap-4">
              {previews.map((preview) => {
                const Icon = preview.icon;
                return (
                  <div key={preview.title} className="rounded-md border border-line/60 bg-white p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-50 text-amber-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg">{preview.title}</h3>
                        <p>{preview.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </HomeSection>

      <HomeSection
        id="projects"
        eyebrow="Project showcase"
        title="Projects your community can explore"
        description="Open project highlights and see who built them."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {sampleProjects.map((project) => (
            <article key={project.title} className="surface p-6">
              <div className="space-y-3">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </HomeSection>

      <HomeSection
        id="team"
        eyebrow="Team"
        title="Meet the people running the club"
        description="See the people behind the club and what they handle."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {teamPreview.map((person) => (
            <article key={person.name} className="surface p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white">
                {person.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <h3 className="mt-5 text-xl">{person.name}</h3>
              <p className="mt-2 font-medium text-slate-900">{person.role}</p>
              <p className="mt-3">{person.focus}</p>
            </article>
          ))}
        </div>
      </HomeSection>

      <section className="border-t border-line/70 py-20 md:py-28">
        <div className="shell">
          <div className="surface grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div className="space-y-4">
              <p className="eyebrow">Access</p>
              <h2>Ready to use</h2>
              <p>
                Sign in, open challenges, view rankings, and move through the platform like a real user.
              </p>
            </div>

            <div className="rounded-lg bg-slate-950 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">Open next</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                <li>Dashboard</li>
                <li>Challenges</li>
                <li>Leaderboard</li>
                <li>Admin overview</li>
              </ul>
              <Link href="/signin" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Go to sign in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
