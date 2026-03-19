import { BookOpen, Droplets, Moon, PersonStanding, Wind } from "lucide-react";
import { motion } from "motion/react";

const SUGGESTIONS = [
  {
    icon: Wind,
    label: "Mindful Breathing",
    sub: "5 min",
    bg: "bg-tile-blue",
    color: "text-blue-600",
  },
  {
    icon: BookOpen,
    label: "Gratitude Journal",
    sub: "Reflect",
    bg: "bg-tile-sand",
    color: "text-amber-700",
  },
  {
    icon: Moon,
    label: "Sleep Tips",
    sub: "Read Guide",
    bg: "bg-tile-lavender",
    color: "text-indigo-600",
  },
  {
    icon: PersonStanding,
    label: "Short Walk",
    sub: "10 min",
    bg: "bg-tile-blue",
    color: "text-teal-600",
  },
  {
    icon: Droplets,
    label: "Hydration Reminder",
    sub: "Drink water",
    bg: "bg-tile-sand",
    color: "text-cyan-600",
  },
];

export default function SelfHelpSuggestions() {
  return (
    <div className="flex flex-col gap-2" data-ocid="selfhelp.list">
      {SUGGESTIONS.map((s, i) => (
        <motion.button
          key={s.label}
          data-ocid={`selfhelp.item.${i + 1}`}
          whileHover={{ x: 3 }}
          className={`flex items-center gap-3 p-3 rounded-xl ${s.bg} hover:opacity-90 transition-opacity text-left`}
        >
          <s.icon className={`w-5 h-5 ${s.color} shrink-0`} />
          <div>
            <p className="text-sm font-semibold text-foreground">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
