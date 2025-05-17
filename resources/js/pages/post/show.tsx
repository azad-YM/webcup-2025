"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  MessageCircle,
  Share2,
  Music,
  PauseCircle,
  PlayCircle,
  Home,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
  MoreHorizontal,
  Reply,
} from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Link, router } from "@inertiajs/react"

// Types
interface ReplyType {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked?: boolean
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked?: boolean
  replies: ReplyType[]
}

// Mock data - in a real app this would come from a database
const pages = {
  "the-end-of-my-startup": {
    title: "TheEnd of my Startup",
    content:
      "After 3 years, 4 pivots, and $2M in funding, it's time to say goodbye. We tried, we failed, we learned. To my team: you were amazing. To our investors: sorry about your money. To myself: I'll be back.",
    mood: "dramatic",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    song: "The End by The Doors",
    author: {
      name: "Alex Chen",
      username: "alexchen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "May 12, 2023",
    likes: 342,
    comments: [
      {
        id: "1",
        author: {
          name: "Sarah Johnson",
          username: "sarahj",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Been there. The startup world is brutal but you'll bounce back stronger!",
        timestamp: "2 days ago",
        likes: 24,
        isLiked: false,
        replies: [
          {
            id: "1-1",
            author: {
              name: "Alex Chen",
              username: "alexchen",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "Thanks for the encouragement, Sarah. Already working on the next idea!",
            timestamp: "1 day ago",
            likes: 8,
            isLiked: false,
          },
          {
            id: "1-2",
            author: {
              name: "Venture Capitalist",
              username: "vcfund",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "Failure is just a stepping stone to success. DM me about your next venture.",
            timestamp: "1 day ago",
            likes: 5,
            isLiked: false,
          },
        ],
      },
      {
        id: "2",
        author: {
          name: "Mike Williams",
          username: "mikew",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Your transparency is refreshing. Wishing you all the best in your next venture!",
        timestamp: "1 day ago",
        likes: 18,
        isLiked: false,
        replies: [],
      },
    ],
  },
  "bye-bye-julie": {
    title: "Bye-bye Julie",
    content:
      "We had a good run, but your obsession with pineapple pizza was the final straw. I tried to look past it, I really did. But some food crimes are unforgivable. I wish you and your Hawaiian pizzas all the best. It's not you, it's your taste buds.",
    mood: "ironic",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    song: "We Are Never Ever Getting Back Together by Taylor Swift",
    author: {
      name: "Mike Johnson",
      username: "mikejohnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "April 3, 2023",
    likes: 587,
    comments: [
      {
        id: "1",
        author: {
          name: "Julie (The Ex)",
          username: "juliepizzalover",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Pineapple pizza is delicious and I stand by it! Your loss, not mine 🍍🍕",
        timestamp: "3 days ago",
        likes: 42,
        isLiked: false,
        replies: [
          {
            id: "1-1",
            author: {
              name: "Mike Johnson",
              username: "mikejohnson",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "This is exactly why we couldn't work out. Pineapple and pizza should never meet!",
            timestamp: "3 days ago",
            likes: 15,
            isLiked: false,
          },
          {
            id: "1-2",
            author: {
              name: "Pizza Chef",
              username: "pizzamaster",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "As a professional pizza chef, I must say that Hawaiian pizza is a legitimate culinary creation.",
            timestamp: "2 days ago",
            likes: 28,
            isLiked: false,
          },
        ],
      },
      {
        id: "2",
        author: {
          name: "Pizza Purist",
          username: "nopineapple",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "I'm with you on this one. Some lines shouldn't be crossed.",
        timestamp: "2 days ago",
        likes: 31,
        isLiked: false,
        replies: [],
      },
    ],
  },
  "i-quit-slack-for-good": {
    title: "I quit Slack for good",
    content:
      "No more notifications. No more @channel. No more 'quick questions'. No more 'this could have been an email'. No more green dot anxiety. No more 'sorry I was on mute'. I'm out. Email me if it's important.",
    mood: "passive-aggressive",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    song: "I Will Survive by Gloria Gaynor",
    author: {
      name: "Sarah Williams",
      username: "sarahw",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "June 21, 2023",
    likes: 1024,
    comments: [
      {
        id: "1",
        author: {
          name: "Slack Enthusiast",
          username: "slackfan",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "But how will we have our 30-message conversation about where to get lunch?",
        timestamp: "1 week ago",
        likes: 87,
        isLiked: false,
        replies: [
          {
            id: "1-1",
            author: {
              name: "Sarah Williams",
              username: "sarahw",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "That's exactly the point. Just decide and go eat!",
            timestamp: "1 week ago",
            likes: 45,
            isLiked: false,
          },
        ],
      },
      {
        id: "2",
        author: {
          name: "Email Lover",
          username: "emailrules",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Welcome back to the peaceful world of asynchronous communication!",
        timestamp: "5 days ago",
        likes: 62,
        isLiked: false,
        replies: [],
      },
    ],
  },
  "farewell-corporate-america": {
    title: "Farewell, Corporate America",
    content:
      "After 10 years of TPS reports and meaningless meetings, I'm out. I'm trading my ergonomic chair for a beach chair, my coffee mug for a coconut, and my laptop for a surfboard. Don't call me, I'll call you (I won't).",
    mood: "classy",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    song: "Take This Job and Shove It by Johnny Paycheck",
    author: {
      name: "David Miller",
      username: "davidm",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "March 15, 2023",
    likes: 753,
    comments: [
      {
        id: "1",
        author: {
          name: "Corporate Lifer",
          username: "corporatelifer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Living the dream! Send us a postcard from paradise.",
        timestamp: "2 months ago",
        likes: 45,
        isLiked: false,
        replies: [],
      },
      {
        id: "2",
        author: {
          name: "Soon To Follow",
          username: "escapeplanner",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "You're my hero. I'm 6 months away from doing the same thing!",
        timestamp: "1 month ago",
        likes: 38,
        isLiked: false,
        replies: [
          {
            id: "2-1",
            author: {
              name: "David Miller",
              username: "davidm",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "Do it! Best decision I ever made. Freedom tastes better than a promotion.",
            timestamp: "1 month ago",
            likes: 22,
            isLiked: false,
          },
        ],
      },
    ],
  },
  "so-long-social-media": {
    title: "So Long, Social Media",
    content:
      "Deleting all my accounts. Find me in the real world. I'm tired of doom scrolling, comparing my life to others, and the constant outrage. I want to read books again, have conversations without checking my phone, and remember what boredom feels like.",
    mood: "honest",
    images: ["/placeholder.svg?height=600&width=800"],
    song: "Goodbye Stranger by Supertramp",
    author: {
      name: "Emma Thompson",
      username: "emmat",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "July 7, 2023",
    likes: 892,
    comments: [
      {
        id: "1",
        author: {
          name: "Digital Detoxer",
          username: "offlineliving",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Best decision I ever made. The first week is hard, then it gets amazing.",
        timestamp: "3 weeks ago",
        likes: 56,
        isLiked: false,
        replies: [],
      },
      {
        id: "2",
        author: {
          name: "Irony Appreciator",
          username: "ironiclol",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Ironic that I'm reading your goodbye to social media... on social media.",
        timestamp: "2 weeks ago",
        likes: 104,
        isLiked: false,
        replies: [
          {
            id: "2-1",
            author: {
              name: "Emma Thompson",
              username: "emmat",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "The irony isn't lost on me. This is my last post before freedom!",
            timestamp: "2 weeks ago",
            likes: 67,
            isLiked: false,
          },
          {
            id: "2-2",
            author: {
              name: "Social Media Addict",
              username: "alwaysonline",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "You'll be back in a week. No one truly escapes.",
            timestamp: "1 week ago",
            likes: 12,
            isLiked: false,
          },
        ],
      },
    ],
  },
  "goodbye-to-my-20s": {
    title: "Goodbye to My 20s",
    content:
      "It's been wild. Hello responsible adulthood (maybe). Thanks for the memories, the hangovers, the questionable decisions, the 2am pizza, the failed relationships, the successful ones, the jobs I hated, and the friends who stayed. My 30s have big shoes to fill.",
    mood: "cringe",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    song: "22 by Taylor Swift",
    author: {
      name: "Chris Parker",
      username: "chrisp",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "August 30, 2023",
    likes: 645,
    comments: [
      {
        id: "1",
        author: {
          name: "30-Something",
          username: "30andthriving",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Welcome to the club! It actually gets better, I promise.",
        timestamp: "2 months ago",
        likes: 42,
        isLiked: false,
        replies: [
          {
            id: "1-1",
            author: {
              name: "Chris Parker",
              username: "chrisp",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "That's reassuring! Though I'll miss the reckless spontaneity a bit.",
            timestamp: "2 months ago",
            likes: 18,
            isLiked: false,
          },
        ],
      },
      {
        id: "2",
        author: {
          name: "Still In My 20s",
          username: "livingitup",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Taking notes for my own farewell in a few years!",
        timestamp: "1 month ago",
        likes: 28,
        isLiked: false,
        replies: [],
      },
    ],
  },
}

export default function PageView({ slug }: { slug: string }) {
  const page = pages[slug as keyof typeof pages]

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [showComments, setShowComments] = useState(false)
  const [replyingTo, setReplyingTo] = useState<{ commentId: string; replyId?: string } | null>(null)
  const [replyText, setReplyText] = useState("")
  const commentsRef = useRef<HTMLDivElement>(null)

  // Initialize state from page data
  useEffect(() => {
    if (page) {
      setLikeCount(page.likes)
      setComments(page.comments || [])
    }
  }, [page])

  // Scroll to comments when they're shown
  useEffect(() => {
    if (showComments && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [showComments])

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="mb-6">This farewell page doesn't exist or has been deleted.</p>
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getMoodStyle = (mood: string) => {
    switch (mood) {
      case "dramatic":
        return "bg-gradient-to-br from-rose-900 to-rose-600 text-white"
      case "ironic":
        return "bg-gradient-to-br from-amber-700 to-amber-500 text-white"
      case "honest":
        return "bg-gradient-to-br from-blue-900 to-blue-600 text-white"
      case "classy":
        return "bg-gradient-to-br from-purple-900 to-purple-600 text-white"
      case "absurd":
        return "bg-gradient-to-br from-green-800 to-green-500 text-white"
      case "cringe":
        return "bg-gradient-to-br from-pink-800 to-pink-500 text-white"
      case "passive-aggressive":
        return "bg-gradient-to-br from-indigo-900 to-indigo-600 text-white"
      default:
        return "bg-gradient-to-br from-gray-900 to-gray-600 text-white"
    }
  }

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)

    // Show toast
    toast(liked ? "Like removed" : "Post liked!", {
      description: liked ? "You've removed your like" : "Thanks for your appreciation",
      duration: 2000,
    })
  }

  const handleCommentLike = (commentId: string, replyId?: string) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (replyId) {
          // Like a reply
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === replyId) {
                  const newLikes = reply.isLiked ? reply.likes - 1 : reply.likes + 1
                  return { ...reply, likes: newLikes, isLiked: !reply.isLiked }
                }
                return reply
              }),
            }
          }
        } else {
          // Like a comment
          if (comment.id === commentId) {
            const newLikes = comment.isLiked ? comment.likes - 1 : comment.likes + 1
            return { ...comment, likes: newLikes, isLiked: !comment.isLiked }
          }
        }
        return comment
      })
    })
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === page.images.length - 1 ? 0 : prevIndex + 1))
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? page.images.length - 1 : prevIndex - 1))
  }

  const handleSubmitComment = () => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: `new-${Date.now()}`,
      author: {
        name: "You",
        username: "currentuser",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: commentText,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      replies: [],
    }

    setComments([newComment, ...comments])
    setCommentText("")

    toast("Comment added", {
      description: "Your comment has been posted",
      duration: 2000,
    })
  }

  const handleReplyClick = (commentId: string, replyId?: string) => {
    setReplyingTo({ commentId, replyId })
    setReplyText("")

    // Wait for the reply form to render, then scroll to it
    setTimeout(() => {
      const replyForm = document.getElementById(`reply-form-${commentId}${replyId ? `-${replyId}` : ""}`)
      if (replyForm) {
        replyForm.scrollIntoView({ behavior: "smooth", block: "center" })
        const textarea = replyForm.querySelector("textarea")
        if (textarea) textarea.focus()
      }
    }, 100)
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
    setReplyText("")
  }

  const handleSubmitReply = () => {
    if (!replyingTo || !replyText.trim()) return

    const newReply: ReplyType = {
      id: `reply-${Date.now()}`,
      author: {
        name: "You",
        username: "currentuser",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: replyText,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    }

    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === replyingTo.commentId) {
          if (replyingTo.replyId) {
            // Reply to a reply (we'll just add it after the reply being responded to)
            const replyIndex = comment.replies.findIndex((r) => r.id === replyingTo.replyId)
            if (replyIndex !== -1) {
              const newReplies = [...comment.replies]
              newReplies.splice(replyIndex + 1, 0, newReply)
              return { ...comment, replies: newReplies }
            }
          }
          // Reply to the main comment
          return { ...comment, replies: [...comment.replies, newReply] }
        }
        return comment
      })
    })

    setReplyingTo(null)
    setReplyText("")

    toast("Reply added", {
      description: "Your reply has been posted",
      duration: 2000,
    })
  }

  const sharePost = () => {
    navigator.clipboard.writeText(`https://theend.page/page/${slug}`)
    toast("Link copied!", {
      description: "Share it with the world.",
    })
  }

  return (
    <main className={`min-h-screen ${getMoodStyle(page.mood)}`}>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

      {/* Header with back button */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full"
            onClick={() => router.get("/")}
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Button>

          <h1 className="text-lg font-medium truncate max-w-[200px] sm:max-w-none">{page.title}</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={sharePost}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <X className="mr-2 h-4 w-4" />
                <span>Report</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Author info */}
          <div className="flex items-center mb-6">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={page.author.avatar || "/placeholder.svg"} alt={page.author.name} />
              <AvatarFallback>{page.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{page.author.name}</div>
              <div className="text-sm text-white/70">
                @{page.author.username} • {page.date}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{page.title}</h1>

          {/* Image Gallery */}
          {page.images && page.images.length > 0 && (
            <div className="relative mb-8 rounded-xl overflow-hidden">
              <div className="aspect-[16/9] relative">
                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={page.images[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1} of ${page.title}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>

              {page.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous image</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next image</span>
                  </Button>

                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {page.images.map((_, index) => (
                      <button
                        key={index}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Content */}
          <div className="text-xl mb-8 whitespace-pre-line leading-relaxed">{page.content}</div>

          {/* Music Player */}
          {page.song && (
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3 bg-black/20 rounded-full px-4 py-2">
                <button onClick={() => setIsPlaying(!isPlaying)} className="flex-shrink-0">
                  {isPlaying ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
                </button>
                <div className="flex items-center">
                  <Music className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm whitespace-nowrap">{page.song}</span>
                </div>
              </div>
            </div>
          )}

          {/* Interaction Buttons */}
          <div className="flex items-center justify-between border-t border-b border-white/20 py-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              className={cn("flex items-center gap-2 hover:bg-white/10", liked && "text-rose-400")}
              onClick={handleLike}
            >
              <Heart className={cn("h-5 w-5", liked && "fill-current")} />
              <span>{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:bg-white/10"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0)}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-white/10" onClick={sharePost}>
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                ref={commentsRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">
                    Comments ({comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0)})
                  </h2>

                  {/* Add comment form */}
                  <div className="flex gap-3 mb-6">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 bg-white/10 border-white/20 resize-none placeholder:text-white/50"
                      />
                      <Button
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white text-black hover:bg-white/90"
                        onClick={handleSubmitComment}
                        disabled={!commentText.trim()}
                      >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send comment</span>
                      </Button>
                    </div>
                  </div>

                  {/* Comments list */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-3">
                        {/* Main comment */}
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="flex justify-between items-start mb-1">
                                <div>
                                  <span className="font-medium">{comment.author.name}</span>
                                  <span className="text-xs text-white/70 ml-2">@{comment.author.username}</span>
                                </div>
                                <span className="text-xs text-white/70">{comment.timestamp}</span>
                              </div>
                              <p>{comment.content}</p>
                            </div>
                            <div className="flex items-center mt-1 ml-2 text-sm">
                              <button
                                className={`flex items-center gap-1 ${
                                  comment.isLiked ? "text-rose-400" : "text-white/70 hover:text-white"
                                }`}
                                onClick={() => handleCommentLike(comment.id)}
                              >
                                <Heart className={cn("h-3.5 w-3.5", comment.isLiked && "fill-current")} />
                                <span>{comment.likes}</span>
                              </button>
                              <span className="mx-2">•</span>
                              <button
                                className="text-white/70 hover:text-white flex items-center gap-1"
                                onClick={() => handleReplyClick(comment.id)}
                              >
                                <Reply className="h-3.5 w-3.5" />
                                <span>Reply</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Reply form for this comment */}
                        {replyingTo?.commentId === comment.id && !replyingTo.replyId && (
                          <div
                            id={`reply-form-${comment.id}`}
                            className="flex gap-3 ml-11 mt-2 animate-in fade-in slide-in-from-left-5 duration-300"
                          >
                            <Avatar className="h-7 w-7 flex-shrink-0">
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex flex-col gap-2">
                              <Textarea
                                placeholder={`Reply to ${comment.author.name}...`}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="flex-1 bg-white/10 border-white/20 resize-none placeholder:text-white/50 text-sm min-h-[80px]"
                                autoFocus
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-white/70 hover:text-white hover:bg-white/10"
                                  onClick={handleCancelReply}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-white text-black hover:bg-white/90"
                                  onClick={handleSubmitReply}
                                  disabled={!replyText.trim()}
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="ml-11 space-y-3 border-l-2 border-white/20 pl-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id}>
                                {/* Reply */}
                                <div className="flex gap-3">
                                  <Avatar className="h-7 w-7 flex-shrink-0">
                                    <AvatarImage
                                      src={reply.author.avatar || "/placeholder.svg"}
                                      alt={reply.author.name}
                                    />
                                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="bg-white/10 rounded-lg p-3">
                                      <div className="flex justify-between items-start mb-1">
                                        <div>
                                          <span className="font-medium">{reply.author.name}</span>
                                          <span className="text-xs text-white/70 ml-2">@{reply.author.username}</span>
                                        </div>
                                        <span className="text-xs text-white/70">{reply.timestamp}</span>
                                      </div>
                                      <p className="text-sm">{reply.content}</p>
                                    </div>
                                    <div className="flex items-center mt-1 ml-2 text-xs">
                                      <button
                                        className={`flex items-center gap-1 ${
                                          reply.isLiked ? "text-rose-400" : "text-white/70 hover:text-white"
                                        }`}
                                        onClick={() => handleCommentLike(comment.id, reply.id)}
                                      >
                                        <Heart className={cn("h-3 w-3", reply.isLiked && "fill-current")} />
                                        <span>{reply.likes}</span>
                                      </button>
                                      <span className="mx-2">•</span>
                                      <button
                                        className="text-white/70 hover:text-white flex items-center gap-1"
                                        onClick={() => handleReplyClick(comment.id, reply.id)}
                                      >
                                        <Reply className="h-3 w-3" />
                                        <span>Reply</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Reply to reply form */}
                                {replyingTo?.commentId === comment.id && replyingTo.replyId === reply.id && (
                                  <div
                                    id={`reply-form-${comment.id}-${reply.id}`}
                                    className="flex gap-3 ml-7 mt-2 animate-in fade-in slide-in-from-left-5 duration-300"
                                  >
                                    <Avatar className="h-6 w-6 flex-shrink-0">
                                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                                      <AvatarFallback>You</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 flex flex-col gap-2">
                                      <Textarea
                                        placeholder={`Reply to ${reply.author.name}...`}
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="flex-1 bg-white/10 border-white/20 resize-none placeholder:text-white/50 text-sm min-h-[80px]"
                                        autoFocus
                                      />
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-white/70 hover:text-white hover:bg-white/10 text-xs h-8"
                                          onClick={handleCancelReply}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          size="sm"
                                          className="bg-white text-black hover:bg-white/90 text-xs h-8"
                                          onClick={handleSubmitReply}
                                          disabled={!replyText.trim()}
                                        >
                                          Reply
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to home button */}
          <div className="flex justify-center mt-8">
            <Link href="/">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                <Home className="mr-2 h-4 w-4" />
                Back to home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <Toaster />
    </main>
  )
}
