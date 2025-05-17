
export const getPages = async () => {
  const res = await fetch('/api/pages')
  return await res.json()
}