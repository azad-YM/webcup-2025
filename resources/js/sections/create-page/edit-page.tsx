import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { TextEditor } from "@/components/text-editor"
import { getThemeColor } from "@/lib/utils"
import { AttachedFile, Mood, Theme } from "@/lib/types"
import { ChangeEvent, RefObject } from "react"

type Props = {
  title: string, 
  setTitle: (title: string) => void,  
  message: string,
  setMessage: (message: string) => void,
  handleAddImage: () => void,
  handleAddMusic: () => void,
  setMood: (mood: string) => void,
  mood: string,
  attachedFiles: AttachedFile[],
  handleRemoveFile: (id: string) => void,
  fileInputRef: RefObject<HTMLInputElement | null>,
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
  theme: string,
  setTheme: (theme: string) => void,
  themes: Theme[],
  togglePreview: () => void,
  handleSubmit: () => void,
  isSubmitting: boolean,
  moods: Mood[]
}

export const EditPage = ({ 
  title, 
  setTitle,  
  message,
  setMessage,
  handleAddImage,
  handleAddMusic,
  setMood,
  mood,
  attachedFiles,
  handleRemoveFile,
  fileInputRef,
  handleFileChange,
  theme,
  setTheme,
  themes,
  togglePreview,
  handleSubmit,
  isSubmitting,
  moods
}: Props) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Créez votre page d'adieu</h2>
        <p className="text-muted-foreground">Tout est sur une seule page pour faciliter la création.</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-lg">
            Titre de la page
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            Faites-le accrocheur et clair sur ce à quoi vous dites au revoir
          </p>
          <Input
            id="title"
            placeholder="ex: Adieu Twitter, Bonjour la Vraie Vie"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg py-6"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-lg">
            Votre message
          </Label>
          <p className="text-sm text-muted-foreground mb-2">Exprimez-vous librement ou restez simple</p>
          <TextEditor
            value={message}
            moods={moods}
            onChange={setMessage}
            placeholder="Écrivez votre message d'adieu..."
            onAddImage={handleAddImage}
            onAddMusic={handleAddMusic}
            onSelectMood={setMood}
            selectedMood={mood}
            attachedFiles={attachedFiles}
            onRemoveFile={handleRemoveFile}
          />
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div>
          <Label className="text-lg">Thème visuel</Label>
          <p className="text-sm text-muted-foreground mb-2">Choisissez un style pour votre page</p>
          <RadioGroup
            value={theme}
            onValueChange={setTheme}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2"
          >
            {themes.map((t) => (
              <div
                key={t.value}
                className={`border rounded-lg p-3 transition-all ${
                  theme === t.value
                    ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20"
                    : "border-muted hover:border-muted/80"
                }`}
              >
                <RadioGroupItem value={t.value} id={`theme-${t.value}`} className="sr-only" />
                <Label htmlFor={`theme-${t.value}`} className="flex flex-col items-center cursor-pointer">
                  <div className={`w-full h-12 rounded-md mb-2 ${getThemeColor(t.value)}`}></div>
                  <span className="font-medium text-sm">{t.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={togglePreview}>
            Aperçu
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !title || !message}
            className="bg-rose-500 hover:bg-rose-600 text-white"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Publication...</span>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              "Publier"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}