"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "@inertiajs/react"

const trendingPages = [
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

export function TrendingPages() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trendingPages.map((page, index) => (
        <motion.div
          key={page.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link href={`/${page.slug}`} className="block h-full">
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <img
                    src={page.image || "/placeholder.svg"}
                    alt={page.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    // style={{
                    //   transform: isHovered ? "scale(1.05)" : "scale(1)",
                    // }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className={`absolute top-3 right-3 ${page.color}`}>{page.mood}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2 group-hover:text-rose-500 transition-colors">{page.title}</h3>
                <p className="text-muted-foreground">{page.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {page.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {page.views.toLocaleString()}
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
