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