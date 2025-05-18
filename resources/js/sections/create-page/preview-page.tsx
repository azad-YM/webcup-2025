import { Button } from "@/components/ui/button"
import { AttachedFile } from "@/lib/types"
import { formatMessage, getThemeBackground } from "@/lib/utils"
import { Music, Sparkles } from "lucide-react"

type Props = {
  togglePreview: () => void,
  theme: string,
  title: string,
  attachedFiles: AttachedFile[],
  selectedSong: string|null,
  message: string,
  handleSubmit: () => void,
  createPageIsPending: boolean
}

export const PreviewPage = ({
  togglePreview,
  theme,
  title,
  attachedFiles,
  selectedSong,
  message,
  handleSubmit,
  createPageIsPending
}: Props) => {

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Aperçu</h2>
        <Button variant="outline" onClick={togglePreview}>
          Retour à l'édition
        </Button>
      </div>

      <div className={`rounded-xl overflow-hidden border shadow-lg ${getThemeBackground(theme)}`}>
        <div className="p-8 md:p-12 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">{title}</h3>

            {/* Display attached images in preview */}
            {attachedFiles.filter((f) => f.type === "image").length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {attachedFiles
                  .filter((f) => f.type === "image")
                  .map((file) => (
                    <div key={file.id} className="w-24 h-24 rounded overflow-hidden">
                      <img
                        src={file.url || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            )}

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

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={createPageIsPending}
          className="bg-rose-500 hover:bg-rose-600 text-white"
        >
          {createPageIsPending ? (
            <>
              <span className="mr-2">Publication...</span>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Publier ma page d'adieu
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
