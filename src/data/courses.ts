/* Shared catalog of courses for the dashboard. */

export interface ExploreCourse {
  id: string;
  title: string;
  category:
    | "Finance"
    | "Career"
    | "Life Skills"
    | "Health"
    | "Creative Skills"
    | "Tech"
    | "Communication"
    | "Productivity"
    | "Languages";
  lessons: number;
  duration: string;
  rating: number;
  reviews: string;
  imageUrl: string;
}

export interface InProgressCourse {
  id: string;
  title: string;
  category: string;
  progress: number;
  imageUrl: string;
}

export const exploreCourses: ExploreCourse[] = [
  {
    id: "investing",
    title: "Investing for Beginners",
    category: "Finance",
    lessons: 14,
    duration: "3h 10m",
    rating: 4.9,
    reviews: "3.1k",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "budget",
    title: "Master Your Budget",
    category: "Finance",
    lessons: 8,
    duration: "1h 20m",
    rating: 4.5,
    reviews: "1.2k",
    imageUrl:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "dream-job",
    title: "Land Your Dream Job",
    category: "Career",
    lessons: 12,
    duration: "2h 30m",
    rating: 4.8,
    reviews: "2.4k",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "leadership",
    title: "Leadership Skills",
    category: "Career",
    lessons: 10,
    duration: "2h 05m",
    rating: 4.6,
    reviews: "890",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "mindful",
    title: "Mindful Living",
    category: "Life Skills",
    lessons: 9,
    duration: "1h 45m",
    rating: 4.7,
    reviews: "1.8k",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "time",
    title: "Time Management 101",
    category: "Life Skills",
    lessons: 6,
    duration: "1h 00m",
    rating: 4.4,
    reviews: "640",
    imageUrl:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "cooking",
    title: "Home Cooking Mastery",
    category: "Health",
    lessons: 18,
    duration: "4h 00m",
    rating: 4.6,
    reviews: "987",
    imageUrl:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "sleep",
    title: "Sleep & Energy",
    category: "Health",
    lessons: 7,
    duration: "1h 30m",
    rating: 4.7,
    reviews: "2.1k",
    imageUrl:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "illustration",
    title: "Digital Illustration",
    category: "Creative Skills",
    lessons: 16,
    duration: "3h 40m",
    rating: 4.8,
    reviews: "1.5k",
    imageUrl:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "photography",
    title: "Photography Basics",
    category: "Creative Skills",
    lessons: 11,
    duration: "2h 15m",
    rating: 4.5,
    reviews: "3.4k",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "webdev",
    title: "Web Development Crash Course",
    category: "Tech",
    lessons: 22,
    duration: "6h 00m",
    rating: 4.9,
    reviews: "4.2k",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "ai",
    title: "Intro to AI",
    category: "Tech",
    lessons: 13,
    duration: "2h 45m",
    rating: 4.7,
    reviews: "2.8k",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "storytelling",
    title: "Storytelling Essentials",
    category: "Communication",
    lessons: 8,
    duration: "1h 50m",
    rating: 4.6,
    reviews: "760",
    imageUrl:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "negotiation",
    title: "Negotiation Basics",
    category: "Communication",
    lessons: 10,
    duration: "2h 20m",
    rating: 4.7,
    reviews: "1.1k",
    imageUrl:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "deep-focus",
    title: "Deep Focus & Flow",
    category: "Productivity",
    lessons: 7,
    duration: "1h 35m",
    rating: 4.8,
    reviews: "1.9k",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "habits",
    title: "Habit Building 101",
    category: "Productivity",
    lessons: 9,
    duration: "2h 10m",
    rating: 4.5,
    reviews: "1.3k",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "spanish",
    title: "Spanish for Beginners",
    category: "Languages",
    lessons: 15,
    duration: "3h 30m",
    rating: 4.7,
    reviews: "2.6k",
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "french-travel",
    title: "French for Travel",
    category: "Languages",
    lessons: 12,
    duration: "2h 40m",
    rating: 4.6,
    reviews: "1.4k",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=220&fit=crop&auto=format&q=80",
  },
];

export const inProgressCourses: InProgressCourse[] = [
  {
    id: "finance-101",
    title: "Personal Finance 101",
    category: "Money Management",
    progress: 68,
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "career-planning",
    title: "Career Planning",
    category: "Professional Growth",
    progress: 42,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "nutrition",
    title: "Nutrition Basics",
    category: "Health & Wellness",
    progress: 81,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop&auto=format&q=80",
  },
  {
    id: "speaking",
    title: "Public Speaking",
    category: "Communication",
    progress: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=220&fit=crop&auto=format&q=80",
  },
];

/** Case-insensitive filter by title/category. */
export function filterCourses<T extends { title: string; category: string }>(
  courses: T[],
  search: string
): T[] {
  const q = search.trim().toLowerCase();
  if (!q) return courses;
  return courses.filter(
    (c) =>
      c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
  );
}
export { courseDetails } from "./courseDetails";
