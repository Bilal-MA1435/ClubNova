import {
  Activity,
  Blocks,
  FolderKanban,
  ShieldCheck,
  Trophy,
  Users
} from "lucide-react";

export const navigation = [
  { label: "Platform", href: "#platform" },
  { label: "Challenges", href: "#challenges" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Admin", href: "#admin" }
];

export const stats = [
  { label: "Active members", value: "128" },
  { label: "Projects tracked", value: "34" },
  { label: "Challenge submissions", value: "412" },
  { label: "Weekly review sessions", value: "9" }
];

export const pillars = [
  {
    title: "Member identity",
    description: "Profiles, role-aware access, skill tags, performance history, and contribution records in one system.",
    icon: Users
  },
  {
    title: "Challenge operations",
    description: "Submissions with GitHub and live links, scoring workflows, review pipelines, and leaderboard movement.",
    icon: Trophy
  },
  {
    title: "Project showcase",
    description: "Curated product stories with documentation, technical stack, screenshots, and team ownership.",
    icon: FolderKanban
  },
  {
    title: "Department control",
    description: "Announcements, analytics, moderation, audit visibility, and operational workflows for organizers.",
    icon: ShieldCheck
  }
];

export const workflows = [
  {
    step: "01",
    title: "Clear roles and data boundaries",
    description: "Visitors, members, organizers, and admins get predictable access rules and page states."
  },
  {
    step: "02",
    title: "Operational home for technical work",
    description: "Events, challenges, reviews, and project showcases live in one architecture, not separate tools."
  },
  {
    step: "03",
    title: "Live performance visibility",
    description: "Leaderboards and member dashboards update from submission and participation data."
  }
];

export const previews = [
  {
    title: "Challenge review queue",
    description: "Pending submissions, review status, deadline windows, and score distribution per challenge.",
    icon: Blocks
  },
  {
    title: "Performance dashboard",
    description: "Rank movement, participation streaks, and contribution analytics shaped for members and admins.",
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
