"use client"

import { Button } from "@/components/ui/button"
import {
  Share2,
  Home,
  X,
  MoreHorizontal,
} from "lucide-react"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link, router } from "@inertiajs/react"
import RootLayout from "@/layouts/app/app"
import { ConsultPageSection } from "@/sections/consult-page/consult-page"
import { PageDetail } from "@/lib/types"
import { pages } from "@/lib/data"


export default function PageView({ slug }: { slug: string }) {
  const page: PageDetail = { ...pages[slug as keyof typeof pages], slug, id: slug }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="mb-6">This farewell page doesn't exist or has been deleted.</p>
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getMoodStyle = (mood: string) => {
    switch (mood) {
      case "dramatic":
        return "bg-gradient-to-br from-rose-900 to-rose-600 text-white"
      case "ironic":
        return "bg-gradient-to-br from-amber-700 to-amber-500 text-white"
      case "honest":
        return "bg-gradient-to-br from-blue-900 to-blue-600 text-white"
      case "classy":
        return "bg-gradient-to-br from-purple-900 to-purple-600 text-white"
      case "absurd":
        return "bg-gradient-to-br from-green-800 to-green-500 text-white"
      case "cringe":
        return "bg-gradient-to-br from-pink-800 to-pink-500 text-white"
      case "passive-aggressive":
        return "bg-gradient-to-br from-indigo-900 to-indigo-600 text-white"
      default:
        return "bg-gradient-to-br from-gray-900 to-gray-600 text-white"
    }
  }

  const sharePost = () => {
    navigator.clipboard.writeText(`https://theend.page/page/${slug}`)
    toast("Link copied!", {
      description: "Share it with the world.",
    })
  }

  return (
    <RootLayout>
      <main className={`min-h-screen ${getMoodStyle(page.mood)}`}>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

        {/* Header with back button */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
              onClick={() => router.get("/")}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>

            <h1 className="text-lg font-medium truncate max-w-[200px] sm:max-w-none">{page.title}</h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={sharePost}>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <X className="mr-2 h-4 w-4" />
                  <span>Report</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <ConsultPageSection
          page={page}
        />
      </main>
    </RootLayout>
  )
}
