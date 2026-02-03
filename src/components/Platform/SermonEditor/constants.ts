import {
  listOutline,
  bookOutline,
  bulbOutline,
  peopleOutline,
} from "ionicons/icons";
import { SermonAIPromptType } from "../../../hooks/SermonHooks";
import { AICategory } from "./types";

// Map UI suggestions to backend prompt types
export const SUGGESTION_TO_PROMPT_TYPE: Record<string, SermonAIPromptType> = {
  // Structure
  "Start with an engaging opening story": SermonAIPromptType.OPENING_STORY,
  "Develop 3 main points": SermonAIPromptType.MAIN_POINTS,
  "Add a clear call to action": SermonAIPromptType.CALL_TO_ACTION,
  "Create smooth transitions": SermonAIPromptType.TRANSITIONS,
  // Scripture
  "Add relevant Bible verses": SermonAIPromptType.RELEVANT_VERSES,
  "Explain the historical context": SermonAIPromptType.HISTORICAL_CONTEXT,
  "Connect Old and New Testament": SermonAIPromptType.TESTAMENT_CONNECTION,
  "Use cross-references": SermonAIPromptType.CROSS_REFERENCES,
  // Illustrations
  "Include a personal testimony": SermonAIPromptType.PERSONAL_TESTIMONY,
  "Add a modern-day example": SermonAIPromptType.MODERN_EXAMPLE,
  "Use analogies from daily life": SermonAIPromptType.DAILY_LIFE_ANALOGY,
  "Reference current events": SermonAIPromptType.CURRENT_EVENTS,
  // Application
  "Make it practical for daily life": SermonAIPromptType.PRACTICAL_APPLICATION,
  "Address common challenges": SermonAIPromptType.ADDRESS_CHALLENGES,
  "Provide actionable steps": SermonAIPromptType.ACTIONABLE_STEPS,
  "Encourage reflection questions": SermonAIPromptType.REFLECTION_QUESTIONS,
};

// AI prompt categories with suggestions
export const AI_PROMPT_CATEGORIES: AICategory[] = [
  {
    category: "Structure",
    icon: listOutline,
    suggestions: [
      "Start with an engaging opening story",
      "Develop 3 main points",
      "Add a clear call to action",
      "Create smooth transitions",
    ],
  },
  {
    category: "Scripture",
    icon: bookOutline,
    suggestions: [
      "Add relevant Bible verses",
      "Explain the historical context",
      "Connect Old and New Testament",
      "Use cross-references",
    ],
  },
  {
    category: "Illustrations",
    icon: bulbOutline,
    suggestions: [
      "Include a personal testimony",
      "Add a modern-day example",
      "Use analogies from daily life",
      "Reference current events",
    ],
  },
  {
    category: "Application",
    icon: peopleOutline,
    suggestions: [
      "Make it practical for daily life",
      "Address common challenges",
      "Provide actionable steps",
      "Encourage reflection questions",
    ],
  },
];

// Generate a unique session ID for streaming
export const generateSessionId = () =>
  `sermon-ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
