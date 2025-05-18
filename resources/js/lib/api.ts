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
  try {
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error("Errrooor !!! Veuillez resseyer plus tard")
    }
  } catch (error) {
    return error
  }
}

