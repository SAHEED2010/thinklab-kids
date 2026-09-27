import type { LearnerId } from "@/lib/types";

export interface ParentEvidenceRecord {
  id: string;
  learnerId: LearnerId;
  learnerName: string;
  learnerAge: number;
  learnerFocus: string;
  learnerColor: string;
  activityTitle: string;
  worldName: string;
  sessionTime: string;
  problemFaced: string;
  academicFoundation: {
    concept: string;
    details: string;
  };
  approachStrategy: string;
  reasoningObserved: string;
  explanationObserved: string;
  supportNeeded: string;
  nextRecommendedStep: {
    action: string;
    context: string;
    suggestedWorld: string;
  };
  homeConversationPrompt: string;
  recentInterests: string[];
}

export const syntheticParentEvidence: ParentEvidenceRecord[] = [
  {
    id: "evidence-zara-market",
    learnerId: "zara",
    learnerName: "Zara",
    learnerAge: 7,
    learnerFocus: "Maths, reasoning and decisions",
    learnerColor: "leaf",
    activityTitle: "Balogun Market Budget Dilemma",
    worldName: "Life Missions & Number Lab",
    sessionTime: "Today · Synthetic Demo Session",
    problemFaced:
      "Purchasing ingredients for dinner within a ₦2,000 budget while maintaining a ₦200 reserve for transport, even when tomato prices unexpectedly surged by ₦150.",
    academicFoundation: {
      concept: "Multi-Digit Addition & Subtraction with Currency",
      details:
        "Added several market prices (₦600 Garri + ₦700 Smoked Fish + ₦450 Tomatoes = ₦1,750) and compared the total against a ₦2,000 budget limit.",
    },
    approachStrategy:
      "Prioritized protein nutrition first (smoked fish), then evaluated remaining budget allocations across staples and vegetables.",
    reasoningObserved:
      "Zara compared two alternatives after the tomato price changed, rather than exceeding her budget.",
    explanationObserved:
      "She explained that ₦200 needed to remain for transport, so she changed one item rather than exceeding the budget.",
    supportNeeded:
      "Initially needed a prompt to explain why the total cost should be subtracted from the available budget; formulated her explanation clearly once prompted.",
    nextRecommendedStep: {
      action: "Find three different item combinations that stay within a ₦3,000 budget",
      context:
        "Practise comparing multiple valid trade-offs with 4 pantry items in the market stall.",
      suggestedWorld: "Number Lab",
    },
    homeConversationPrompt:
      "Ask Zara at dinner: 'If you had ₦500 left over at the market, would you save it for transport or buy fresh fruit for tomorrow?'",
    recentInterests: ["Markets & money", "Cooking & nutrition", "Bus transport routes"],
  },
  {
    id: "evidence-tobi-robot",
    learnerId: "tobi",
    learnerName: "Tobi",
    learnerAge: 6,
    learnerFocus: "Computational thinking",
    learnerColor: "sky",
    activityTitle: "Robot Guidance to the Goal Star",
    worldName: "Code Quest",
    sessionTime: "Today · Synthetic Demo Session",
    problemFaced:
      "Navigating a robot around obstacles on a 5×5 grid to reach the goal star using an ordered sequence of directional command cards.",
    academicFoundation: {
      concept: "Sequential Logic & Ordinal Step Ordering",
      details:
        "Ordered instructions correctly to guide a robot toward a goal [Forward → Forward → Turn Right → Forward].",
    },
    approachStrategy:
      "Previewed the grid path and mentally tested command combinations step-by-step before executing the program.",
    reasoningObserved:
      "Tobi identified a sequencing mistake where turning right on step 1 would hit a boundary wall, and changed strategy to place the turn after moving forward twice.",
    explanationObserved:
      "He explained that the robot had to move two steps straight first so it would clear the barrier before making its turn.",
    supportNeeded:
      "Tried twice on the initial turn order before identifying the mistake; corrected after feedback from the visual simulation without frustration.",
    nextRecommendedStep: {
      action: "Sequence a 4-step path with multiple turns and an obstacle",
      context:
        "Practise anticipating heading and orientation changes before executing commands.",
      suggestedWorld: "Code Quest",
    },
    homeConversationPrompt:
      "Ask Tobi: 'Can you give me step-by-step instructions like a robot to walk from the chair to the front door without bumping into anything?'",
    recentInterests: ["Robots & gears", "Direction puzzles", "Building blocks"],
  },
  {
    id: "evidence-david-strategy",
    learnerId: "david",
    learnerName: "David",
    learnerAge: 9,
    learnerFocus: "Strategy and planning",
    learnerColor: "berry",
    activityTitle: "Two-Move Consequence Mapping",
    worldName: "Strategy Arena",
    sessionTime: "Yesterday · Synthetic Demo Session",
    problemFaced:
      "Balancing an immediate piece capture opportunity against leaving defensive center squares unprotected against a counter-attack.",
    academicFoundation: {
      concept: "Multi-Step Logic & Consequence Anticipation",
      details:
        "Evaluated conditional if-then branching to predict an opponent's counter-move two turns ahead in a tactical board puzzle.",
    },
    approachStrategy:
      "Looked for defensive vulnerabilities and board balance before committing to an aggressive capture.",
    reasoningObserved:
      "David compared two alternatives and recognized that taking the unprotected piece immediately would leave his center open, deciding to reinforce his guard piece first.",
    explanationObserved:
      "He explained why one choice was safer: 'If I attack now, my middle square is undefended. It is safer to guard first so I do not trade away an advantage.'",
    supportNeeded:
      "Needed a prompt to consider the opponent's strongest counter-response on move two.",
    nextRecommendedStep: {
      action: "Solve 2-turn defensive protection puzzles under time constraints",
      context:
        "Build habits of asking 'What does my opponent want to do next?' before finalizing decisions.",
      suggestedWorld: "Strategy Arena",
    },
    homeConversationPrompt:
      "Ask David: 'When you play a board game, do you focus on your own plan first, or do you try to guess what the other player is planning?'",
    recentInterests: ["Chess & board games", "Solar power concepts", "Strategy puzzles"],
  },
  {
    id: "evidence-amara-foundations",
    learnerId: "amara",
    learnerName: "Amara",
    learnerAge: 4,
    learnerFocus: "Early foundations",
    learnerColor: "mango",
    activityTitle: "Animal Tracks & Counting Parade",
    worldName: "Number Lab & Story Studio",
    sessionTime: "Yesterday · Synthetic Demo Session",
    problemFaced:
      "Matching animal calls to visual track cards by counting toe prints in sets of two and three rather than relying on color alone.",
    academicFoundation: {
      concept: "1-to-1 Correspondence Counting & Vocabulary",
      details:
        "Matched auditory animal calls to visual track cards and counted toe prints in sets of two and three.",
    },
    approachStrategy:
      "Listened closely to animal sounds, counting toe prints with her finger on the screen in steady rhythm.",
    reasoningObserved:
      "Amara noticed that two different birds had the same toe count, grouping them together by quantity rather than by feather color.",
    explanationObserved:
      "She explained with excitement: 'Two birds have four wings altogether when they fly!'",
    supportNeeded:
      "Asked for help once when switching from sound identification to footprint counting.",
    nextRecommendedStep: {
      action: "Pair spoken number words with physical household items",
      context:
        "Group everyday items like cups and fruit into sets of two, three, and four.",
      suggestedWorld: "Number Lab",
    },
    homeConversationPrompt:
      "Ask Amara: 'How many birds can you spot on the tree outside? Can we count their wings together?'",
    recentInterests: ["Animal sounds & stories", "Rhythm and song", "Colors & shapes"],
  },
  {
    id: "evidence-favour-design",
    learnerId: "favour",
    learnerName: "Favour",
    learnerAge: 11,
    learnerFocus: "Open-ended problem solving",
    learnerColor: "coral",
    activityTitle: "Community Solar Microgrid Allocation",
    worldName: "Discovery Lab & Creator Studio",
    sessionTime: "2 days ago · Synthetic Demo Session",
    problemFaced:
      "Allocating limited battery capacity from a 500W community solar panel between clinic vaccine refrigeration, evening study lamps, and phone charging during an overcast day.",
    academicFoundation: {
      concept: "Mathematical Optimization & Applied Science",
      details:
        "Calculated watt-hour energy consumption across 3 community services against a 1.2kWh daily battery storage limit.",
    },
    approachStrategy:
      "Created priority tiers based on health and safety needs before allocating discretionary power.",
    reasoningObserved:
      "Favour tested three different power allocations and changed strategy after sunlight dropped by 40%, choosing to throttle entertainment charging to keep clinic vaccine cooling active.",
    explanationObserved:
      "She explained why one choice was safer: 'If medicine loses cooling, it spoils permanently. People can wait to charge phones tomorrow, but clinic power cannot be interrupted.'",
    supportNeeded:
      "Needed a prompt to calculate total watt-hours over 6 evening hours rather than treating power draw as an instantaneous value.",
    nextRecommendedStep: {
      action: "Model a rain-season energy conservation schedule with variable sunlight",
      context:
        "Design a conditional power-saving matrix for community water pumping and clinic lighting.",
      suggestedWorld: "Creator Studio",
    },
    homeConversationPrompt:
      "Ask Favour: 'If our neighborhood had solar power during rainy season, which appliances would you turn on first and which would you wait to use?'",
    recentInterests: ["Solar energy & circuits", "Community health", "Coding & automation"],
  },
];
