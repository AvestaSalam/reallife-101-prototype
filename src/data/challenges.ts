export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  type: "course" | "daily" | "weekly" | "streak";
  icon: string;
  color: string;
  target: number;
  linkedCourseId?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
}

export const badges: Badge[] = [
  {
    id: "first-course",
    title: "First Steps",
    description: "Complete your first course",
    icon: "graduation-cap",
    color: "from-blue-500/20 to-blue-600/5",
    requirement: "Complete 1 course",
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "flame",
    color: "from-orange-500/20 to-orange-600/5",
    requirement: "7-day streak",
  },
  {
    id: "points-500",
    title: "Rising Star",
    description: "Earn 500 points",
    icon: "star",
    color: "from-yellow-500/20 to-yellow-600/5",
    requirement: "500 points",
  },
  {
    id: "points-1000",
    title: "Knowledge Seeker",
    description: "Earn 1000 points",
    icon: "trophy",
    color: "from-purple-500/20 to-purple-600/5",
    requirement: "1000 points",
  },
  {
    id: "courses-5",
    title: "Dedicated Learner",
    description: "Complete 5 courses",
    icon: "book-open",
    color: "from-green-500/20 to-green-600/5",
    requirement: "Complete 5 courses",
  },
  {
    id: "finance-master",
    title: "Finance Master",
    description: "Complete all finance courses",
    icon: "wallet",
    color: "from-emerald-500/20 to-emerald-600/5",
    requirement: "All finance courses",
  },
];

export const challenges: Challenge[] = [
  {
    id: "complete-investing",
    title: "Investing for Beginners",
    description: "Complete the full investing course to earn points",
    category: "Finance",
    points: 100,
    type: "course",
    icon: "trending-up",
    color: "from-green-500/20 to-green-600/5",
    target: 100,
    linkedCourseId: "investing",
  },
  {
    id: "complete-budget",
    title: "Master Your Budget",
    description: "Learn to manage your money like a pro",
    category: "Finance",
    points: 80,
    type: "course",
    icon: "wallet",
    color: "from-blue-500/20 to-blue-600/5",
    target: 100,
    linkedCourseId: "budget",
  },
  {
    id: "complete-dream-job",
    title: "Land Your Dream Job",
    description: "Complete the career course and ace your next interview",
    category: "Career",
    points: 120,
    type: "course",
    icon: "briefcase",
    color: "from-indigo-500/20 to-indigo-600/5",
    target: 100,
    linkedCourseId: "dream-job",
  },
  {
    id: "complete-cooking",
    title: "Home Cooking Mastery",
    description: "Become a home chef — complete all cooking lessons",
    category: "Health",
    points: 150,
    type: "course",
    icon: "chef-hat",
    color: "from-orange-500/20 to-orange-600/5",
    target: 100,
    linkedCourseId: "cooking",
  },
  {
    id: "complete-sleep",
    title: "Sleep & Energy",
    description: "Optimize your sleep for peak performance",
    category: "Health",
    points: 90,
    type: "course",
    icon: "moon",
    color: "from-violet-500/20 to-violet-600/5",
    target: 100,
    linkedCourseId: "sleep",
  },
  {
    id: "complete-web-dev",
    title: "Web Development 101",
    description: "Build your first website from scratch",
    category: "Tech",
    points: 200,
    type: "course",
    icon: "code",
    color: "from-cyan-500/20 to-cyan-600/5",
    target: 100,
    linkedCourseId: "web-development",
  },
  {
    id: "daily-login",
    title: "Daily Check-in",
    description: "Log in every day to maintain your streak",
    category: "Habits",
    points: 10,
    type: "daily",
    icon: "calendar",
    color: "from-rose-500/20 to-rose-600/5",
    target: 1,
  },
  {
    id: "weekly-3-courses",
    title: "Weekly Goal",
    description: "Complete 3 lessons this week",
    category: "Habits",
    points: 50,
    type: "weekly",
    icon: "target",
    color: "from-amber-500/20 to-amber-600/5",
    target: 3,
  },
  {
    id: "streak-challenge",
    title: "7-Day Streak",
    description: "Learn for 7 consecutive days",
    category: "Habits",
    points: 75,
    type: "streak",
    icon: "flame",
    color: "from-red-500/20 to-red-600/5",
    target: 7,
  },
];
