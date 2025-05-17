import { moods } from "@/lib/data"

export const useTrendingPage = () => {
  const pages = [
    {
      id: "1",
      title: "TheEnd of my Startup",
      excerpt: "After 3 years, 4 pivots, and $2M in funding, it's time to say goodbye...",
      mood: "Dramatic",
      likes: 2453,
      views: 12893,
      image: "/placeholder.svg?height=200&width=400",
      slug: "the-end-of-my-startup",
      color: "bg-rose-500",
    },
    {
      id: "2",
      title: "Bye-bye Julie",
      excerpt: "We had a good run, but your obsession with pineapple pizza was the final straw.",
      mood: "Ironic",
      likes: 1872,
      views: 9432,
      image: "/placeholder.svg?height=200&width=400",
      slug: "bye-bye-julie",
      color: "bg-amber-500",
    },
    {
      id: "3",
      title: "I quit Slack for good",
      excerpt: "No more notifications. No more @channel. No more 'quick questions'.",
      mood: "Passive-aggressive",
      likes: 3241,
      views: 15678,
      image: "/placeholder.svg?height=200&width=400",
      slug: "i-quit-slack-for-good",
      color: "bg-indigo-500",
    },
    {
      id: "4",
      title: "Farewell, Corporate America",
      excerpt: "After 10 years of TPS reports and meaningless meetings, I'm out.",
      mood: "Classy",
      likes: 1543,
      views: 7865,
      image: "/placeholder.svg?height=200&width=400",
      slug: "farewell-corporate-america",
      color: "bg-purple-500",
    },
    {
      id: "5",
      title: "So Long, Social Media",
      excerpt: "Deleting all my accounts. Find me in the real world.",
      mood: "Honest",
      likes: 2187,
      views: 11234,
      image: "/placeholder.svg?height=200&width=400",
      slug: "so-long-social-media",
      color: "bg-blue-500",
    },
    {
      id: "6",
      title: "Goodbye to My 20s",
      excerpt: "It's been wild. Hello responsible adulthood (maybe).",
      mood: "Cringe",
      likes: 1932,
      views: 8765,
      image: "/placeholder.svg?height=200&width=400",
      slug: "goodbye-to-my-20s",
      color: "bg-pink-500",
    },
  ]

  return {
    pages,
    moods
  }
}