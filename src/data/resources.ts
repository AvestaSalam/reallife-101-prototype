export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "article" | "guide" | "template" | "tool" | "video";
  icon: string;
  color: string;
  readTime?: string;
  tags: string[];
  isNew?: boolean;
  isPremium?: boolean;
  author?: string;
  publishDate?: string;
}

export interface ResourceSection {
  heading: string;
  content: string;
  list?: string[];
}

export interface ResourceDetail {
  id: string;
  sections: ResourceSection[];
  keyTakeaways: string[];
  relatedResources: string[];
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export const resourceCategories: ResourceCategory[] = [
  { id: "all", title: "All Resources", description: "Browse everything", icon: "grid", color: "from-neutral-500/20 to-neutral-600/5", count: 16 },
  { id: "finance", title: "Finance", description: "Money management & investing", icon: "wallet", color: "from-green-500/20 to-green-600/5", count: 4 },
  { id: "career", title: "Career", description: "Job search & professional growth", icon: "briefcase", color: "from-blue-500/20 to-blue-600/5", count: 3 },
  { id: "productivity", title: "Productivity", description: "Time management & focus", icon: "zap", color: "from-amber-500/20 to-amber-600/5", count: 3 },
  { id: "health", title: "Health", description: "Wellness & fitness guides", icon: "heart", color: "from-rose-500/20 to-rose-600/5", count: 2 },
  { id: "tech", title: "Tech", description: "Digital skills & tools", icon: "code", color: "from-violet-500/20 to-violet-600/5", count: 2 },
  { id: "life", title: "Life Skills", description: "Everyday practical skills", icon: "home", color: "from-cyan-500/20 to-cyan-600/5", count: 2 },
];

export const resources: Resource[] = [
  { id: "budget-template", title: "Monthly Budget Spreadsheet", description: "Track income, expenses, and savings with this easy-to-use template.", category: "finance", type: "template", icon: "spreadsheet", color: "from-green-500/20 to-green-600/5", tags: ["budgeting", "planning", "money"], isNew: true },
  { id: "investing-guide", title: "Investing 101: Complete Guide", description: "Everything you need to know to start building wealth through investing.", category: "finance", type: "guide", icon: "trending-up", color: "from-emerald-500/20 to-emerald-600/5", readTime: "8 min read", tags: ["investing", "wealth", "stocks"] },
  { id: "emergency-fund", title: "Building an Emergency Fund", description: "Step-by-step guide to saving 3-6 months of expenses.", category: "finance", type: "article", icon: "shield", color: "from-teal-500/20 to-teal-600/5", readTime: "5 min read", tags: ["savings", "emergency", "planning"] },
  { id: "debt-payoff", title: "Debt Payoff Strategies", description: "Compare the snowball vs avalanche methods to eliminate debt faster.", category: "finance", type: "article", icon: "credit-card", color: "from-lime-500/20 to-lime-600/5", readTime: "6 min read", tags: ["debt", "strategy", "money"] },
  { id: "resume-template", title: "Professional Resume Template", description: "ATS-friendly resume template that gets interviews.", category: "career", type: "template", icon: "file-text", color: "from-blue-500/20 to-blue-600/5", tags: ["resume", "job", "career"], isNew: true },
  { id: "interview-guide", title: "Interview Preparation Guide", description: "Common questions, answers, and strategies to ace any interview.", category: "career", type: "guide", icon: "mic", color: "from-indigo-500/20 to-indigo-600/5", readTime: "12 min read", tags: ["interview", "job", "preparation"] },
  { id: "networking", title: "Networking for Introverts", description: "Build meaningful professional connections without the anxiety.", category: "career", type: "article", icon: "users", color: "from-sky-500/20 to-sky-600/5", readTime: "7 min read", tags: ["networking", "social", "career"] },
  { id: "time-blocking", title: "Time Blocking Template", description: "Organize your day for maximum focus and productivity.", category: "productivity", type: "template", icon: "calendar", color: "from-amber-500/20 to-amber-600/5", tags: ["time", "planning", "focus"] },
  { id: "deep-work", title: "Deep Work Strategies", description: "How to achieve focused success in a distracted world.", category: "productivity", type: "article", icon: "brain", color: "from-orange-500/20 to-orange-600/5", readTime: "10 min read", tags: ["focus", "productivity", "work"], isPremium: true },
  { id: "habit-tracker", title: "Habit Tracker Printable", description: "Build consistency with this 90-day habit tracking sheet.", category: "productivity", type: "template", icon: "check-square", color: "from-yellow-500/20 to-yellow-600/5", tags: ["habits", "tracking", "goals"] },
  { id: "meal-planning", title: "Weekly Meal Planner", description: "Plan healthy meals, save time, and reduce food waste.", category: "health", type: "template", icon: "utensils", color: "from-rose-500/20 to-rose-600/5", tags: ["meal", "health", "planning"] },
  { id: "sleep-guide", title: "Sleep Optimization Guide", description: "Science-backed strategies for better sleep and more energy.", category: "health", type: "guide", icon: "moon", color: "from-pink-500/20 to-pink-600/5", readTime: "9 min read", tags: ["sleep", "health", "energy"] },
  { id: "ai-tools", title: "Essential AI Tools for 2024", description: "The best AI tools to boost your productivity and creativity.", category: "tech", type: "article", icon: "bot", color: "from-violet-500/20 to-violet-600/5", readTime: "6 min read", tags: ["ai", "tools", "productivity"], isNew: true },
  { id: "password-security", title: "Password Security Checklist", description: "Protect your accounts with this essential security guide.", category: "tech", type: "guide", icon: "lock", color: "from-purple-500/20 to-purple-600/5", readTime: "4 min read", tags: ["security", "passwords", "tech"] },
  { id: "cooking-basics", title: "Kitchen Essentials Guide", description: "Must-have tools and techniques for every home cook.", category: "life", type: "guide", icon: "chef-hat", color: "from-cyan-500/20 to-cyan-600/5", readTime: "7 min read", tags: ["cooking", "kitchen", "basics"] },
  { id: "first-aid", title: "Home First Aid Basics", description: "Essential first aid skills everyone should know.", category: "life", type: "guide", icon: "heart-pulse", color: "from-red-500/20 to-red-600/5", readTime: "5 min read", tags: ["first-aid", "health", "safety"], isPremium: true },
];
