import { icons } from "lucide-react"

export type CategoriesType = {
  name: string,
  label: string,
  icon: keyof typeof icons
}

export const categories: CategoriesType[] = [
  {
    name: "cooking",
    label: "Cooking",
    icon: "ChefHat"
  },
  {
    name: "knowledge",
    label: "Knowledge",
    icon: "Lightbulb"
  },
  {
    name: "tech",
    label: "Technology",
    icon: "Cpu"
  },
  {
    name: "plan",
    label: "Plan",
    icon: "SquareKanban"
  },
  {
    name: "gaming",
    label: "Gaming",
    icon: "Gamepad2"
  },
  {
    name: "reminder",
    label: "Reminder",
    icon: "BellDot"
  },
  {
    name: "chemistry",
    label: "Chemistry",
    icon: "FlaskConical"
  },
  {
    name: "fun",
    label: "Fun",
    icon: "Laugh"
  },
  {
    name: "travel",
    label: "Travel",
    icon: "Backpack"
  },
  {
    name: "self_improve",
    label: "Self Improvement",
    icon: "BicepsFlexed"
  },
  {
    name: "other",
    label: "Other",
    icon: "NotebookPen"
  },
]