"use client"

import { ArrowLeft } from "lucide-react"
import { CreatePageSection } from "@/sections/create-page/create-page.section"
import RootLayout from "@/layouts/app/app"

export default function CreatePage() {
  return (
    <RootLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </button>
            <h1 className="text-xl font-bold">
              TheEnd<span className="text-rose-500">.</span>page
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </header>
        <CreatePageSection />
      </div>
    </RootLayout>
  )
}
