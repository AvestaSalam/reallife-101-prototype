import type { ResourceDetail } from "./resources";

export const resourceDetails: Record<string, ResourceDetail> = {
  "budget-template": {
    id: "budget-template",
    sections: [
      { heading: "Getting Started", content: "A budget is the foundation of financial health. This template helps you track every dollar so you can make informed decisions about your money." },
      { heading: "How to Use This Template", content: "Start by listing all your income sources, then categorize your expenses into needs, wants, and savings. Update weekly for best results.", list: ["Enter your monthly income at the top", "List fixed expenses (rent, utilities, subscriptions)", "Track variable expenses (groceries, dining, entertainment)", "Set savings goals and track progress", "Review and adjust at the end of each month"] },
      { heading: "Tips for Success", content: "The key to sticking with a budget is automation. Set up automatic transfers to savings and use the 50/30/20 rule as a starting guideline.", list: ["50% for needs (rent, food, utilities)", "30% for wants (entertainment, dining out)", "20% for savings and debt repayment"] },
    ],
    keyTakeaways: ["Track every expense for at least 30 days", "Use the 50/30/20 rule as a starting point", "Automate savings transfers", "Review and adjust monthly"],
    relatedResources: ["emergency-fund", "debt-payoff"],
  },
  "investing-guide": {
    id: "investing-guide",
    sections: [
      { heading: "Why Invest?", content: "Keeping money in a savings account loses value to inflation over time. Investing allows your money to grow and compound, building long-term wealth." },
      { heading: "Getting Started", content: "Before investing, ensure you have an emergency fund and high-interest debt under control. Start with retirement accounts like a 401(k) or IRA.", list: ["Build a 3-6 month emergency fund first", "Pay off high-interest debt (>7%)", "Take advantage of employer 401(k) match", "Open a Roth IRA for tax-free growth"] },
      { heading: "Investment Basics", content: "Diversification is key. Don't put all your money in one stock. Low-cost index funds are the best starting point for most investors.", list: ["Index funds provide instant diversification", "Dollar-cost average to reduce timing risk", "Keep fees low (<0.2% expense ratio)", "Think long-term — 10+ years"] },
      { heading: "Common Mistakes", content: "Avoid these pitfalls that trip up many beginners.", list: ["Trying to time the market", "Panic selling during downturns", "Investing money you'll need within 5 years", "Paying high fees for active management"] },
    ],
    keyTakeaways: ["Start early to maximize compound growth", "Use low-cost index funds", "Diversify across asset classes", "Think long-term and ignore short-term noise"],
    relatedResources: ["emergency-fund", "wealth-building"],
  },
  "emergency-fund": {
    id: "emergency-fund",
    sections: [
      { heading: "What is an Emergency Fund?", content: "An emergency fund is cash set aside for unexpected expenses — job loss, medical bills, car repairs, or home repairs. It prevents you from going into debt when life happens." },
      { heading: "How Much Do You Need?", content: "Start with $1,000 as a mini emergency fund, then build up to 3-6 months of essential expenses. If you're self-employed or have irregular income, aim for 6-12 months.", list: ["Starter goal: $1,000 within 30 days", "Full goal: 3 months of expenses", "Extended goal: 6 months for stability"] },
      { heading: "Where to Keep It", content: "Your emergency fund should be liquid and safe. Don't invest it in stocks. A high-yield savings account is ideal.", list: ["High-yield savings account (4-5% APY)", "Money market account", "NOT in stocks or crypto", "NOT locked in a CD"] },
      { heading: "Building Your Fund", content: "Set up automatic transfers from your checking account each payday. Start small — even $25 per paycheck adds up over time.", list: ["Set up automatic transfers", "Use windfalls (tax refunds, bonuses)", "Sell unused items", "Temporarily reduce discretionary spending"] },
    ],
    keyTakeaways: ["Start with $1,000 as quickly as possible", "Keep it in a high-yield savings account", "Automate contributions every payday", "Only use for true emergencies"],
    relatedResources: ["budget-template", "debt-payoff"],
  },
  "debt-payoff": {
    id: "debt-payoff",
    sections: [
      { heading: "Understanding Your Debt", content: "List all your debts with balances, interest rates, and minimum payments. You can't fix what you don't measure." },
      { heading: "The Snowball Method", content: "Pay minimums on all debts, then put extra money toward the smallest balance. Once it's paid off, roll that payment to the next smallest. Great for motivation and quick wins.", list: ["List debts smallest to largest", "Pay minimums on all except smallest", "Attack smallest debt with extra payments", "Repeat until debt-free"] },
      { heading: "The Avalanche Method", content: "Pay minimums on all debts, then put extra toward the highest interest rate. Mathematically optimal — saves the most money on interest.", list: ["List debts by interest rate (highest first)", "Pay minimums on all except highest rate", "Attack highest rate with extra payments", "Repeat until debt-free"] },
      { heading: "Choosing Your Strategy", content: "Both methods work. The best method is the one you'll stick with. Snowball for motivation, avalanche for math." },
    ],
    keyTakeaways: ["List all debts with rates and balances", "Choose snowball or avalanche", "Always pay minimums on all debts", "Don't accumulate new debt while paying off old"],
    relatedResources: ["budget-template", "emergency-fund"],
  },

  "resume-template": {
    id: "resume-template",
    sections: [
      { heading: "Resume Fundamentals", content: "Your resume has 6-10 seconds to make an impression. Make every word count. Focus on achievements, not just responsibilities." },
      { heading: "Structure", content: "A modern resume should be clean, ATS-friendly, and scannable.", list: ["Contact info with LinkedIn URL", "Professional summary (2-3 sentences)", "Work experience with metrics", "Skills section (hard skills only)", "Education (remove GPA if < 3.5)"] },
      { heading: "Writing Bullet Points", content: "Use the formula: Action Verb + Task + Result. Quantify everything possible.", list: ["Increased revenue by 23% in Q3", "Managed team of 8 engineers", "Reduced costs by $50K annually", "Launched 3 new product features"] },
      { heading: "ATS Optimization", content: "Many companies use Applicant Tracking Systems. Use standard section headings, avoid tables/graphics, and include keywords from the job description." },
    ],
    keyTakeaways: ["Keep it to 1 page (under 10 years experience)", "Quantify achievements with numbers", "Tailor to each job application", "Use standard fonts and formatting"],
    relatedResources: ["interview-guide", "networking"],
  },
  "interview-guide": {
    id: "interview-guide",
    sections: [
      { heading: "Before the Interview", content: "Preparation is the difference between confidence and anxiety. Research the company, role, and interviewers thoroughly.", list: ["Study the job description line by line", "Research the company's recent news", "Prepare 5-7 stories using the STAR method", "Prepare thoughtful questions to ask them"] },
      { heading: "The STAR Method", content: "Structure your answers using Situation, Task, Action, Result. This keeps your answers clear and compelling.", list: ["Situation: Set the context briefly", "Task: What was your responsibility?", "Action: What specifically did YOU do?", "Result: What was the measurable outcome?"] },
      { heading: "Common Questions", content: "Prepare strong answers for these frequent questions:", list: ["Tell me about yourself (2 min pitch)", "What's your greatest weakness? (real + improvement)", "Why do you want to work here? (specific)", "Where do you see yourself in 5 years?", "Why are you leaving your current role?"] },
      { heading: "After the Interview", content: "Send a personalized thank-you email within 24 hours. Reference something specific from the conversation." },
    ],
    keyTakeaways: ["Prepare 5-7 STAR stories", "Research the company deeply", "Ask thoughtful questions", "Send thank-you notes within 24 hours"],
    relatedResources: ["resume-template", "networking"],
  },
  "networking": {
    id: "networking",
    sections: [
      { heading: "Networking for Introverts", content: "Networking isn't about working a room. It's about building genuine relationships. Introverts often make better networkers because they listen more than they talk." },
      { heading: "Where to Start", content: "You don't need to attend crowded events. Start with people you already know and build outward.", list: ["Reconnect with former colleagues", "Join online communities in your field", "Attend small meetups (under 20 people)", "Schedule 1-on-1 coffee chats"] },
      { heading: "The Art of the Follow-Up", content: "The real networking happens in the follow-up. Send a personalized message within 48 hours of meeting someone new.", list: ["Send a LinkedIn request with a note", "Reference something specific you discussed", "Offer value before asking for help", "Stay in touch quarterly"] },
      { heading: "Building Your Personal Brand", content: "Share your knowledge publicly. Write posts, comment thoughtfully, and become known in your niche." },
    ],
    keyTakeaways: ["Focus on quality over quantity", "Listen more than you talk", "Follow up within 48 hours", "Give value before asking for help"],
    relatedResources: ["resume-template", "interview-guide"],
  },

  "time-blocking": {
    id: "time-blocking",
    sections: [
      { heading: "What is Time Blocking?", content: "Time blocking is scheduling every hour of your day in advance. Instead of a to-do list, you have a calendar that tells you what to work on and when." },
      { heading: "How to Start", content: "Begin by blocking your fixed commitments, then add deep work blocks, then shallow work, then personal time.", list: ["Block fixed commitments first", "Schedule 2-3 deep work blocks (90 min each)", "Group similar tasks into batches", "Include buffer time between blocks", "Block personal time (exercise, meals, family)"] },
      { heading: "Protecting Your Blocks", content: "Your calendar is sacred. Treat blocked time as seriously as a meeting with your boss.", list: ["Turn off notifications during deep work", "Communicate your availability to colleagues", "Say no to meetings that conflict with deep work", "Review and plan tomorrow's blocks today"] },
      { heading: "Tools & Templates", content: "Use a digital calendar (Google Calendar or Outlook) with color coding. This template provides a weekly structure you can replicate." },
    ],
    keyTakeaways: ["Schedule every hour of your day", "Protect deep work blocks fiercely", "Include buffer time between tasks", "Review and adjust weekly"],
    relatedResources: ["deep-work", "habit-tracker"],
  },
  "deep-work": {
    id: "deep-work",
    sections: [
      { heading: "The Deep Work Hypothesis", content: "The ability to focus without distraction on cognitively demanding tasks is becoming increasingly rare and increasingly valuable. Those who master it will thrive." },
      { heading: "Scheduling Deep Work", content: "Not all hours are equal. Identify your peak cognitive hours and protect them for your most important work.", list: ["Identify your biological peak hours", "Schedule 2-4 hours of deep work daily", "Make it a non-negotiable ritual", "Track your deep work hours weekly"] },
      { heading: "Eliminating Distractions", content: "Shallow work (email, meetings, Slack) expands to fill available time. You must actively defend against it.", list: ["Turn off all notifications", "Use website blockers during focus time", "Set an away message", "Batch email to 2-3 times per day"] },
      { heading: "Building Your Capacity", content: "Like a muscle, focus strengthens with training. Start with 25-minute sessions and work up to 90-minute blocks." },
    ],
    keyTakeaways: ["Schedule deep work like a meeting", "Eliminate all distractions during focus time", "Track your hours to improve", "Start small and build capacity"],
    relatedResources: ["time-blocking", "habit-tracker"],
  },
  "habit-tracker": {
    id: "habit-tracker",
    sections: [
      { heading: "Why Track Habits?", content: "What gets measured gets managed. A habit tracker makes progress visible and builds momentum through streaks." },
      { heading: "Getting Started", content: "Don't try to change everything at once. Start with 2-3 keystone habits that create positive ripple effects.", list: ["Choose 2-3 habits maximum", "Make them specific and measurable", "Start embarrassingly small", "Track daily for 90 days"] },
      { heading: "The 90-Day Challenge", content: "Research suggests it takes 66 days on average to form a new habit. Our 90-day tracker gives you a buffer for missed days.", list: ["Mark each day you complete the habit", "Never miss twice in a row", "Review progress weekly", "Celebrate monthly milestones"] },
      { heading: "Common Pitfalls", content: "Avoid these mistakes that cause most people to give up.", list: ["Trying to change too many habits at once", "Being too rigid — allow flexibility", "Not having an accountability partner", "Focusing on perfection over consistency"] },
    ],
    keyTakeaways: ["Start with just 2-3 habits", "Never miss twice in a row", "Track consistency, not perfection", "Celebrate small wins"],
    relatedResources: ["time-blocking", "deep-work"],
  },

  "meal-planning": {
    id: "meal-planning",
    sections: [
      { heading: "Why Meal Plan?", content: "Meal planning saves time, money, and reduces decision fatigue. You'll eat healthier and waste less food." },
      { heading: "The Planning Process", content: "Set aside 30 minutes each week to plan your meals. Sunday is the most popular day for this ritual.", list: ["Check what you already have", "Plan meals around sales and seasonal produce", "Write your grocery list", "Prep ingredients in advance"] },
      { heading: "Template Structure", content: "This planner breaks your week into breakfast, lunch, dinner, and snacks. Batch cook grains and proteins to mix and match.", list: ["Batch cook grains (rice, quarts)", "Prep proteins (chicken, beans, tofu)", "Wash and chop vegetables", "Plan for leftovers"] },
      { heading: "Money-Saving Tips", content: "The average family wastes 30% of the food they buy. Meal planning dramatically reduces this.", list: ["Buy in bulk for staples", "Use seasonal produce", "Plan meals around what's on sale", "Repurpose leftovers into new meals"] },
    ],
    keyTakeaways: ["Plan weekly, shop once", "Batch cook staples", "Use seasonal ingredients", "Reduce food waste by 30%"],
    relatedResources: ["cooking-basics", "sleep-guide"],
  },
  "sleep-guide": {
    id: "sleep-guide",
    sections: [
      { heading: "Why Sleep Matters", content: "Sleep is the foundation of health, productivity, and emotional regulation. One night of poor sleep reduces cognitive performance by up to 30%." },
      { heading: "Sleep Hygiene", content: "Small changes to your environment and habits can dramatically improve sleep quality.", list: ["Keep your room cool (65-68°F / 18-20°C)", "Make it dark (blackout curtains or eye mask)", "No screens 1 hour before bed", "Avoid caffeine after 2 PM"] },
      { heading: "Building a Routine", content: "Your body craves consistency. Go to bed and wake up at the same time every day — even on weekends.", list: ["Set a consistent wake time", "Create a wind-down routine", "Use your bed only for sleep", "Get morning sunlight exposure"] },
      { heading: "When to Seek Help", content: "If you consistently struggle with sleep despite good hygiene, consult a healthcare provider. Sleep apnea and insomnia are treatable conditions." },
    ],
    keyTakeaways: ["Aim for 7-9 hours nightly", "Keep a consistent schedule", "Optimize your sleep environment", "Avoid screens before bed"],
    relatedResources: ["meal-planning", "deep-work"],
  },
  "ai-tools": {
    id: "ai-tools",
    sections: [
      { heading: "The AI Revolution", content: "AI tools are transforming how we work, learn, and create. Understanding how to use them effectively is becoming an essential skill." },
      { heading: "Essential AI Tools", content: "Here are the top tools that can 10x your productivity across different domains.", list: ["Writing: ChatGPT, Claude, Jasper", "Design: Midjourney, DALL-E, Canva AI", "Coding: GitHub Copilot, Cursor", "Research: Perplexity, Consensus", "Automation: Zapier, Make"] },
      { heading: "Best Practices", content: "AI is a tool, not a replacement for thinking. Use it to augment your abilities, not replace them.", list: ["Always verify AI-generated information", "Provide clear, specific prompts", "Iterate on outputs — don't accept first results", "Keep sensitive data private"] },
      { heading: "Getting Started", content: "Pick one tool relevant to your work and spend a week mastering it. Then expand your toolkit." },
    ],
    keyTakeaways: ["AI augments human capabilities", "Prompt quality determines output quality", "Always verify AI-generated facts", "Start with one tool and master it"],
    relatedResources: ["password-security", "deep-work"],
  },
  "password-security": {
    id: "password-security",
    sections: [
      { heading: "Why Password Security Matters", content: "The average person has 100+ passwords. A single breach can cascade across all your accounts. Proper password hygiene is essential." },
      { heading: "Creating Strong Passwords", content: "Forget complex rules. Use long passphrases (4+ random words) or let a password manager generate them.", list: ["Use 16+ characters minimum", "Never reuse passwords across sites", "Use a password manager (Bitwarden, 1Password)", "Enable two-factor authentication (2FA)"] },
      { heading: "Two-Factor Authentication", content: "2FA adds a second layer of security. Even if your password is stolen, attackers can't access your account without the second factor.", list: ["Use an authenticator app (not SMS)", "Store backup codes securely", "Enable 2FA on email first (it's the master key)", "Prioritize: email, financial, social media"] },
      { heading: "Breach Response", content: "If a service you use is breached, change that password immediately and any accounts sharing the same password." },
    ],
    keyTakeaways: ["Use a password manager for all accounts", "Enable 2FA everywhere possible", "Never reuse passwords", "Use 16+ character passphrases"],
    relatedResources: ["ai-tools", "tech"],
  },
  "cooking-basics": {
    id: "cooking-basics",
    sections: [
      { heading: "Setting Up Your Kitchen", content: "You don't need fancy equipment to cook great meals. Start with these essentials and build from there.", list: ["Chef's knife (8-inch)", "Cutting board", "Large skillet", "Sheet pan", "Measuring cups and spoons"] },
      { heading: "Knife Skills", content: "Good knife skills make cooking faster, safer, and more enjoyable. Master these three cuts and you'll handle 90% of prep work.", list: ["Dice: small cubes for even cooking", "Julienne: thin strips for stir-fry", "Chiffonade: ribbon cut for herbs"] },
      { heading: "Five Mother Sauces", content: "French cuisine is built on five foundational sauces. Learn these and you can make hundreds of dishes.", list: ["Béchamel (milk + roux)", "Velouté (stock + roux)", "Espagnole (brown stock + tomato)", "Hollandaise (butter + egg yolk)", "Tomato (tomato + aromatics)"] },
      { heading: "Building Flavor", content: "Great cooking is about layering flavors. Salt early, acid at the end, and taste as you go.", list: ["Salt in layers, not all at once", "Use acid (lemon, vinegar) to brighten", "Bloom spices in fat", "Finish with fresh herbs"] },
    ],
    keyTakeaways: ["Invest in one good knife", "Master 5 mother sauces", "Salt in layers", "Taste as you cook"],
    relatedResources: ["meal-planning", "first-aid"],
  },
  "first-aid": {
    id: "first-aid",
    sections: [
      { heading: "Emergency Preparedness", content: "Every home should have a basic first aid kit and the knowledge to use it. Emergencies happen — being prepared saves lives.", list: ["Adhesive bandages (various sizes)", "Gauze pads and medical tape", "Antiseptic wipes", "Instant cold pack", "Tweezers and scissors", "Disposable gloves"] },
      { heading: "Cuts and Scrapes", content: "Most minor wounds can be treated at home with proper cleaning and dressing.", list: ["Apply direct pressure to stop bleeding", "Clean with clean water (not hydrogen peroxide)", "Apply antibiotic ointment", "Cover with sterile bandage", "Change dressing daily"] },
      { heading: "Burns", content: "Act quickly for burns. The first 10 minutes are critical.", list: ["Cool the burn under cool (not cold) water for 10+ minutes", "Remove jewelry before swelling starts", "Cover loosely with sterile gauze", "Never apply ice, butter, or oil", "Seek help for burns larger than 3 inches"] },
      { heading: "When to Call 911", content: "Don't hesitate to call emergency services for these situations:", list: ["Difficulty breathing or choking", "Severe bleeding that won't stop", "Suspected spinal injury", "Signs of stroke (FAST: Face, Arms, Speech, Time)", "Loss of consciousness"] },
    ],
    keyTakeaways: ["Keep a stocked first aid kit at home", "Cool burns immediately with water", "Apply direct pressure for bleeding", "Know when to call 911"],
    relatedResources: ["cooking-basics", "health"],
  },
};
