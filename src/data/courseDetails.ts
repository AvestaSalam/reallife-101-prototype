/* Rich course content for the course inner page. */

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "article" | "quiz";
  isLocked: boolean;
  isCompleted: boolean;
}

export interface Instructor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface CourseDetail {
  id: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lastUpdated: string;
  description: string;
  whatYouLearn: string[];
  instructor: Instructor;
  curriculum: Lesson[];
}

export const courseDetails: Record<string, CourseDetail> = {
  investing: {
    id: "investing",
    level: "Beginner",
    lastUpdated: "August 2026",
    description:
      "Learn how to make your money work for you. This beginner-friendly course covers the fundamentals of investing — from stocks and bonds to index funds and retirement accounts — so you can start building wealth with confidence.",
    whatYouLearn: [
      "Understand stocks, bonds, ETFs and mutual funds",
      "Build a diversified portfolio from scratch",
      "Read basic financial statements and metrics",
      "Create a personalized long-term investment plan",
      "Manage risk and avoid common beginner mistakes",
    ],
    instructor: {
      name: "Sarah Chen",
      role: "Certified Financial Planner",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Sarah has over 12 years of experience in wealth management and has helped thousands of clients build sustainable financial futures.",
    },
    curriculum: [
      { id: "i1", title: "Welcome & What You'll Achieve", duration: "4 min", type: "video", isLocked: false, isCompleted: true },
      { id: "i2", title: "Why Invest? The Power of Compound Growth", duration: "9 min", type: "video", isLocked: false, isCompleted: true },
      { id: "i3", title: "Stocks, Bonds & ETFs Explained", duration: "12 min", type: "video", isLocked: false, isCompleted: false },
      { id: "i4", title: "How to Read a Stock Ticker", duration: "7 min", type: "article", isLocked: false, isCompleted: false },
      { id: "i5", title: "Building Your First Portfolio", duration: "14 min", type: "video", isLocked: false, isCompleted: false },
      { id: "i6", title: "Risk Tolerance Quiz", duration: "5 min", type: "quiz", isLocked: false, isCompleted: false },
      { id: "i7", title: "Index Funds & Passive Investing", duration: "11 min", type: "video", isLocked: true, isCompleted: false },
      { id: "i8", title: "Retirement Accounts (401k, IRA)", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "i9", title: "Common Mistakes to Avoid", duration: "8 min", type: "article", isLocked: true, isCompleted: false },
      { id: "i10", title: "Your 30-Day Action Plan", duration: "6 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  budget: {
    id: "budget",
    level: "Beginner",
    lastUpdated: "July 2026",
    description:
      "Take control of your finances with a simple, practical budgeting system. Learn how to track spending, set savings goals, and build an emergency fund — without giving up everything you enjoy.",
    whatYouLearn: [
      "Build a realistic monthly budget that sticks",
      "Track expenses and identify spending leaks",
      "Set and reach meaningful savings goals",
      "Create a starter emergency fund",
      "Use the 50/30/20 rule and other frameworks",
    ],
    instructor: {
      name: "Marcus Rivera",
      role: "Personal Finance Coach",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Marcus went from living paycheck-to-paycheck to financial independence and now teaches practical money skills to over 200k students.",
    },
    curriculum: [
      { id: "b1", title: "Why Budgeting Matters", duration: "5 min", type: "video", isLocked: false, isCompleted: true },
      { id: "b2", title: "The 50/30/20 Framework", duration: "8 min", type: "video", isLocked: false, isCompleted: false },
      { id: "b3", title: "Tracking Your Spending", duration: "10 min", type: "video", isLocked: false, isCompleted: false },
      { id: "b4", title: "Finding Spending Leaks", duration: "7 min", type: "article", isLocked: false, isCompleted: false },
      { id: "b5", title: "Setting Savings Goals", duration: "9 min", type: "video", isLocked: true, isCompleted: false },
      { id: "b6", title: "Building an Emergency Fund", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "b7", title: "Budgeting Tools Compared", duration: "6 min", type: "article", isLocked: true, isCompleted: false },
      { id: "b8", title: "Your Budget Action Plan", duration: "5 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  "dream-job": {
    id: "dream-job",
    level: "Intermediate",
    lastUpdated: "September 2026",
    description:
      "A step-by-step system to land the role you actually want. From personal branding and resume optimization to networking and salary negotiation — everything you need for a successful career pivot.",
    whatYouLearn: [
      "Clarify your ideal role and career direction",
      "Build a standout personal brand online",
      "Write a resume that passes ATS screening",
      "Network effectively, even if you're introverted",
      "Negotiate salary and benefits with confidence",
    ],
    instructor: {
      name: "Priya Nair",
      role: "Career Strategist",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Priya has coached professionals at Google, Amazon, and Spotify, with a 94% success rate in helping clients land roles they love.",
    },
    curriculum: [
      { id: "d1", title: "Finding Your Direction", duration: "6 min", type: "video", isLocked: false, isCompleted: true },
      { id: "d2", title: "Personal Branding Fundamentals", duration: "10 min", type: "video", isLocked: false, isCompleted: true },
      { id: "d3", title: "Optimizing Your LinkedIn Profile", duration: "12 min", type: "video", isLocked: false, isCompleted: false },
      { id: "d4", title: "Resume Writing Masterclass", duration: "15 min", type: "video", isLocked: false, isCompleted: false },
      { id: "d5", title: "Cover Letter Templates", duration: "6 min", type: "article", isLocked: false, isCompleted: false },
      { id: "d6", title: "Networking for Introverts", duration: "9 min", type: "video", isLocked: true, isCompleted: false },
      { id: "d7", title: "Acing the Interview", duration: "14 min", type: "video", isLocked: true, isCompleted: false },
      { id: "d8", title: "Salary Negotiation Scripts", duration: "11 min", type: "video", isLocked: true, isCompleted: false },
      { id: "d9", title: "Handling Offers & Counteroffers", duration: "8 min", type: "article", isLocked: true, isCompleted: false },
      { id: "d10", title: "Your 90-Day Job Search Plan", duration: "7 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  leadership: {
    id: "leadership",
    level: "Intermediate",
    lastUpdated: "June 2026",
    description:
      "Develop the leadership skills that actually matter. Learn to inspire teams, navigate conflict, make decisions under pressure, and grow into the leader people want to follow.",
    whatYouLearn: [
      "Adapt your leadership style to any situation",
      "Communicate vision and give clear feedback",
      "Resolve team conflicts constructively",
      "Delegate effectively without micromanaging",
      "Build trust and psychological safety",
    ],
    instructor: {
      name: "James Okonkwo",
      role: "Executive Leadership Coach",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "James has led teams at Fortune 500 companies and now coaches mid-career professionals transitioning into leadership roles.",
    },
    curriculum: [
      { id: "l1", title: "What Makes a Great Leader", duration: "7 min", type: "video", isLocked: false, isCompleted: true },
      { id: "l2", title: "Leadership Styles Assessment", duration: "10 min", type: "quiz", isLocked: false, isCompleted: false },
      { id: "l3", title: "Communicating Vision", duration: "11 min", type: "video", isLocked: false, isCompleted: false },
      { id: "l4", title: "Giving & Receiving Feedback", duration: "13 min", type: "video", isLocked: false, isCompleted: false },
      { id: "l5", title: "Conflict Resolution Frameworks", duration: "9 min", type: "video", isLocked: true, isCompleted: false },
      { id: "l6", title: "The Art of Delegation", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "l7", title: "Building Psychological Safety", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "l8", title: "Decision-Making Under Pressure", duration: "12 min", type: "video", isLocked: true, isCompleted: false },
      { id: "l9", title: "Your Leadership Development Plan", duration: "6 min", type: "article", isLocked: true, isCompleted: false },
      { id: "l10", title: "Course Wrap-Up", duration: "4 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  mindful: {
    id: "mindful",
    level: "Beginner",
    lastUpdated: "August 2026",
    description:
      "A practical introduction to mindfulness and meditation. Reduce stress, improve focus, and build a daily practice that fits into even the busiest schedule.",
    whatYouLearn: [
      "Understand the science behind mindfulness",
      "Start a simple daily meditation habit",
      "Use breathing techniques to manage stress",
      "Practice mindful eating and walking",
      "Build focus and reduce mental clutter",
    ],
    instructor: {
      name: "Dr. Anika Patel",
      role: "Mindfulness & Wellbeing Researcher",
      avatar:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Dr. Patel combines neuroscience research with ancient meditation traditions to teach practical, evidence-based mindfulness techniques.",
    },
    curriculum: [
      { id: "m1", title: "Welcome to Mindfulness", duration: "5 min", type: "video", isLocked: false, isCompleted: true },
      { id: "m2", title: "The Science of Meditation", duration: "8 min", type: "video", isLocked: false, isCompleted: true },
      { id: "m3", title: "Your First 5-Minute Meditation", duration: "6 min", type: "video", isLocked: false, isCompleted: false },
      { id: "m4", title: "Breathing Techniques Toolkit", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "m5", title: "Managing Stress in the Moment", duration: "10 min", type: "video", isLocked: false, isCompleted: false },
      { id: "m6", title: "Mindful Walking Practice", duration: "7 min", type: "video", isLocked: true, isCompleted: false },
      { id: "m7", title: "Mindful Eating", duration: "6 min", type: "video", isLocked: true, isCompleted: false },
      { id: "m8", title: "Building a Daily Practice", duration: "8 min", type: "article", isLocked: true, isCompleted: false },
      { id: "m9", title: "21-Day Challenge Guide", duration: "5 min", type: "article", isLocked: true, isCompleted: false },
    ],
  },
  time: {
    id: "time",
    level: "Beginner",
    lastUpdated: "July 2026",
    description:
      "Stop feeling overwhelmed and start getting things done. This course teaches proven time-management techniques — from time-blocking to the Eisenhower Matrix — so you can reclaim your day.",
    whatYouLearn: [
      "Prioritize tasks with the Eisenhower Matrix",
      "Implement time-blocking and deep work sessions",
      "Overcome procrastination with the 2-minute rule",
      "Set boundaries and protect your focus",
      "Design a daily routine that sticks",
    ],
    instructor: {
      name: "Elena Voss",
      role: "Productivity Consultant",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Elena has spent a decade optimizing workflows for startups and teaches practical productivity systems to over 150k learners.",
    },
    curriculum: [
      { id: "t1", title: "Where Does Your Time Go?", duration: "6 min", type: "video", isLocked: false, isCompleted: true },
      { id: "t2", title: "The Eisenhower Matrix", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "t3", title: "Time-Blocking Deep Dive", duration: "11 min", type: "video", isLocked: false, isCompleted: false },
      { id: "t4", title: "Beating Procrastination", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "t5", title: "The 2-Minute Rule & Batching", duration: "7 min", type: "article", isLocked: true, isCompleted: false },
      { id: "t6", title: "Designing Your Ideal Week", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  cooking: {
    id: "cooking",
    level: "Beginner",
    lastUpdated: "May 2026",
    description:
      "Go from kitchen novice to confident home cook. Learn essential techniques, knife skills, and 15 foundational recipes that will serve you for a lifetime of delicious meals.",
    whatYouLearn: [
      "Master essential knife skills and safety",
      "Understand heat control and cooking methods",
      "Cook 15 foundational recipes from scratch",
      "Build flavor with herbs, spices and seasoning",
      "Meal prep efficiently for the week ahead",
    ],
    instructor: {
      name: "Chef Marco Rossi",
      role: "Culinary Instructor",
      avatar:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Chef Marco trained in Naples and has spent 15 years making approachable, restaurant-quality cooking accessible to home chefs.",
    },
    curriculum: [
      { id: "c1", title: "Kitchen Setup & Tools", duration: "7 min", type: "video", isLocked: false, isCompleted: true },
      { id: "c2", title: "Knife Skills Fundamentals", duration: "12 min", type: "video", isLocked: false, isCompleted: true },
      { id: "c3", title: "Heat Control & Cooking Methods", duration: "10 min", type: "video", isLocked: false, isCompleted: false },
      { id: "c4", title: "Perfect Scrambled Eggs", duration: "6 min", type: "video", isLocked: false, isCompleted: false },
      { id: "c5", title: "Pan Sauce Basics", duration: "9 min", type: "video", isLocked: true, isCompleted: false },
      { id: "c6", title: "Roasting Vegetables", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "c7", title: "Pasta from Scratch", duration: "14 min", type: "video", isLocked: true, isCompleted: false },
      { id: "c8", title: "Seasoning & Flavor Building", duration: "11 min", type: "video", isLocked: true, isCompleted: false },
      { id: "c9", title: "Simple Soups & Stocks", duration: "13 min", type: "video", isLocked: true, isCompleted: false },
      { id: "c10", title: "Meal Prep Sunday Guide", duration: "10 min", type: "article", isLocked: true, isCompleted: false },
    ],
  },
  sleep: {
    id: "sleep",
    level: "Beginner",
    lastUpdated: "August 2026",
    description:
      "Transform your sleep quality with science-backed strategies. Learn how to fall asleep faster, stay asleep longer, and wake up genuinely refreshed — no supplements required.",
    whatYouLearn: [
      "Understand your sleep cycles and circadian rhythm",
      "Optimize your bedroom environment for sleep",
      "Build a wind-down routine that works",
      "Manage screen time and blue light exposure",
      "Troubleshoot common sleep disruptions",
    ],
    instructor: {
      name: "Dr. Anika Patel",
      role: "Mindfulness & Wellbeing Researcher",
      avatar:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Dr. Patel combines neuroscience research with ancient meditation traditions to teach practical, evidence-based mindfulness techniques.",
    },
    curriculum: [
      { id: "s1", title: "The Science of Sleep", duration: "8 min", type: "video", isLocked: false, isCompleted: true },
      { id: "s2", title: "Sleep Cycles Explained", duration: "7 min", type: "video", isLocked: false, isCompleted: false },
      { id: "s3", title: "Your Circadian Rhythm", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "s4", title: "Optimizing Your Sleep Environment", duration: "8 min", type: "video", isLocked: false, isCompleted: false },
      { id: "s5", title: "Building a Wind-Down Routine", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "s6", title: "Screen Time & Blue Light", duration: "7 min", type: "article", isLocked: true, isCompleted: false },
      { id: "s7", title: "Troubleshooting Insomnia", duration: "11 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  illustration: {
    id: "illustration",
    level: "Beginner",
    lastUpdated: "June 2026",
    description:
      "Unlock your creativity with the foundations of digital illustration. From basic shapes and line work to color theory and composition — start creating art you're proud of.",
    whatYouLearn: [
      "Draw confidently with basic shapes and lines",
      "Apply color theory to your illustrations",
      "Create balanced, eye-catching compositions",
      "Develop a consistent illustration style",
      "Build a daily sketching habit",
    ],
    instructor: {
      name: "Luna Takahashi",
      role: "Illustrator & Art Director",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Luna's illustrations have appeared in The New Yorker and Wired, and she has taught over 80k students to unlock their creative potential.",
    },
    curriculum: [
      { id: "il1", title: "Your Creative Warm-Up", duration: "5 min", type: "video", isLocked: false, isCompleted: true },
      { id: "il2", title: "Lines, Shapes & Forms", duration: "10 min", type: "video", isLocked: false, isCompleted: true },
      { id: "il3", title: "Sketching Everyday Objects", duration: "12 min", type: "video", isLocked: false, isCompleted: false },
      { id: "il4", title: "Introduction to Color Theory", duration: "14 min", type: "video", isLocked: false, isCompleted: false },
      { id: "il5", title: "Composition Basics", duration: "11 min", type: "video", isLocked: false, isCompleted: false },
      { id: "il6", title: "Finding Your Style", duration: "9 min", type: "video", isLocked: true, isCompleted: false },
      { id: "il7", title: "Digital Tools Overview", duration: "8 min", type: "article", isLocked: true, isCompleted: false },
      { id: "il8", title: "Creating Your First Piece", duration: "15 min", type: "video", isLocked: true, isCompleted: false },
      { id: "il9", title: "30-Day Drawing Challenge", duration: "6 min", type: "article", isLocked: true, isCompleted: false },
      { id: "il10", title: "Sharing Your Work", duration: "7 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  photography: {
    id: "photography",
    level: "Beginner",
    lastUpdated: "July 2026",
    description:
      "Master your camera and develop your eye for great photos. Learn composition, lighting, and editing basics so you can capture stunning images with any device.",
    whatYouLearn: [
      "Understand exposure: aperture, shutter speed, ISO",
      "Apply composition rules like the rule of thirds",
      "Work with natural and artificial light",
      "Edit photos like a pro with free tools",
      "Build a consistent photography practice",
    ],
    instructor: {
      name: "Daniel Abara",
      role: "Professional Photographer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Daniel's work has been featured in National Geographic and Vogue, and he specializes in teaching visual storytelling to beginners.",
    },
    curriculum: [
      { id: "p1", title: "How Your Camera Sees", duration: "8 min", type: "video", isLocked: false, isCompleted: true },
      { id: "p2", title: "The Exposure Triangle", duration: "12 min", type: "video", isLocked: false, isCompleted: false },
      { id: "p3", title: "Composition Essentials", duration: "10 min", type: "video", isLocked: false, isCompleted: false },
      { id: "p4", title: "Natural Light Photography", duration: "11 min", type: "video", isLocked: false, isCompleted: false },
      { id: "p5", title: "Introduction to Editing", duration: "14 min", type: "video", isLocked: true, isCompleted: false },
      { id: "p6", title: "Portrait Photography Basics", duration: "9 min", type: "video", isLocked: true, isCompleted: false },
      { id: "p7", title: "Landscape & Street Photography", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "p8", title: "Building Your Portfolio", duration: "7 min", type: "article", isLocked: true, isCompleted: false },
      { id: "p9", title: "Your Photography Roadmap", duration: "5 min", type: "video", isLocked: true, isCompleted: false },
      { id: "p10", title: "Editing Challenge", duration: "8 min", type: "quiz", isLocked: true, isCompleted: false },
    ],
  },
  webdev: {
    id: "webdev",
    level: "Beginner",
    lastUpdated: "September 2026",
    description:
      "Build your first website from scratch. This project-based course takes you from zero coding knowledge to deploying a real, responsive website using HTML, CSS, and JavaScript.",
    whatYouLearn: [
      "Write clean HTML5 and semantic markup",
      "Style pages with modern CSS including Flexbox and Grid",
      "Add interactivity with vanilla JavaScript",
      "Make sites responsive for all screen sizes",
      "Deploy a website to the internet for free",
    ],
    instructor: {
      name: "Alex Kim",
      role: "Full-Stack Developer & Educator",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Alex has built products for startups and taught web development to over 300k students through hands-on, project-based courses.",
    },
    curriculum: [
      { id: "w1", title: "How the Web Works", duration: "6 min", type: "video", isLocked: false, isCompleted: true },
      { id: "w2", title: "Your First HTML Page", duration: "10 min", type: "video", isLocked: false, isCompleted: true },
      { id: "w3", title: "HTML Essentials & Semantics", duration: "12 min", type: "video", isLocked: false, isCompleted: false },
      { id: "w4", title: "CSS Basics: Colors, Fonts & Spacing", duration: "14 min", type: "video", isLocked: false, isCompleted: false },
      { id: "w5", title: "Flexbox Layout", duration: "16 min", type: "video", isLocked: false, isCompleted: false },
      { id: "w6", title: "CSS Grid Deep Dive", duration: "15 min", type: "video", isLocked: true, isCompleted: false },
      { id: "w7", title: "Responsive Design & Media Queries", duration: "13 min", type: "video", isLocked: true, isCompleted: false },
      { id: "w8", title: "JavaScript Fundamentals", duration: "18 min", type: "video", isLocked: true, isCompleted: false },
      { id: "w9", title: "DOM Manipulation", duration: "14 min", type: "video", isLocked: true, isCompleted: false },
      { id: "w10", title: "Build & Deploy Your Portfolio Site", duration: "20 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  ai: {
    id: "ai",
    level: "Beginner",
    lastUpdated: "September 2026",
    description:
      "Demystify artificial intelligence. Understand how AI works, where it's headed, and how you can use it responsibly in your work and daily life — no technical background needed.",
    whatYouLearn: [
      "Understand what AI can and cannot do today",
      "Use prompts effectively with language models",
      "Identify AI use cases in your own work",
      "Navigate ethical considerations of AI",
      "Stay current with rapid AI developments",
    ],
    instructor: {
      name: "Alex Kim",
      role: "Full-Stack Developer & Educator",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Alex has built products for startups and taught web development to over 300k students through hands-on, project-based courses.",
    },
    curriculum: [
      { id: "a1", title: "What Is AI, Really?", duration: "8 min", type: "video", isLocked: false, isCompleted: true },
      { id: "a2", title: "How Language Models Work", duration: "11 min", type: "video", isLocked: false, isCompleted: true },
      { id: "a3", title: "Writing Effective Prompts", duration: "13 min", type: "video", isLocked: false, isCompleted: false },
      { id: "a4", title: "AI for Writing & Research", duration: "10 min", type: "video", isLocked: false, isCompleted: false },
      { id: "a5", title: "AI for Productivity", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "a6", title: "Understanding AI Limitations", duration: "8 min", type: "article", isLocked: true, isCompleted: false },
      { id: "a7", title: "Ethics & Responsible AI Use", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "a8", title: "AI Tools Landscape 2026", duration: "7 min", type: "article", isLocked: true, isCompleted: false },
      { id: "a9", title: "Your AI Action Plan", duration: "6 min", type: "video", isLocked: true, isCompleted: false },
      { id: "a10", title: "Course Wrap-Up", duration: "4 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  storytelling: {
    id: "storytelling",
    level: "Beginner",
    lastUpdated: "June 2026",
    description:
      "Everyone has stories worth telling. Learn the timeless principles of narrative structure, emotional hooks, and authentic delivery to captivate any audience.",
    whatYouLearn: [
      "Structure stories with a clear arc",
      "Hook your audience in the first 30 seconds",
      "Use emotion to make stories memorable",
      "Adapt your story for different contexts",
      "Overcome stage fright and self-doubt",
    ],
    instructor: {
      name: "Priya Nair",
      role: "Career Strategist",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Priya has coached professionals at Google, Amazon, and Spotify, with a 94% success rate in helping clients land roles they love.",
    },
    curriculum: [
      { id: "st1", title: "Why Stories Matter", duration: "6 min", type: "video", isLocked: false, isCompleted: true },
      { id: "st2", title: "The Story Arc Framework", duration: "10 min", type: "video", isLocked: false, isCompleted: false },
      { id: "st3", title: "Crafting Your Hook", duration: "8 min", type: "video", isLocked: false, isCompleted: false },
      { id: "st4", title: "Emotion & Vulnerability", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "st5", title: "Storytelling for Presentations", duration: "11 min", type: "video", isLocked: true, isCompleted: false },
      { id: "st6", title: "Storytelling for Interviews", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "st7", title: "Practice Workshop", duration: "12 min", type: "video", isLocked: true, isCompleted: false },
      { id: "st8", title: "Your Story Vault", duration: "5 min", type: "article", isLocked: true, isCompleted: false },
    ],
  },
  negotiation: {
    id: "negotiation",
    level: "Intermediate",
    lastUpdated: "July 2026",
    description:
      "Negotiation isn't about winning — it's about creating value. Learn frameworks used by FBI hostage negotiators and top business leaders to reach better outcomes in any situation.",
    whatYouLearn: [
      "Prepare strategically before any negotiation",
      "Use anchoring and framing to your advantage",
      "Listen actively and uncover hidden interests",
      "Handle objections and walk away gracefully",
      "Negotiate salary, rent, and everyday deals",
    ],
    instructor: {
      name: "James Okonkwo",
      role: "Executive Leadership Coach",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "James has led teams at Fortune 500 companies and now coaches mid-career professionals transitioning into leadership roles.",
    },
    curriculum: [
      { id: "n1", title: "The Mindset of a Negotiator", duration: "7 min", type: "video", isLocked: false, isCompleted: true },
      { id: "n2", title: "BATNA & Your Walk-Away Point", duration: "10 min", type: "video", isLocked: false, isCompleted: false },
      { id: "n3", title: "Anchoring & First Offers", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "n4", title: "Active Listening Techniques", duration: "11 min", type: "video", isLocked: false, isCompleted: false },
      { id: "n5", title: "Salary Negotiation Playbook", duration: "14 min", type: "video", isLocked: true, isCompleted: false },
      { id: "n6", title: "Everyday Negotiations", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "n7", title: "Handling Difficult People", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "n8", title: "Role-Play Practice", duration: "12 min", type: "video", isLocked: true, isCompleted: false },
      { id: "n9", title: "Common Mistakes to Avoid", duration: "7 min", type: "article", isLocked: true, isCompleted: false },
      { id: "n10", title: "Your Negotiation Toolkit", duration: "6 min", type: "article", isLocked: true, isCompleted: false },
    ],
  },
  "deep-focus": {
    id: "deep-focus",
    level: "Beginner",
    lastUpdated: "August 2026",
    description:
      "Train your brain for sustained deep work. Learn the neuroscience of focus, eliminate distractions, and build the mental stamina to do your best work in less time.",
    whatYouLearn: [
      "Understand how attention and focus work",
      "Design distraction-free work sessions",
      "Enter flow state more reliably",
      "Recover mental energy between sessions",
      "Build a sustainable deep-work routine",
    ],
    instructor: {
      name: "Elena Voss",
      role: "Productivity Consultant",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Elena has spent a decade optimizing workflows for startups and teaches practical productivity systems to over 150k learners.",
    },
    curriculum: [
      { id: "df1", title: "The Attention Economy", duration: "7 min", type: "video", isLocked: false, isCompleted: true },
      { id: "df2", title: "How Focus Works in the Brain", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "df3", title: "Eliminating Distractions", duration: "10 min", type: "video", isLocked: false, isCompleted: false },
      { id: "df4", title: "The Pomodoro Technique", duration: "8 min", type: "video", isLocked: false, isCompleted: false },
      { id: "df5", title: "Entering Flow State", duration: "11 min", type: "video", isLocked: true, isCompleted: false },
      { id: "df6", title: "Energy Management", duration: "9 min", type: "article", isLocked: true, isCompleted: false },
      { id: "df7", title: "Your Deep-Work Schedule", duration: "7 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  habits: {
    id: "habits",
    level: "Beginner",
    lastUpdated: "May 2026",
    description:
      "Small changes, remarkable results. Build lasting habits using behavioral science — learn how to start tiny, stay consistent, and make positive behaviors automatic.",
    whatYouLearn: [
      "Understand the habit loop: cue, craving, response, reward",
      "Design environments that make good habits easy",
      "Stack new habits onto existing routines",
      "Break bad habits by disrupting their cues",
      "Track progress and recover from slip-ups",
    ],
    instructor: {
      name: "Marcus Rivera",
      role: "Personal Finance Coach",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Marcus went from living paycheck-to-paycheck to financial independence and now teaches practical money skills to over 200k students.",
    },
    curriculum: [
      { id: "h1", title: "The Science of Habits", duration: "8 min", type: "video", isLocked: false, isCompleted: true },
      { id: "h2", title: "The Habit Loop Explained", duration: "10 min", type: "video", isLocked: false, isCompleted: true },
      { id: "h3", title: "Start Tiny: The 2-Minute Rule", duration: "7 min", type: "video", isLocked: false, isCompleted: false },
      { id: "h4", title: "Habit Stacking", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "h5", title: "Environment Design", duration: "11 min", type: "video", isLocked: true, isCompleted: false },
      { id: "h6", title: "Breaking Bad Habits", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "h7", title: "Tracking & Accountability", duration: "8 min", type: "article", isLocked: true, isCompleted: false },
      { id: "h8", title: "The Never-Miss-Twice Rule", duration: "6 min", type: "video", isLocked: true, isCompleted: false },
      { id: "h9", title: "Your 66-Day Habit Plan", duration: "7 min", type: "article", isLocked: true, isCompleted: false },
    ],
  },
  spanish: {
    id: "spanish",
    level: "Beginner",
    lastUpdated: "July 2026",
    description:
      "Start speaking Spanish from day one. This immersive course focuses on practical conversation skills — you'll learn the 20% of the language that covers 80% of everyday situations.",
    whatYouLearn: [
      "Introduce yourself and hold basic conversations",
      "Master essential Spanish pronunciation",
      "Use present-tense verbs confidently",
      "Navigate travel, dining and shopping situations",
      "Build vocabulary with proven memory techniques",
    ],
    instructor: {
      name: "Carmen Delgado",
      role: "Language Educator",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Carmen is a polyglot who speaks 5 languages and has taught Spanish to over 100k students using her immersion-first method.",
    },
    curriculum: [
      { id: "sp1", title: "¡Hola! Spanish Sounds & Greetings", duration: "8 min", type: "video", isLocked: false, isCompleted: true },
      { id: "sp2", title: "Introducing Yourself", duration: "10 min", type: "video", isLocked: false, isCompleted: true },
      { id: "sp3", title: "Numbers, Dates & Time", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "sp4", title: "Essential Verbs: Ser & Estar", duration: "12 min", type: "video", isLocked: false, isCompleted: false },
      { id: "sp5", title: "Ordering Food & Drinks", duration: "11 min", type: "video", isLocked: false, isCompleted: false },
      { id: "sp6", title: "Asking for Directions", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "sp7", title: "Shopping & Bargaining", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "sp8", title: "Vocabulary Builder", duration: "7 min", type: "quiz", isLocked: true, isCompleted: false },
      { id: "sp9", title: "Conversation Practice", duration: "12 min", type: "video", isLocked: true, isCompleted: false },
      { id: "sp10", title: "Your Study Roadmap", duration: "6 min", type: "article", isLocked: true, isCompleted: false },
    ],
  },
  "french-travel": {
    id: "french-travel",
    level: "Beginner",
    lastUpdated: "June 2026",
    description:
      "Travel to France with confidence. Learn the essential French phrases and cultural know-how to navigate airports, cafes, hotels, and everyday interactions like a polite local.",
    whatYouLearn: [
      "Pronounce French words correctly from day one",
      "Handle airport, taxi and hotel interactions",
      "Order at restaurants and ask for recommendations",
      "Read signs, menus and public transport info",
      "Understand cultural do's and don'ts",
    ],
    instructor: {
      name: "Carmen Delgado",
      role: "Language Educator",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Carmen is a polyglot who speaks 5 languages and has taught Spanish to over 100k students using her immersion-first method.",
    },
    curriculum: [
      { id: "f1", title: "French Pronunciation Basics", duration: "9 min", type: "video", isLocked: false, isCompleted: true },
      { id: "f2", title: "Greetings & Politeness", duration: "8 min", type: "video", isLocked: false, isCompleted: false },
      { id: "f3", title: "At the Airport", duration: "10 min", type: "video", isLocked: false, isCompleted: false },
      { id: "f4", title: "Taking a Taxi", duration: "7 min", type: "video", isLocked: false, isCompleted: false },
      { id: "f5", title: "At the Hotel", duration: "9 min", type: "video", isLocked: true, isCompleted: false },
      { id: "f6", title: "Ordering at a Cafe", duration: "11 min", type: "video", isLocked: true, isCompleted: false },
      { id: "f7", title: "At the Restaurant", duration: "12 min", type: "video", isLocked: true, isCompleted: false },
      { id: "f8", title: "Asking for Directions", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "f9", title: "Shopping & Markets", duration: "9 min", type: "video", isLocked: true, isCompleted: false },
      { id: "f10", title: "Cultural Tips for Travelers", duration: "7 min", type: "article", isLocked: true, isCompleted: false },
    ],
  },
  "finance-101": {
    id: "finance-101",
    level: "Beginner",
    lastUpdated: "August 2026",
    description:
      "Build a rock-solid financial foundation. Learn to manage money wisely, eliminate debt, save strategically, and plan for a secure financial future — all in plain language.",
    whatYouLearn: [
      "Create and manage a personal budget",
      "Understand credit scores and debt management",
      "Build an emergency fund step by step",
      "Set short and long-term financial goals",
      "Make informed decisions about insurance and taxes",
    ],
    instructor: {
      name: "Sarah Chen",
      role: "Certified Financial Planner",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Sarah has over 12 years of experience in wealth management and has helped thousands of clients build sustainable financial futures.",
    },
    curriculum: [
      { id: "fn1", title: "Your Money Mindset", duration: "6 min", type: "video", isLocked: false, isCompleted: true },
      { id: "fn2", title: "Tracking Income & Expenses", duration: "10 min", type: "video", isLocked: false, isCompleted: true },
      { id: "fn3", title: "The Debt Snowball Method", duration: "12 min", type: "video", isLocked: false, isCompleted: true },
      { id: "fn4", title: "Building Your Emergency Fund", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "fn5", title: "Introduction to Credit Scores", duration: "8 min", type: "article", isLocked: false, isCompleted: false },
      { id: "fn6", title: "Setting Financial Goals", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "fn7", title: "Insurance Basics", duration: "9 min", type: "video", isLocked: true, isCompleted: false },
      { id: "fn8", title: "Your Financial Action Plan", duration: "7 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  "career-planning": {
    id: "career-planning",
    level: "Beginner",
    lastUpdated: "September 2026",
    description:
      "Design a career you love. This course helps you identify your strengths, explore meaningful career paths, and take concrete steps toward professional fulfillment.",
    whatYouLearn: [
      "Identify your core strengths and values",
      "Research careers that match your profile",
      "Build a professional network from scratch",
      "Create a compelling personal narrative",
      "Plan your next career move with confidence",
    ],
    instructor: {
      name: "Priya Nair",
      role: "Career Strategist",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Priya has coached professionals at Google, Amazon, and Spotify, with a 94% success rate in helping clients land roles they love.",
    },
    curriculum: [
      { id: "cr1", title: "Career Design Thinking", duration: "8 min", type: "video", isLocked: false, isCompleted: true },
      { id: "cr2", title: "Identifying Your Strengths", duration: "11 min", type: "video", isLocked: false, isCompleted: true },
      { id: "cr3", title: "Values & Work Alignment", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "cr4", title: "Career Research Methods", duration: "10 min", type: "article", isLocked: false, isCompleted: false },
      { id: "cr5", title: "Informational Interviews", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "cr6", title: "Your Personal Narrative", duration: "12 min", type: "video", isLocked: true, isCompleted: false },
      { id: "cr7", title: "90-Day Career Action Plan", duration: "7 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
  nutrition: {
    id: "nutrition",
    level: "Beginner",
    lastUpdated: "July 2026",
    description:
      "Nutrition science made simple. Learn how to fuel your body properly, decode food labels, and build a balanced eating pattern that supports your energy and long-term health.",
    whatYouLearn: [
      "Understand macronutrients and micronutrients",
      "Read and interpret food labels accurately",
      "Build balanced meals using the plate method",
      "Navigate nutrition myths and fad diets",
      "Plan simple, nutritious meals on any budget",
    ],
    instructor: {
      name: "Dr. Anika Patel",
      role: "Mindfulness & Wellbeing Researcher",
      avatar:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "Dr. Patel combines neuroscience research with ancient meditation traditions to teach practical, evidence-based mindfulness techniques.",
    },
    curriculum: [
      { id: "nu1", title: "Nutrition Foundations", duration: "8 min", type: "video", isLocked: false, isCompleted: true },
      { id: "nu2", title: "Macronutrients Explained", duration: "11 min", type: "video", isLocked: false, isCompleted: true },
      { id: "nu3", title: "Reading Food Labels", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "nu4", title: "The Plate Method", duration: "7 min", type: "video", isLocked: false, isCompleted: false },
      { id: "nu5", title: "Debunking Diet Myths", duration: "10 min", type: "video", isLocked: true, isCompleted: false },
      { id: "nu6", title: "Meal Planning on a Budget", duration: "12 min", type: "video", isLocked: true, isCompleted: false },
      { id: "nu7", title: "Your Nutrition Action Plan", duration: "6 min", type: "article", isLocked: true, isCompleted: false },
    ],
  },
  speaking: {
    id: "speaking",
    level: "Beginner",
    lastUpdated: "August 2026",
    description:
      "Overcome anxiety and speak with clarity and confidence. From impromptu talks to prepared presentations, this course gives you the tools to connect with any audience.",
    whatYouLearn: [
      "Manage public speaking anxiety",
      "Structure talks that hold attention",
      "Use body language and voice effectively",
      "Handle Q&A and unexpected moments",
      "Practice with progressive challenges",
    ],
    instructor: {
      name: "James Okonkwo",
      role: "Executive Leadership Coach",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format&q=80",
      bio: "James has led teams at Fortune 500 companies and now coaches mid-career professionals transitioning into leadership roles.",
    },
    curriculum: [
      { id: "sa1", title: "Understanding Speaking Anxiety", duration: "7 min", type: "video", isLocked: false, isCompleted: true },
      { id: "sa2", title: "Structuring Your Message", duration: "10 min", type: "video", isLocked: false, isCompleted: true },
      { id: "sa3", title: "Vocal Techniques & Pace", duration: "8 min", type: "video", isLocked: false, isCompleted: false },
      { id: "sa4", title: "Body Language on Stage", duration: "9 min", type: "video", isLocked: false, isCompleted: false },
      { id: "sa5", title: "The First 30 Seconds", duration: "11 min", type: "video", isLocked: true, isCompleted: false },
      { id: "sa6", title: "Handling Q&A", duration: "8 min", type: "video", isLocked: true, isCompleted: false },
      { id: "sa7", title: "Practice Challenge", duration: "12 min", type: "video", isLocked: true, isCompleted: false },
    ],
  },
};