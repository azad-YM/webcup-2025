import { useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

export const useHero = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showEmojiBurst, setShowEmojiBurst] = useState(false)
  const [burstPosition, setBurstPosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()
  const [isMenuVisible, setIsMenuVisible] = useState(true)


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

  // Référence pour la section héro
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
  })

  // Référence pour détecter quand on quitte la section héro
  const [exitRef, exitInView] = useInView({
    threshold: 0.1,
  })

  // Mettre à jour la visibilité du menu en fonction de la position de défilement
  useEffect(() => {
    setIsMenuVisible(heroInView && !exitInView)
  }, [heroInView, exitInView])

  // Animation quand la section est visible
  useEffect(() => {
    if (heroInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      })
    }
  }, [controls, heroInView])
 
  interface BurstPosition {
    x: number
    y: number
  }
 // Fonction pour créer une explosion d'emojis
  interface EmojiBurstEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {}

  const createEmojiBurst = (e: EmojiBurstEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setBurstPosition({ x, y })
    setShowEmojiBurst(true)
    setClickCount(clickCount + 1)

    setTimeout(() => {
      setShowEmojiBurst(false)
    }, 1000)
  }

  return {
    testimonials,
    isHovering,
    setIsHovering,
    clickCount,
    setClickCount,
    showEmojiBurst,
    setShowEmojiBurst,
    burstPosition,
    setBurstPosition,
    controls,
    isMenuVisible,
    setIsMenuVisible,
    heroRef,
    heroInView,
    exitRef,
    exitInView,
    createEmojiBurst
  }
}