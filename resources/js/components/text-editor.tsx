"use client"

import { useState, useRef } from "react"
import {
  Plus,
  ImageIcon,
  Music,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  Check,
  X,
  FileText,
  LayoutList,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Mood } from "@/lib/types"

interface TextEditorProps {
  value: string
  moods: Mood[],
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  onAddImage?: () => void
  onAddMusic?: () => void
  onSelectMood?: (mood: string) => void
  selectedMood?: string
  attachedFiles: Array<{
    id: string
    type: "image" | "music"
    name: string
    url: string
  }>
  onRemoveFile: (id: string) => void
}

export function TextEditor({
  value,
  onChange,
  moods,
  placeholder = "Écrivez votre message d'adieu...",
  className,
  onAddImage,
  onAddMusic,
  onSelectMood,
  selectedMood = "dramatic",
  attachedFiles,
  onRemoveFile,
}: TextEditorProps) {
  const [showFormatting, setShowFormatting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleButtonClick = (action: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let newText = value
    let newCursorPos = end

    switch (action) {
      case "bold":
        newText = value.substring(0, start) + `**${selectedText}**` + value.substring(end)
        newCursorPos = end + 4
        break
      case "italic":
        newText = value.substring(0, start) + `*${selectedText}*` + value.substring(end)
        newCursorPos = end + 2
        break
      case "link":
        newText = value.substring(0, start) + `[${selectedText}](url)` + value.substring(end)
        newCursorPos = end + 7
        break
      case "list":
        newText = value.substring(0, start) + `\n- ${selectedText}` + value.substring(end)
        newCursorPos = end + 3
        break
      case "ordered-list":
        newText = value.substring(0, start) + `\n1. ${selectedText}` + value.substring(end)
        newCursorPos = end + 4
        break
      default:
        break
    }

    onChange(newText)

    // Set cursor position after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  const selectedMoodObj = moods.find((m) => m.name === selectedMood)

  return (
    <div className={cn("rounded-xl border bg-background shadow-sm", className)}>
      {/* Attached files */}
      {attachedFiles.length > 0 && (
        <div className="flex gap-1 p-3 border-b">
          {attachedFiles.map((file) => (
            <div key={file.id} className="flex items-center gap-2 p-2 border rounded-lg mb-2">
              <div className="flex-shrink-0">
                {file.type === "image" ? (
                  <div
                    className="w-12 h-12 rounded bg-muted flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={() => setPreviewImage(file.url)}
                  >
                    <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                    <Music className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.type === "image" ? "Image" : "Musique"}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => onRemoveFile(file.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Supprimer</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[200px] border-0 focus-visible:ring-0 resize-none p-4 text-lg"
      />

      <div className="border-t p-2 flex items-center flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full border">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Plus d'options</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="start">
            <div className="grid gap-1">
              <Button variant="ghost" size="sm" className="justify-start" onClick={onAddImage}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Ajouter des photos
              </Button>
              <Button variant="ghost" size="sm" className="justify-start" onClick={onAddMusic}>
                <Music className="mr-2 h-4 w-4" />
                Ajouter une musique
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="icon" className="rounded-full border" onClick={() => setShowFormatting(!showFormatting)}>
          <LayoutList className="h-5 w-5" />
          <span className="sr-only">Mise en forme</span>
        </Button>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full gap-2 border">
                {selectedMoodObj ? (
                  <>
                    <span>{selectedMoodObj.emoji}</span>
                    <span className="hidden sm:inline">{selectedMoodObj.name}</span>
                  </>
                ) : (
                  "Choisir un mood"
                )}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {moods.map((mood) => (
                <DropdownMenuItem
                  key={mood.name}
                  onClick={() => onSelectMood && onSelectMood(mood.name)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="mr-2">{mood.emoji}</span>
                    <span>{mood.name}</span>
                  </div>
                  {selectedMood === mood.name && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showFormatting && (
        <div className="border-t p-2 flex items-center gap-1 flex-wrap">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleButtonClick("bold")}>
            <Bold className="h-4 w-4" />
            <span className="sr-only">Gras</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleButtonClick("italic")}>
            <Italic className="h-4 w-4" />
            <span className="sr-only">Italique</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleButtonClick("link")}>
            <Link className="h-4 w-4" />
            <span className="sr-only">Lien</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleButtonClick("list")}>
            <List className="h-4 w-4" />
            <span className="sr-only">Liste à puces</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleButtonClick("ordered-list")}>
            <ListOrdered className="h-4 w-4" />
            <span className="sr-only">Liste numérotée</span>
          </Button>
          <div className="h-5 w-px bg-border mx-1"></div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <AlignLeft className="h-4 w-4" />
            <span className="sr-only">Aligner à gauche</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <AlignCenter className="h-4 w-4" />
            <span className="sr-only">Centrer</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <AlignRight className="h-4 w-4" />
            <span className="sr-only">Aligner à droite</span>
          </Button>
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="sm:max-w-lg p-1">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => setPreviewImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            {previewImage && (
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Aperçu"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
