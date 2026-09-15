/* Rich discovery data for the /explore page: featured banners + category showcase.
   Pure data only (no React / Tailwind class literals) — mirrors src/data/courses.ts.
   Tailwind classes are derived in the page component so the JIT scanner sees them. */

import { exploreCourses } from "@/data/courses";
import type { ExploreCourse } from "@/data/courses";

export type { ExploreCourse };

/** Re-export the course interface the page renders. */

export interface ExploreBanner {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  /** Call-to-action label. */
  cta: string;
  /** Where the CTA points. */
  href: string;
  imageUrl: string;
  variant: "hero" | "card";
}

export interface ExploreCategory {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name; resolved to a component in the page via an icon map. */
  iconKey: string;
  courseCount: number;
  imageUrl: string;
  /** Semantic key the page maps to a Tailwind gradient tint. */
  tint: string;
  href: string;
}

/** Build a deterministic Unsplash URL (same query style the rest of the app uses). */
function unsplash(id: string, w: number, h: number): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

/** Derive counts from the live catalog so they can never drift from the data. */
const count = (category: string) =>
  exploreCourses.filter((c) => c.category === category).length;

export const exploreBanners: ExploreBanner[] = [
  {
    id: "hero",
    title: "Find what fascinates you",
    subtitle:
      "From finance to creative skills — hands-on lessons built to level you up, one skill at a time.",
    badge: "New season",
    cta: "Start exploring",
    href: "/courses",
    imageUrl: unsplash("1464822759023-fed622ff2c3b", 1600, 560),
    variant: "hero",
  },
  {
    id: "challenge",
    title: "Weekly Challenge",
    subtitle: "Complete 3 lessons this week and lock in a streak bonus.",
    cta: "Join challenge →",
    href: "/courses",
    imageUrl: unsplash("1554224155-6726b3ff858f", 800, 420),
    variant: "card",
  },
  {
    id: "premium",
    title: "Go Premium",
    subtitle: "Unlock every course, tool and exclusive challenge in one plan.",
    cta: "Upgrade →",
    href: "/courses",
    imageUrl: unsplash("1572044162444-ad60f128bdea", 800, 420),
    variant: "card",
  },
];

export const exploreCategories: ExploreCategory[] = [
  {
    id: "finance",
    title: "Finance",
    description: "Budgeting, investing, and making your money work for you.",
    iconKey: "Wallet",
    courseCount: count("Finance"),
    imageUrl: unsplash("1611974789855-9c2a0a7236a3", 640, 480),
    tint: "teal",
    href: "/courses",
  },
  {
    id: "career",
    title: "Career",
    description: "Resumes, interviews, leadership and landing your dream job.",
    iconKey: "Briefcase",
    courseCount: count("Career"),
    imageUrl: unsplash("1521737604893-d14cc237f11d", 640, 480),
    tint: "rust",
    href: "/courses",
  },
  {
    id: "life-skills",
    title: "Life Skills",
    description: "Mindfulness, habits and practical skills for daily life.",
    iconKey: "Heart",
    courseCount: count("Life Skills"),
    imageUrl: unsplash("1506126613408-eca07ce68773", 640, 480),
    tint: "gold",
    href: "/courses",
  },
  {
    id: "health",
    title: "Health",
    description: "Cooking, nutrition, sleep and energy for a healthier life.",
    iconKey: "HeartPulse",
    courseCount: count("Health"),
    imageUrl: unsplash("1466637574441-749b8f19452f", 640, 480),
    tint: "emerald",
    href: "/courses",
  },
  {
    id: "creative-skills",
    title: "Creative Skills",
    description: "Illustration, design, photography and creative confidence.",
    iconKey: "Palette",
    courseCount: count("Creative Skills"),
    imageUrl: unsplash("1572044162444-ad60f128bdea", 640, 480),
    tint: "purple",
    href: "/courses",
  },
  {
    id: "tech",
    title: "Tech",
    description: "Web dev, AI and modern developer skills.",
    iconKey: "Code",
    courseCount: count("Tech"),
    imageUrl: unsplash("1498050108023-c5249f4df085", 640, 480),
    tint: "indigo",
    href: "/courses",
  },
  {
    id: "communication",
    title: "Communication",
    description: "Speaking, storytelling and persuasion.",
    iconKey: "MessageCircle",
    courseCount: count("Communication"),
    imageUrl: unsplash("1478737270239-2f02b77fc618", 640, 480),
    tint: "pink",
    href: "/courses",
  },
  {
    id: "productivity",
    title: "Productivity",
    description: "Focus, deep work and building lasting habits.",
    iconKey: "Clock",
    courseCount: count("Productivity"),
    imageUrl: unsplash("1454165804606-c3d57bc86b40", 640, 480),
    tint: "amber",
    href: "/courses",
  },
  {
    id: "languages",
    title: "Languages",
    description: "Travel phrases and real-world conversation.",
    iconKey: "Languages",
    courseCount: count("Languages"),
    imageUrl: unsplash("1456513080510-7bf3a84b82f8", 640, 480),
    tint: "blue",
    href: "/courses",
  },
];

/** Convenience: every section of the page can pull courses for a category. */
export function coursesForCategory(category: string): ExploreCourse[] {
  return exploreCourses.filter((c) => c.category === category);
}
