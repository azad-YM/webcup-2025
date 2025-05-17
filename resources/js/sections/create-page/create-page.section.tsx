
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EditPage } from "./edit-page"
import { PreviewPage } from "./preview-page"
import { Music } from "lucide-react"
import { useCreatePage } from "./create-page.hook"

export const CreatePageSection = () => {
  const presenter = useCreatePage()

  return (
    <>
      <main className="max-w-3xl mx-auto">
        <div className="container px-4 py-6">
          {presenter.previewMode 
            ? <PreviewPage
                togglePreview={presenter.togglePreview}
                theme={presenter.theme}
                title={presenter.title}
                attachedFiles={presenter.attachedFiles}
                message={presenter.message}
                selectedSong={presenter.selectedSong}
                handleSubmit={presenter.handleSubmit}
                isSubmitting={presenter.isSubmitting}
              />
            : <EditPage 
                title={presenter.title}
                moods={presenter.moods}
                setTitle={presenter.setTitle}
                message={presenter.message}
                setMessage={presenter.setMessage}
                mood={presenter.mood}
                setMood={presenter.setMood}
                theme={presenter.theme}
                setTheme={presenter.setTheme}
                attachedFiles={presenter.attachedFiles}
                isSubmitting={presenter.isSubmitting}
                fileInputRef={presenter.fileInputRef}
                togglePreview={presenter.togglePreview}
                handleAddImage={presenter.handleAddImage}
                handleAddMusic={presenter.handleAddMusic}
                handleRemoveFile={presenter.handleRemoveFile}
                handleFileChange={presenter.handleFileChange}
                themes={presenter.themes}
                handleSubmit={presenter.handleSubmit}
              />
          }
        </div>
      </main>

      {/* Music Selection Dialog */}
      <Dialog open={presenter.showMusicDialog} onOpenChange={presenter.setShowMusicDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choisir une musique</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <RadioGroup value={presenter.selectedSong || ""} onValueChange={presenter.handleSelectMusic} className="space-y-2 p-1">
              {presenter.mockSongs.map((song, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                    presenter.selectedSong === song.title
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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}