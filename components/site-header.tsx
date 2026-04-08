import Link from "next/link";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-white/85 backdrop-blur">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand text-sm font-bold text-white">
            CH
          </div>
          <div>
            <div className="font-display text-lg font-semibold text-slate-950">Club Hub</div>
            <p className="text-sm leading-5 text-muted">Developer club ecosystem platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#platform" className="btn-secondary hidden sm:inline-flex">
            Explore platform
          </a>
          <a href="#auth" className="btn-primary">
            Member sign in
          </a>
        </div>
      </div>
    </header>
  );
}
