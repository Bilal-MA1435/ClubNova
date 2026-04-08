import {
  Activity,
  Blocks,
  FolderKanban,
  ShieldCheck,
  Trophy,
  Users
} from "lucide-react";

export const navigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Challenges", href: "/challenges" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" }
];

export const stats = [
  { label: "Active members", value: "128" },
  { label: "Projects tracked", value: "34" },
  { label: "Challenge submissions", value: "412" },
  { label: "Weekly review sessions", value: "9" }
];

export const pillars = [
  {
    title: "Profiles",
    description: "Member identity, roles, and activity in one place.",
    icon: Users
  },
  {
    title: "Challenges",
    description: "Submit work, track scores, and move up the board.",
    icon: Trophy
  },
  {
    title: "Projects",
    description: "Browse featured builds, stack choices, and ownership.",
    icon: FolderKanban
  },
  {
    title: "Admin",
    description: "See members, submissions, and club activity at a glance.",
    icon: ShieldCheck
  }
];

export const workflows = [
  {
    step: "01",
    title: "Sign in",
    description: "Open the dashboard with the right role and access."
  },
  {
    step: "02",
    title: "Submit work",
    description: "Send GitHub and live links for challenge review."
  },
  {
    step: "03",
    title: "Track progress",
    description: "See leaderboard rank, review state, and activity."
  }
];

export const previews = [
  {
    title: "Challenge queue",
    description: "Open tasks, deadlines, and recent activity.",
    icon: Blocks
  },
  {
    title: "Dashboard",
    description: "Your recent submissions, rank, and next actions.",
    icon: Activity
  }
];

export const sampleProjects = [
  {
    title: "Issue Radar",
    description: "An internal bug triage cockpit linking tickets, ownership, and incident learnings.",
    stack: ["Next.js", "PostgreSQL", "Prisma"]
  },
  {
    title: "Review Sprint",
    description: "A product review workspace for presentation decks, notes, actions, and follow-up tasks.",
    stack: ["TypeScript", "Tailwind", "Realtime"]
  },
  {
    title: "Club Atlas",
    description: "A member directory with profile discovery, skill mapping, and mentor connection workflows.",
    stack: ["RBAC", "Search", "Analytics"]
  }
];

export const teamPreview = [
  {
    name: "Aarav Mehta",
    role: "Platform Lead",
    focus: "Architecture, review standards, cloud operations"
  },
  {
    name: "Ishita Rao",
    role: "Program Organizer",
    focus: "Events, challenge governance, reporting"
  },
  {
    name: "Neel Khanna",
    role: "Core Full-Stack Developer",
    focus: "Frontend systems, APIs, release readiness"
  }
];
