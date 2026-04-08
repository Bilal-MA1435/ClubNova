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
                Club identity and operations
              </p>
              <h1 className="stagger-item max-w-4xl" style={{ animationDelay: "140ms" }}>
                Club Hub gives your developer ecosystem a structured home for people, projects, challenges, and decisions.
              </h1>
              <p className="stagger-item max-w-2xl text-lg" style={{ animationDelay: "220ms" }}>
                Built for technical clubs that need a public-facing identity and an internal operating layer with
                clean permissions, measurable contribution data, and production-ready workflows.
              </p>
            </div>

            <div className="stagger-item flex flex-wrap gap-4" style={{ animationDelay: "300ms" }}>
              <a href="#platform" className="btn-primary">
                Explore modules
              </a>
              <a href="#auth" className="btn-secondary">
                Plan authentication
              </a>
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
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Homepage goals</p>
                <h2 className="mt-2 text-2xl">A strong first screen with useful context</h2>
              </div>
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong">
                v1 foundation
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {[
                "Explain what Club Hub is in concrete product terms.",
                "Show the platform scope before the user scrolls into details.",
                "Create a stable visual system that can carry the dashboard and admin UI later."
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-brand" />
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">Next implementation</p>
              <p className="mt-3 text-base leading-7 text-slate-200">
                Authentication comes next with Google and GitHub OAuth, role mapping, session guards, and route-level access.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <HomeSection
        id="platform"
        eyebrow="Platform modules"
        title="A homepage that introduces the system without looking like a generic startup template"
        description="Each module preview is grounded in the actual product structure you want to build next."
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
        eyebrow="System flow"
        title="Build order that keeps the architecture clean"
        description="This sequence keeps styling, routing, authentication, and feature modules from drifting apart."
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
            <p className="eyebrow">Why this matters</p>
            <h3 className="mt-3">The homepage should already respect future feature complexity</h3>
            <p className="mt-4">
              That means consistent spacing, reusable cards, and predictable content containers now, so the dashboard,
              team directory, challenge detail pages, and admin panels inherit the same structure.
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
        title="Preview the work your club wants people to remember"
        description="Featured projects should communicate technical depth and ownership without over-decorating the page."
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
        eyebrow="Team preview"
        title="Introduce the club through real roles and responsibilities"
        description="This section avoids fake social clutter and instead shows what each person actually contributes."
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

      <section id="auth" className="border-t border-line/70 py-20 md:py-28">
        <div className="shell">
          <div className="surface grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div className="space-y-4">
              <p className="eyebrow">Next step</p>
              <h2>Authentication should be the first real backend feature we add</h2>
              <p>
                We already have the visual system and homepage foundation. The next implementation step is OAuth with
                Google and GitHub, database-backed users, role assignment, and protected routes for member and admin areas.
              </p>
            </div>

            <div className="rounded-lg bg-slate-950 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-300">Recommended stack</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                <li>NextAuth.js or Auth.js with Google and GitHub providers</li>
                <li>Prisma with PostgreSQL for user, account, session, and role data</li>
                <li>Server actions and route guards for dashboard and admin access</li>
                <li>Reusable auth UI states with loading, error, and success handling</li>
              </ul>
              <a href="#top" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Continue to auth architecture
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
