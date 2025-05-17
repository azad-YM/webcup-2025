"use client"

import { useState, useRef } from "react"
import {
  Plus,
  Globe,
  Search,
  ImageIcon,
  MoreHorizontal,
  Mic,
  ArrowUp,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Smile,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function TextEditor({
  value,
  onChange,
  placeholder = "Écrivez votre message d'adieu...",
  className,
}: TextEditorProps) {
  const [showFormatting, setShowFormatting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
      case "image":
        // Simulate image insertion
        alert("Fonctionnalité d'insertion d'image à implémenter")
        break
      case "emoji":
        // Emoji picker would go here
        alert("Sélecteur d'emoji à implémenter")
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

  return (
    <div className={cn("rounded-xl border bg-background shadow-sm", className)}>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[200px] border-0 focus-visible:ring-0 resize-none p-4 text-lg"
      />

      <div className="border-t p-2 flex items-center flex-wrap gap-1">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowFormatting(!showFormatting)}>
          <Plus className="h-5 w-5" />
          <span className="sr-only">Plus d'options</span>
        </Button>

        <Button variant="ghost" size="sm" className="rounded-full gap-2" onClick={() => handleButtonClick("image")}>
          <ImageIcon className="h-4 w-4" />
          <span>Ajouter des photos</span>
        </Button>
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
    </div>
  )
}
