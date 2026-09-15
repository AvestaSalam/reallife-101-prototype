export interface RoadmapCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface RoadmapCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  courses: RoadmapCourse[];
}

export const roadmapCategories: RoadmapCategory[] = [
  {
    id: "driving",
    title: "Driving Lessons",
    description: "Learn to drive confidently — from basics to advanced techniques.",
    icon: "car",
    color: "from-blue-500/20 to-blue-600/5",
    courses: [
      {
        id: "driving-basics",
        title: "Driving Fundamentals",
        description: "Master the basics: steering, braking, and road rules.",
        duration: "2h 00m",
        imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=220&fit=crop&auto=format&q=80",
        isCompleted: true,
        isLocked: false,
      },
      {
        id: "highway-driving",
        title: "Highway & City Driving",
        description: "Navigate highways and busy city streets with confidence.",
        duration: "1h 30m",
        imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400&h=220&fit=crop&auto=format&q=80",
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "parallel-parking",
        title: "Parallel Parking Mastery",
        description: "Master parallel parking and tight-space maneuvers.",
        duration: "45m",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=220&fit=crop&auto=format&q=80",
        isCompleted: false,
        isLocked: true,
      },
      {
        id: "road-safety",
        title: "Road Safety & Defensive Driving",
        description: "Stay safe on the road with defensive driving techniques.",
        duration: "1h 15m",
        imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=220&fit=crop&auto=format&q=80",
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: "cooking",
    title: "Cooking Skills",
    description: "From beginner cook to home chef — master the kitchen.",
    icon: "chef-hat",
    color: "from-orange-500/20 to-orange-600/5",
    courses: [
      {
        id: "cooking-basics",
        title: "Kitchen Basics",
        description: "Essential tools, knife skills, and cooking techniques.",
        duration: "2h 00m",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=220&fit=crop&auto=format&q=80",
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "home-cooking",
        title: "Home Cooking Mastery",
        description: "Cook delicious, healthy meals at home.",
        duration: "4h 00m",
        imageUrl: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=220&fit=crop&auto=format&q=80",
        isCompleted: false,
        isLocked: false,
      },
      {
        id: "baking",
        title: "Baking Essentials",
        description: "Breads, pastries, and desserts for beginners.",
        duration: "2h 30m",
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=220&fit=crop&auto=format&q=80",
        isCompleted: false,
        isLocked: true,
      },
      {
        id: "international-cuisine",
        title: "International Cuisine",
        description: "Explore flavors from around the world.",
        duration: "3h 00m",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=220&fit=crop&auto=format&q=80",
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
];

export const roadmapCategoriesExtra: RoadmapCategory[] = [
  {
    id: "gardening",
    title: "Gardening & Plants",
    description: "Grow your own garden and keep your plants thriving.",
    icon: "flower",
    color: "from-green-500/20 to-green-600/5",
    courses: [
      { id: "gardening-basics", title: "Gardening Basics", description: "Start your first garden: soil, seeds, and watering.", duration: "1h 30m", imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: true, isLocked: false },
      { id: "vegetable-garden", title: "Vegetable Garden", description: "Grow your own organic vegetables from seed to harvest.", duration: "2h 00m", imageUrl: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: false },
      { id: "plant-care", title: "Indoor Plant Care", description: "Keep your houseplants thriving year-round.", duration: "45m", imageUrl: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: true },
      { id: "composting", title: "Composting 101", description: "Turn kitchen scraps into nutrient-rich compost.", duration: "1h 00m", imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: true },
    ],
  },
  {
    id: "finance",
    title: "Personal Finance",
    description: "Take control of your money — budgeting, saving, and investing.",
    icon: "wallet",
    color: "from-emerald-500/20 to-emerald-600/5",
    courses: [
      { id: "budgeting", title: "Budgeting Basics", description: "Create a budget that actually works for your lifestyle.", duration: "1h 20m", imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: true, isLocked: false },
      { id: "investing", title: "Investing for Beginners", description: "Start building wealth with smart investment strategies.", duration: "3h 10m", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: false },
      { id: "side-hustle", title: "Building a Side Hustle", description: "Create additional income streams outside your 9-5.", duration: "2h 30m", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: false },
      { id: "wealth-building", title: "Wealth Building Mastery", description: "Advanced strategies for long-term financial independence.", duration: "2h 00m", imageUrl: "https://images.unsplash.com/photo-1553729459-afe8f2e2882d?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: true },
    ],
  },
  {
    id: "fitness",
    title: "Health & Fitness",
    description: "Build a sustainable fitness routine and healthy lifestyle.",
    icon: "dumbbell",
    color: "from-rose-500/20 to-rose-600/5",
    courses: [
      { id: "workout-basics", title: "Workout Fundamentals", description: "Learn proper form and build your first workout routine.", duration: "1h 45m", imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: false },
      { id: "nutrition", title: "Nutrition Basics", description: "Fuel your body right with balanced nutrition.", duration: "2h 00m", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: false },
      { id: "yoga", title: "Yoga for Beginners", description: "Improve flexibility, strength, and mindfulness.", duration: "1h 30m", imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: true },
      { id: "sleep", title: "Sleep & Recovery", description: "Optimize your sleep for peak performance.", duration: "1h 30m", imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: true },
    ],
  },
  {
    id: "tech",
    title: "Tech Skills",
    description: "Essential tech skills for the modern world.",
    icon: "code",
    color: "from-violet-500/20 to-violet-600/5",
    courses: [
      { id: "computer-basics", title: "Computer Basics", description: "Master essential computer skills for everyday use.", duration: "1h 30m", imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: true, isLocked: false },
      { id: "web-development", title: "Web Development 101", description: "Build your first website from scratch.", duration: "4h 00m", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: false },
      { id: "data-skills", title: "Data Literacy", description: "Understand and work with data effectively.", duration: "2h 00m", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: false },
      { id: "ai-basics", title: "AI & Machine Learning", description: "Understand AI and how to use it in your life.", duration: "3h 00m", imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=220&fit=crop&auto=format&q=80", isCompleted: false, isLocked: true },
    ],
  },
];