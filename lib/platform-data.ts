import type { Challenge, Submission, User } from "@prisma/client";
import { db } from "@/lib/db";

export const featuredProjects = [
  {
    title: "Club Atlas",
    description: "A member directory and discovery hub with profile depth, skill mapping, and contribution tracking.",
    stack: ["Next.js", "Prisma", "Search"],
    year: "2026",
    teamSize: 4
  },
  {
    title: "SprintBoard",
    description: "A challenge operations panel for deadlines, submissions, reviews, and leaderboard movement.",
    stack: ["TypeScript", "SQLite", "Charts"],
    year: "2026",
    teamSize: 3
  },
  {
    title: "Showcase Grid",
    description: "A presentation layer for project documentation, screenshots, and public-facing demos.",
    stack: ["Tailwind", "App Router", "Content"],
    year: "2025",
    teamSize: 5
  }
] as const;

export const teamMembers = [
  {
    name: "Bilal Ahmed",
    role: "Club Lead",
    batch: "2026",
    domain: "Leadership",
    focus: "Strategy, reviews, and cross-team coordination"
  },
  {
    name: "Ishita Rao",
    role: "Program Organizer",
    batch: "2025",
    domain: "Operations",
    focus: "Events, announcements, challenge governance"
  },
  {
    name: "Neel Khanna",
    role: "Core Developer",
    batch: "2026",
    domain: "Full Stack",
    focus: "Frontend systems, APIs, deployment"
  },
  {
    name: "Sara Thomas",
    role: "AI/ML Lead",
    batch: "2025",
    domain: "AI/ML",
    focus: "Model evaluation and applied workflows"
  }
] as const;

const defaultChallenges = [
  {
    slug: "club-directory-platform",
    title: "Build the club directory platform",
    description: "Create a searchable club member directory with role filters, profile cards, and contribution history.",
    category: "Full Stack",
    difficulty: "Medium",
    deadline: new Date("2026-04-12T18:00:00.000Z"),
    points: 240,
    status: "Open",
    tags: "Next.js,Prisma,RBAC"
  },
  {
    slug: "event-analytics-dashboard",
    title: "Design the event analytics dashboard",
    description: "Track registrations, participation, streaks, and team-level engagement with clean summary cards.",
    category: "Analytics",
    difficulty: "Easy",
    deadline: new Date("2026-04-13T18:00:00.000Z"),
    points: 180,
    status: "Open",
    tags: "Charts,Dashboard,UI"
  },
  {
    slug: "open-innovation-showcase",
    title: "Ship the open innovation showcase",
    description: "Publish a polished showcase with project detail views, screenshots, documentation, and live links.",
    category: "UI/UX",
    difficulty: "Hard",
    deadline: new Date("2026-04-14T18:00:00.000Z"),
    points: 320,
    status: "Open",
    tags: "Showcase,Content,Interaction"
  }
] as const;

export async function ensureDemoChallenges() {
  const existing = await db.challenge.count();
  if (existing > 0) return;

  await db.challenge.createMany({
    data: [...defaultChallenges]
  });
}

export async function getChallenges() {
  await ensureDemoChallenges();
  return db.challenge.findMany({
    include: {
      submissions: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      deadline: "asc"
    }
  });
}

export async function getDashboardData(userId: string) {
  await ensureDemoChallenges();
  const [challenges, submissions, totalUsers] = await Promise.all([
    db.challenge.findMany({
      orderBy: {
        deadline: "asc"
      }
    }),
    db.submission.findMany({
      where: { userId },
      include: {
        challenge: true
      },
      orderBy: {
        createdAt: "desc"
      }
    }),
    db.user.count()
  ]);

  const totalScore = submissions.reduce((sum, submission) => sum + submission.score, 0);
  const reviewedCount = submissions.filter((submission) => submission.status === "Reviewed").length;

  const leaderboard = await getLeaderboard();
  const rank = Math.max(1, leaderboard.findIndex((entry) => entry.user.id === userId) + 1 || totalUsers);

  return {
    challenges,
    submissions,
    totalScore,
    reviewedCount,
    rank
  };
}

export async function getLeaderboard() {
  await ensureDemoChallenges();
  const users = await db.user.findMany({
    include: {
      submissions: {
        include: {
          challenge: true
        }
      }
    },
    orderBy: {
      name: "asc"
    }
  });

  return users
    .map((user) => ({
      user,
      score: user.submissions.reduce((sum, submission) => sum + submission.score, 0),
      submissions: user.submissions.length
    }))
    .sort((a, b) => b.score - a.score);
}

export async function getAdminOverview() {
  await ensureDemoChallenges();

  const [users, challenges, submissions, leaderboard] = await Promise.all([
    db.user.findMany({
      orderBy: {
        createdAt: "asc"
      }
    }),
    db.challenge.findMany({
      include: {
        submissions: true
      },
      orderBy: {
        deadline: "asc"
      }
    }),
    db.submission.findMany({
      include: {
        user: true,
        challenge: true
      },
      orderBy: {
        createdAt: "desc"
      }
    }),
    getLeaderboard()
  ]);

  return {
    users,
    challenges,
    submissions,
    leaderboard
  };
}

type SubmissionInput = {
  challengeId: string;
  userId: string;
  githubUrl: string;
  liveUrl: string;
};

export async function createSubmission(input: SubmissionInput) {
  const score = Math.max(120, 160 + Math.floor(Math.random() * 120));

  return db.submission.create({
    data: {
      challengeId: input.challengeId,
      userId: input.userId,
      githubUrl: input.githubUrl,
      liveUrl: input.liveUrl,
      score,
      status: "Reviewed",
      feedback: "Accepted into the review queue and scored for demo presentation."
    }
  });
}

export function tagList(tags: string) {
  return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
}

export type ChallengeWithRelations = Challenge & {
  submissions: (Submission & { user: User })[];
};

export type LeaderboardEntry = Awaited<ReturnType<typeof getLeaderboard>>[number];
