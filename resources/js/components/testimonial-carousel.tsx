"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Exemples de témoignages avec des situations d'adieu
const testimonials = [
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Quitting my toxic workplace",
    author: "Sarah, 32",
    quote: "After 5 years of burnout, I finally said goodbye with style.",
    mood: "Dramatic",
    color: "from-rose-900 to-rose-600",
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Breaking up with my boyfriend",
    author: "Michael, 28",
    quote: "It was time to move on. My farewell page said everything I couldn't say in person.",
    mood: "Honest",
    color: "from-blue-900 to-blue-600",
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Leaving my band after 10 years",
    author: "Alex, 35",
    quote: "Creative differences happen. My goodbye tour deserved a digital encore.",
    mood: "Classy",
    color: "from-purple-900 to-purple-600",
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Quitting social media for good",
    author: "Emma, 26",
    quote: "My last post was a link to my TheEnd page. The irony wasn't lost on anyone.",
    mood: "Ironic",
    color: "from-amber-700 to-amber-500",
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Leaving my gaming guild",
    author: "Tyler, 22",
    quote: "After 3000+ hours together, they deserved more than just going offline.",
    mood: "Passive-aggressive",
    color: "from-indigo-900 to-indigo-600",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Navigation functions
  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg">
      {/* Main carousel */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative h-full w-full">
              {/* Background image with overlay */}
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].title}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${testimonials[currentIndex].color} opacity-60 z-20`}
              />

              {/* Content */}
              <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-white p-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-2">
                    {testimonials[currentIndex].mood} Mood
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{testimonials[currentIndex].title}</h3>
                  <p className="text-lg md:text-xl max-w-2xl">"{testimonials[currentIndex].quote}"</p>
                  <p className="text-sm opacity-80">— {testimonials[currentIndex].author}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center items-center space-x-2 py-4 bg-black">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
