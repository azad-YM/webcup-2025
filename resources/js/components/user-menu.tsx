"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogIn, LogOut, Settings, User } from "lucide-react"
import { motion } from "framer-motion"

interface UserMenuProps {
  isVisible: boolean
}

export function UserMenu({ isVisible }: UserMenuProps) {
  // État simulant la connexion de l'utilisateur (à remplacer par votre logique d'authentification)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Fonction de connexion/déconnexion (à remplacer par votre logique d'authentification)
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <motion.div
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -20,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center space-y-4 bg-black/30 backdrop-blur-sm p-4 rounded-2xl">
        {isLoggedIn ? (
          <>
            {/* Avatar utilisateur */}
            <div className="flex flex-col items-center">
              <Avatar className="h-12 w-12 border-2 border-rose-500">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-rose-500 text-white">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-white">User Name</p>
                <p className="text-xs text-white/70">user@example.com</p>
              </div>
            </div>

            {/* Séparateur */}
            <div className="w-full h-px bg-white/20" />

            {/* Options de menu */}
            <div className="flex flex-col items-center w-full space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-white hover:bg-white/10">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Button>

              <Button variant="ghost" size="sm" className="w-full justify-start text-white hover:bg-white/10">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Button>

              <div className="w-full h-px bg-white/20" />

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-white hover:bg-white/10"
                onClick={toggleLogin}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </>
        ) : (
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 flex items-center space-x-2"
            onClick={toggleLogin}
          >
            <LogIn className="h-5 w-5" />
            <span>Log in</span>
          </Button>
        )}
      </div>
    </motion.div>
  )
}
