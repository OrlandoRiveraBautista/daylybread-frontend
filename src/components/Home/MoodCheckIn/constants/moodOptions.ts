import { MoodOption } from "../hooks/useMoodCheckIn";

export const MOOD_OPTIONS: MoodOption[] = [
  { emoji: "😇", label: "Peaceful", tag: "peaceful", color: "success" },
  { emoji: "🙏", label: "Grateful", tag: "grateful", color: "primary" },
  { emoji: "😞", label: "Downcast", tag: "downcast", color: "medium" },
  { emoji: "😤", label: "Frustrated", tag: "frustrated", color: "warning" },
  { emoji: "💭", label: "Anxious", tag: "anxious", color: "tertiary" },
  { emoji: "❤️", label: "Loved", tag: "loved", color: "secondary" },
  { emoji: "😔", label: "Guilty", tag: "guilty", color: "dark" },
  { emoji: "🌱", label: "Hopeful", tag: "hopeful", color: "success" },
];
