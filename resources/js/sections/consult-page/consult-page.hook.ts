import { Comment, PageDetail, ReplyType } from "@/lib/types"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export const useConsultPage = (page: PageDetail) => {
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
  const originComments: Comment[] = []

  // Initialize state from page data
  useEffect(() => {
    if (page) {
      setLikeCount(page.likes)
      setComments(originComments || [])
    }
  }, [page])

  // Scroll to comments when they're shown
  useEffect(() => {
    if (showComments && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [showComments])

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
    setCurrentImageIndex((prevIndex) => (prevIndex === page.media.length - 1 ? 0 : prevIndex + 1))
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? page.media.length - 1 : prevIndex - 1))
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
    navigator.clipboard.writeText(`https://theend.page/page/${page.slug}`)
    toast("Link copied!", {
      description: "Share it with the world.",
    })
  }

  return { 
    isPlaying,
    setIsPlaying,
    currentImageIndex,
    setCurrentImageIndex,
    liked,
    likeCount,
    commentText,
    setCommentText,
    comments, 
    showComments,
    setShowComments,
    replyingTo,
    replyText,
    setReplyText,
    commentsRef,
    handleLike,
    handleCommentLike,
    handleNextImage,
    handlePrevImage,
    handleSubmitComment,
    handleReplyClick,
    handleCancelReply,
    handleSubmitReply,
    sharePost
  }
}