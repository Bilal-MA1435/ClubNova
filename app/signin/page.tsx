import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { ProviderButton } from "@/components/auth/provider-button";

async function signInWithProvider(formData: FormData) {
  "use server";

  const provider = formData.get("provider");

  if (provider !== "google" && provider !== "github") {
    return;
  }

  await signIn(provider, { redirectTo: "/dashboard" });
}

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="shell flex min-h-screen items-center py-16">
      <div className="grid w-full gap-8 lg:grid-cols-[1fr_0.95fr]">
        <section className="space-y-6">
          <p className="eyebrow">Authentication foundation</p>
          <h1 className="max-w-3xl">Sign in with Google or GitHub and route members into the right workspace.</h1>
          <p className="max-w-2xl text-lg">
            This is the first production-oriented auth checkpoint for Club Hub. OAuth providers, Prisma-backed
            sessions, role-aware access, and protected route groups are now part of the architecture.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Google and GitHub providers",
              "Database-backed sessions",
              "Role-aware dashboard and admin protection",
              "Session enrichment for onboarding and profile state"
            ].map((item) => (
              <div key={item} className="surface p-5">
                <p className="font-medium text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="surface space-y-6 p-6 md:p-8">
          <div className="space-y-3">
            <p className="eyebrow">Member access</p>
            <h2 className="text-2xl">Choose a provider</h2>
            <p>Production keys go in your environment file, and users are persisted through the Prisma adapter.</p>
          </div>

          <div className="space-y-4">
            <form action={signInWithProvider}>
              <input type="hidden" name="provider" value="google" />
              <ProviderButton label="Google" />
            </form>

            <form action={signInWithProvider}>
              <input type="hidden" name="provider" value="github" />
              <ProviderButton label="GitHub" />
            </form>
          </div>

          <div className="rounded-md border border-line/70 bg-panelAlt/70 p-4">
            <p className="text-sm">
              After sign-in, every user gets a database-backed record with role, onboarding state, and profile flags,
              which makes the dashboard and admin routes straightforward to enforce.
            </p>
          </div>

          <Link href="/" className="text-sm font-semibold text-brand hover:text-brand-strong">
            Back to homepage
          </Link>
        </section>
      </div>
    </main>
  );
}
