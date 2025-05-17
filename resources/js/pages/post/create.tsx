"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search, Music, ArrowLeft, Check, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { TextEditor } from "@/components/text-editor"
import { router } from "@inertiajs/react"
import RootLayout from "@/layouts/app/app"

const moods = [
  { value: "dramatic", label: "😭 Dramatic", color: "bg-rose-500" },
  { value: "ironic", label: "😂 Ironic", color: "bg-amber-500" },
  { value: "honest", label: "😐 Honest", color: "bg-blue-500" },
  { value: "classy", label: "💅 Classy", color: "bg-purple-500" },
  { value: "absurd", label: "🤪 Absurd", color: "bg-green-500" },
  { value: "cringe", label: "🫣 Cringe", color: "bg-pink-500" },
  { value: "passive-aggressive", label: "😒 Passive-aggressive", color: "bg-indigo-500" },
]

const themes = [
  { value: "minimal", label: "Minimal" },
  { value: "dramatic", label: "Dramatic" },
  { value: "retro", label: "Retro" },
  { value: "neon", label: "Neon" },
  { value: "elegant", label: "Elegant" },
]

const mockSongs = [
  { title: "It's All Over Now", artist: "The Rolling Stones" },
  { title: "The End", artist: "The Doors" },
  { title: "Goodbye My Lover", artist: "James Blunt" },
  { title: "Don't Speak", artist: "No Doubt" },
  { title: "I Will Survive", artist: "Gloria Gaynor" },
]

