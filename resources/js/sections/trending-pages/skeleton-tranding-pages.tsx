import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTrandingPages() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="h-full overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Skeleton className="w-full h-full absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <Skeleton className="absolute top-3 right-3 h-6 w-16 rounded-md" />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-1" />
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between text-sm">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
