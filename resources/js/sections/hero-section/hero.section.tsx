"use client"

import { Button } from "@/components/ui/button"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Sparkles, Heart, X, ThumbsUp, ThumbsDown, Frown, Laugh, Music, Zap, Flame, Cloud, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { UserMenu } from "@/components/user-menu"
import { router } from "@inertiajs/react"

// Emojis pour les animations flottantes
const emojis = ["😭", "😂", "😐", "💅", "🤪", "🫣", "😒", "👋", "💔", "👀", "🔥", "✨", "💯", "🎵"]

// Couleurs pour les particules
const colors = [
  "bg-rose-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-indigo-500",
]

// Composant pour les particules flottantes
export type Props = {
  delay?: number,
  duration?: number,
  emoji?: string,
  color?: string,
  size?: string,
}

const FloatingParticle = ({ delay = 0, duration = 10, emoji, color = "", size = "small" }: Props) => {
  const randomX = Math.random() * 100
  const randomDelay = delay + Math.random() * 2
  const randomDuration = duration + Math.random() * 5
  const randomRotate = Math.random() * 360
  const randomSize = emoji
    ? Math.random() * 20 + 20
    : // taille pour emoji
      Math.random() * 10 + (size === "small" ? 5 : 15) // taille pour particule

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{
        x: `${randomX}%`,
        y: "100%",
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        y: "-100%",
        opacity: [0, 1, 1, 0],
        rotate: randomRotate,
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{ left: `${randomX}%` }}
    >
      {emoji ? (
        <div style={{ fontSize: `${randomSize}px` }}>{emoji}</div>
      ) : (
        <div
          className={cn("rounded-full", color || colors[Math.floor(Math.random() * colors.length)])}
          style={{
            width: `${randomSize}px`,
            height: `${randomSize}px`,
            filter: "blur(1px)",
          }}
        />
      )}
    </motion.div>
  )
}

// Composant pour les icônes flottantes
const FloatingIcon = ({
  icon: Icon,
  delay = 0,
  x = 0,
  y = 0,
}: {
  icon: React.ComponentType<{ size?: number }>,
  delay?: number,
  x?: number,
  y?: number,
}) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)].replace("bg-", "text-")

  return (
    <motion.div
      className={`absolute ${randomColor}`}
      initial={{ x, y, opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0],
        y: y - 100,
      }}
      transition={{
        duration: 3,
        delay,
        ease: "easeOut",
      }}
    >
      <Icon size={24} />
    </motion.div>
  )
}

// Composant pour le texte animé
const AnimatedText = ({ text, className = "" }: { text: string, className?: string}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.03,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}

export function HeroSection() {
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

  // Générer des particules
  const particles = Array.from({ length: 30 }, (_, i) => <FloatingParticle key={`particle-${i}`} delay={i * 0.2} />)

  // Générer des emojis flottants
  const floatingEmojis = Array.from({ length: 15 }, (_, i) => (
    <FloatingParticle key={`emoji-${i}`} delay={i * 0.3} emoji={emojis[Math.floor(Math.random() * emojis.length)]} />
  ))

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

  // Fonction pour créer une explosion d'emojis
  interface EmojiBurstEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {}

  interface BurstPosition {
    x: number
    y: number
  }

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

  // Icônes pour l'explosion
  const burstIcons = [Heart, X, ThumbsUp, ThumbsDown, Frown, Laugh, Music, Zap, Flame, Star, Cloud]

  return (
    <>
      {/* Menu utilisateur */}
      <UserMenu isVisible={isMenuVisible} />

      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white"
      >
        {/* Fond animé */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

        {/* Particules d'arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          {particles}
          {floatingEmojis}
        </div>

        {/* Cercles lumineux animés */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-rose-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />

        <motion.div
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
        />

        {/* Contenu principal */}
        <div className="container px-4 py-20 md:py-32 flex flex-col items-center text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={controls}>
            {/* Titre animé */}
            <div className="relative mb-4">
              <AnimatedText text="TheEnd" className="text-5xl md:text-7xl font-extrabold tracking-tight inline-block" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-rose-500 inline-block"
              >
                .
              </motion.span>
              <AnimatedText text="page" className="text-5xl md:text-7xl font-extrabold tracking-tight inline-block" />

              {/* Étoiles autour du titre */}
              <motion.div
                className="absolute -top-6 -right-6 text-yellow-400"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles size={24} />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-6 text-pink-400"
                animate={{
                  rotate: -360,
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles size={20} />
              </motion.div>
            </div>

            {/* Sous-titre avec animation de frappe */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Create a final, personalized page when you quit something — a job, a relationship, a Discord server, or
              anything else.
            </motion.p>
          </motion.div>

          {/* Bouton animé */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            onClick={createEmojiBurst}
            className="relative"
          >
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-6 text-lg rounded-full relative overflow-hidden"
              onClick={() => router.get("/create")}
            >
              <span className="relative z-10">Create my page</span>

              {/* Effet de brillance au survol */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isHovering ? "100%" : "-100%" }}
                transition={{ duration: 0.8 }}
              />
            </Button>

            {/* Explosion d'emojis au clic */}
            <AnimatePresence>
              {showEmojiBurst && (
                <>
                  {burstIcons.map((Icon, index) => (
                    <FloatingIcon
                      key={`burst-${index}-${clickCount}`}
                      icon={Icon}
                      delay={index * 0.05}
                      x={burstPosition.x - 12}
                      y={burstPosition.y - 12}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Carousel de témoignages */}
          <motion.div
            className="mt-16 w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <TestimonialCarousel />
          </motion.div>

          {/* Statistiques animées */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            {[
              { count: "10K+", label: "Farewell Pages" },
              { count: "50K+", label: "Monthly Views" },
              { count: "100+", label: "New Pages Daily" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.5 + index * 0.2, type: "spring" }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-rose-500"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: index }}
                >
                  {stat.count}
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Élément invisible pour détecter quand on quitte la section héro */}
      <div ref={exitRef} className="h-1"></div>
    </>
  )
}
