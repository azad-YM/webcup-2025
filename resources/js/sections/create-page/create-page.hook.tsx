import { getMoods } from "@/lib/api"
import { AttachedFile } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { toast } from "sonner"

export const useCreatePage = () => {

  const [mood, setMood] = useState("dramatic")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [theme, setTheme] = useState("minimal")
  const [selectedSong, setSelectedSong] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMusicDialog, setShowMusicDialog] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const moods = [
    { value: "dramatic", label: "😭 Dramatic", color: "bg-rose-500" },
    { value: "ironic", label: "😂 Ironic", color: "bg-amber-500" },
    { value: "honest", label: "😐 Honest", color: "bg-blue-500" },
    { value: "classy", label: "💅 Classy", color: "bg-purple-500" },
    { value: "absurd", label: "🤪 Absurd", color: "bg-green-500" },
    { value: "cringe", label: "🫣 Cringe", color: "bg-pink-500" },
    { value: "passive-aggressive", label: "😒 Passive-aggressive", color: "bg-indigo-500" },
  ]

  const queryMoods = useQuery({ queryKey: ['moods'], queryFn: getMoods })

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

  const handleSubmit = () => {
    if (!title || !message) {
      toast.error("Veuillez remplir tous les champs obligatoires", {
        description: "Le titre et le message sont requis.",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Page créée avec succès !", {
        description: "Votre page d'adieu est maintenant en ligne.",
      })

      setIsSubmitting(false)
    }, 1500)
  }

  const togglePreview = () => {
    setPreviewMode(!previewMode)
    window.scrollTo(0, 0)
  }

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Process each selected file
    Array.from(files).forEach((file) => {
      // Create a URL for the file
      const fileUrl = URL.createObjectURL(file)

      // Add to attached files
      setAttachedFiles((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "image",
          name: file.name,
          url: fileUrl,
        },
      ])
    })

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddMusic = () => {
    setShowMusicDialog(true)
  }

  const handleSelectMusic = (title: string) => {
    setSelectedSong(title)

    // Find the song details
    const song = mockSongs.find((s) => s.title === title)
    if (song) {
      // Add to attached files
      setAttachedFiles((prev) => [
        ...prev.filter((f) => f.type !== "music"), // Remove any existing music
        {
          id: crypto.randomUUID(),
          type: "music",
          name: `${song.title} - ${song.artist}`,
          url: "", // No URL for mock songs
        },
      ])
    }

    setShowMusicDialog(false)
  }

  const handleRemoveFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== id))

    // If it was a music file, also clear the selected song
    const removedFile = attachedFiles.find((file) => file.id === id)
    if (removedFile?.type === "music") {
      setSelectedSong(null)
    }
  }

  return {
    mood,
    setMood,
    title, 
    setTitle,
    message,
    theme,
    setTheme,
    selectedSong,
    setMessage,
    isSubmitting,
    showMusicDialog,
    setShowMusicDialog,
    previewMode,
    attachedFiles,
    fileInputRef,
    themes,
    mockSongs,
    handleSelectMusic,
    handleSubmit,
    togglePreview,
    handleAddImage,
    handleFileChange,
    handleAddMusic,
    handleRemoveFile,
    moods: queryMoods.data ?? []
  }
}