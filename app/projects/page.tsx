import { TopNav } from "@/components/top-nav";
import { featuredProjects } from "@/lib/platform-data";

export default function ProjectsPage() {
  return (
    <main className="shell py-12 md:py-16">
      <TopNav />
      <div className="space-y-3">
        <p className="eyebrow">Projects</p>
        <h1 className="text-4xl md:text-5xl">Featured builds from the club.</h1>
        <p className="max-w-2xl">
          This seeded showcase gives you a polished project portfolio for the demo and establishes the structure for a
          later database-backed project system.
        </p>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <article key={project.title} className="surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">{project.year}</p>
            <h2 className="mt-3 text-2xl">{project.title}</h2>
            <p className="mt-3">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">Team size: {project.teamSize}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
