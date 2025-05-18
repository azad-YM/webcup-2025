"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "@inertiajs/react"
import { MoodSelector } from "./mood-selector"
import { Page } from "@/lib/types"
import { useTrendingPage } from "./trending-pages.hook"
import { SkeletonTrandingPages } from "./skeleton-tranding-pages"

export function TrendingPages() {
  const presenter = useTrendingPage()
  
  return (
    <div className='md:w-[80%] mx-auto'>
      <section className="container px-4 py-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Choose a mood</h2>
        <MoodSelector moods={presenter.moods} />
      </section>
      <section className="container px-4 py-8 md:py-8">
        <div className="flex items-center justify-between mb-6">
          <select className="bg-background border rounded-md px-3 py-1 text-sm">
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Most Dramatic</option>
          </select>
        </div>
        {presenter.isPending 
          ? <SkeletonTrandingPages />
          : <ShowedTrendingPages 
              trendingPages={presenter.pages}
            />
        }
      </section>
    </div>
  )
}

const ShowedTrendingPages = ({ trendingPages }: { trendingPages: Page[] }) => {
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