export default function CreatePage() {
  const [mood, setMood] = useState("dramatic")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [theme, setTheme] = useState("minimal")
  const [selectedSong, setSelectedSong] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Generate a slug from the title if no custom URL
      toast("Page created successfully!", {
        description: "Your farewell page is now live.",
      })

      setIsSubmitting(false)
    }, 1500)
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <RootLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => router.get("/")}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </button>
            <h1 className="text-xl font-bold">
              TheEnd<span className="text-rose-500">.</span>page
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </header>
        <main className="max-w-5xl mx-auto">
          {/* Progress bar */}
          <div className="container px-4 py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of 3</span>
              <span className="text-sm text-muted-foreground">
                {currentStep === 1 ? "Basic Info" : currentStep === 2 ? "Customize" : "Preview & Publish"}
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="container px-4 py-6">
            <div className="">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Create Your Farewell Page</h2>
                    <p className="text-muted-foreground">Let's start with the basics. What are you saying goodbye to?</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="title" className="text-lg">
                        Page Title
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Make it catchy and clear what you're leaving behind
                      </p>
                      <Input
                        id="title"
                        placeholder="e.g. Goodbye Twitter, Hello Real Life"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-lg py-6"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mood" className="text-lg">
                        Select Mood
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">How do you feel about this farewell?</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                        {moods.map((m) => (
                          <button
                            key={m.value}
                            onClick={() => setMood(() => m.value)}
                            className={`flex items-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                              mood === m.value
                                ? `border-${m.color.split("-")[1]}-500 bg-${m.color.split("-")[1]}-50 dark:bg-${m.color.split("-")[1]}-950/20`
                                : "border-muted bg-background"
                            }`}
                          >
                            <span className="text-2xl">{m.label.split(" ")[0]}</span>
                            <span className="font-medium">{m.label.split(" ")[1]}</span>
                            {mood === m.value && <Check className="ml-auto h-4 w-4 text-rose-500" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-lg">
                        Your Message
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">Pour your heart out or keep it simple</p>
                      <TextEditor value={message} onChange={setMessage} placeholder="Écrivez votre message d'adieu..." />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={nextStep}
                      size="lg"
                      disabled={!title || !message}
                      className="bg-rose-500 hover:bg-rose-600 text-white"
                    >
                      Continuer
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Customize */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Customize Your Page</h2>
                    <p className="text-muted-foreground">Make it uniquely yours with visuals, music, and style</p>
                  </div>

                  <Tabs defaultValue="music" className="space-y-6">
                    <TabsList className="grid grid-cols-3 w-full max-w-lg">
                      <TabsTrigger value="music">Music</TabsTrigger>
                      <TabsTrigger value="theme">Theme</TabsTrigger>
                    </TabsList>

                    <TabsContent value="music" className="space-y-4">
                      <p className="text-muted-foreground">Add background music to set the mood</p>
                      <RadioGroup value={selectedSong || ""} onValueChange={setSelectedSong} className="space-y-2">
                        {mockSongs.map((song, index) => (
                          <div
                            key={index}
                            className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                              selectedSong === song.title
                                ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20"
                                : "border-muted hover:border-muted/80"
                            }`}
                          >
                            <RadioGroupItem value={song.title} id={`song-${index}`} className="text-rose-500" />
                            <Label htmlFor={`song-${index}`} className="flex-1 cursor-pointer">
                              <div className="font-medium">{song.title}</div>
                              <div className="text-sm text-muted-foreground">{song.artist}</div>
                            </Label>
                            <Music className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                      </RadioGroup>
                    </TabsContent>

                    <TabsContent value="theme" className="space-y-4">
                      <p className="text-muted-foreground">Choose a visual theme for your page</p>
                      <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {themes.map((t) => (
                          <div
                            key={t.value}
                            className={`border rounded-lg p-4 transition-all ${
                              theme === t.value
                                ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20"
                                : "border-muted hover:border-muted/80"
                            }`}
                          >
                            <RadioGroupItem value={t.value} id={`theme-${t.value}`} className="sr-only" />
                            <Label htmlFor={`theme-${t.value}`} className="flex flex-col items-center cursor-pointer">
                              <div className={`w-full h-16 rounded-md mb-3 ${getMoodColor(t.value)}`}></div>
                              <span className="font-medium">{t.label}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </TabsContent>
                  </Tabs>
                  <div className="flex justify-between">
                    <Button onClick={prevStep} variant="outline" size="lg">
                      Back
                    </Button>
                    <Button onClick={nextStep} size="lg" className="bg-rose-500 hover:bg-rose-600 text-white">
                      Continue to Preview
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Preview & Publish */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Preview & Publish</h2>
                    <p className="text-muted-foreground">Here's how your farewell page will look</p>
                  </div>

                  <div className={`rounded-xl overflow-hidden border shadow-lg ${getMoodBackground(mood)}`}>
                    <div className="p-8 md:p-12 text-white">
                      <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">{title}</h3>

                        

                        <div
                          className="text-xl mb-8 whitespace-pre-line leading-relaxed prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
                        ></div>

                        {selectedSong && (
                          <div className="flex items-center justify-center space-x-2 mb-8 bg-white/10 rounded-full px-4 py-2 w-fit mx-auto">
                            <Music className="h-4 w-4" />
                            <span>{selectedSong}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button onClick={prevStep} variant="outline" size="lg">
                      Back to Customize
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      disabled={isSubmitting}
                      className="bg-rose-500 hover:bg-rose-600 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Publishing...</span>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Publish My Farewell Page
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </RootLayout>
  )
}

function getMoodBackground(mood: string): string {
  switch (mood) {
    case "dramatic":
      return "bg-gradient-to-br from-rose-900 to-rose-600"
    case "ironic":
      return "bg-gradient-to-br from-amber-700 to-amber-500"
    case "honest":
      return "bg-gradient-to-br from-blue-900 to-blue-600"
    case "classy":
      return "bg-gradient-to-br from-purple-900 to-purple-600"
    case "absurd":
      return "bg-gradient-to-br from-green-800 to-green-500"
    case "cringe":
      return "bg-gradient-to-br from-pink-800 to-pink-500"
    case "passive-aggressive":
      return "bg-gradient-to-br from-indigo-900 to-indigo-600"
    default:
      return "bg-gradient-to-br from-gray-900 to-gray-600"
  }
}

function getMoodColor(theme: string): string {
  switch (theme) {
    case "minimal":
      return "bg-gradient-to-r from-gray-200 to-gray-300"
    case "dramatic":
      return "bg-gradient-to-r from-rose-500 to-rose-600"
    case "retro":
      return "bg-gradient-to-r from-amber-400 to-amber-500"
    case "neon":
      return "bg-gradient-to-r from-green-400 to-blue-500"
    case "elegant":
      return "bg-gradient-to-r from-purple-400 to-purple-600"
    default:
      return "bg-gradient-to-r from-gray-200 to-gray-300"
  }
}

function formatMessage(message: string): string {
  // Simple markdown-like formatting
  const formattedMessage = message
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="underline">$1</a>')
    .replace(/\n- (.*)/g, "<ul><li>$1</li></ul>")
    .replace(/\n(\d+)\. (.*)/g, "<ol><li>$2</li></ol>")
    .replace(/\n/g, "<br />")

  return formattedMessage
}
