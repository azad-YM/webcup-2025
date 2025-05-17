
export const getPages = async () => {
  const res = await fetch('/api/pages')
  return await res.json()
}

export const getMoods = async () => {
  const res = await fetch('/api/moods')
  return await res.json()
}