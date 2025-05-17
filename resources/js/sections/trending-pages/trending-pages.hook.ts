import { getPages } from "@/lib/api"
import { moods } from "@/lib/data"
import { useQuery } from "@tanstack/react-query"

export const useTrendingPage = () => {
  const query = useQuery({ queryKey: ['pages'], queryFn: getPages })
  return {
    pages: query.data?.data ?? [],
    isPending: query.isPending,
    moods
  }
}