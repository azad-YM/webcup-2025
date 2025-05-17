"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const moods = [
  { emoji: "😭", name: "Dramatic", color: "bg-rose-500" },
  { emoji: "😂", name: "Ironic", color: "bg-amber-500" },
  { emoji: "😐", name: "Honest", color: "bg-blue-500" },
  { emoji: "💅", name: "Classy", color: "bg-purple-500" },
  { emoji: "🤪", name: "Absurd", color: "bg-green-500" },
  { emoji: "🫣", name: "Cringe", color: "bg-pink-500" },
  { emoji: "😒", name: "Passive-aggressive", color: "bg-indigo-500" },
]

export function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex space-x-3 min-w-max">
        {moods.map((mood) => (
          <motion.button
            key={mood.name}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood(mood.name === selectedMood ? null : mood.name)}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-full transition-colors",
              selectedMood === mood.name ? `${mood.color} text-white` : "bg-muted hover:bg-muted/80",
            )}
          >
            <span className="text-xl">{mood.emoji}</span>
            <span className="font-medium">{mood.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
