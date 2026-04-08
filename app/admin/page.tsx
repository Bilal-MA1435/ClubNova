import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <main className="shell py-12 md:py-16">
      <div className="space-y-3">
        <p className="eyebrow">Admin</p>
        <h1 className="text-4xl md:text-5xl">Admin control center foundation</h1>
        <p className="max-w-2xl">
          This route is protected by middleware and session role checks. It is now ready for user management, review
          operations, announcements, analytics charts, and audit logs.
        </p>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          "Review queue",
          "Project moderation",
          "Member access control",
          "Operational analytics"
        ].map((item) => (
          <article key={item} className="surface p-6">
            <h2 className="text-2xl">{item}</h2>
            <p className="mt-3">Reserved for the next implementation slice.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
