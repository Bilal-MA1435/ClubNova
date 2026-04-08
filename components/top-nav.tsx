import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/challenges", label: "Challenges" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/admin", label: "Admin" }
];

export function TopNav() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-full border border-line/70 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 ease-emphasis hover:-translate-y-0.5 hover:border-brand/40 hover:text-slate-950"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
