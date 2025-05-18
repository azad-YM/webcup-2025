import { AttachedFile } from "./types"

export const getPages = async () => {
  const res = await fetch('/api/pages')
  return await res.json()
}

export const getMoods = async () => {
  const res = await fetch('/api/moods')
  return await res.json()
}

export const postPage = async (data: {
  title: string,
  message: string,
  theme: string,
  mood: string,
  attachedFiles: AttachedFile[]
}) => {
  const formData = new FormData()

  formData.append('title', data.title)
  formData.append('message', data.message)
  formData.append('theme', data.theme)
  formData.append('mood', data.mood)

  data.attachedFiles.forEach((attachedFile, index) => {
    // Assuming AttachedFile has a property 'file' of type File
    if (attachedFile.file instanceof File) {
      formData.append('attachedFiles[]', attachedFile.file)
    }
  })
  
  try {
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message ?? "Errrooor !!! Veuillez resseyer plus tard")
    }
  } catch (error) {
    return error
  }
}

