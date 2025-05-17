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
  Reply,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, } from "@inertiajs/react"
import { PageDetail } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useConsultPage } from "./consult-page.hook"

export const ConsultPageSection = ({ page }: { page: PageDetail }) => {
  const presenter = useConsultPage(page)
  console.log(page, "hhhe")
  return (
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
        {/* <GalerySection /> */}

        {/* Image Gallery */}
        {page.images && page.images.length > 0 && (
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <div className="aspect-[16/9] relative">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={presenter.currentImageIndex}
                  src={page.images[presenter.currentImageIndex]}
                  alt={`Image ${presenter.currentImageIndex + 1} of ${page.title}`}
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
                  onClick={presenter.handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
                  onClick={presenter.handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </Button>

                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {page.images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === presenter.currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                      }`}
                      onClick={() => presenter.setCurrentImageIndex(index)}
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
              <button onClick={() => presenter.setIsPlaying(!presenter.isPlaying)} className="flex-shrink-0">
                {presenter.isPlaying ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
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
            className={cn("flex items-center gap-2 hover:bg-white/10", presenter.liked && "text-rose-400")}
            onClick={presenter.handleLike}
          >
            <Heart className={cn("h-5 w-5", presenter.liked && "fill-current")} />
            <span>{presenter.likeCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-white/10"
            onClick={() => presenter.setShowComments(!presenter.showComments)}
          >
            <MessageCircle className="h-5 w-5" />
            <span>{presenter.comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0)}</span>
          </Button>

          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-white/10" onClick={presenter.sharePost}>
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </Button>
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {presenter.showComments && (
            <motion.div
              ref={presenter.commentsRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">
                  Comments ({presenter.comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0)})
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
                      value={presenter.commentText}
                      onChange={(e) => presenter.setCommentText(e.target.value)}
                      className="flex-1 bg-white/10 border-white/20 resize-none placeholder:text-white/50"
                    />
                    <Button
                      size="icon"
                      className="h-10 w-10 rounded-full bg-white text-black hover:bg-white/90"
                      onClick={presenter.handleSubmitComment}
                      disabled={!presenter.commentText.trim()}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send comment</span>
                    </Button>
                  </div>
                </div>

                {/* Comments list */}
                <div className="space-y-6">
                  {presenter.comments.map((comment) => (
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
                              onClick={() => presenter.handleCommentLike(comment.id)}
                            >
                              <Heart className={cn("h-3.5 w-3.5", comment.isLiked && "fill-current")} />
                              <span>{comment.likes}</span>
                            </button>
                            <span className="mx-2">•</span>
                            <button
                              className="text-white/70 hover:text-white flex items-center gap-1"
                              onClick={() => presenter.handleReplyClick(comment.id)}
                            >
                              <Reply className="h-3.5 w-3.5" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Reply form for this comment */}
                      {presenter.replyingTo?.commentId === comment.id && !presenter.replyingTo.replyId && (
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
                              value={presenter.replyText}
                              onChange={(e) => presenter.setReplyText(e.target.value)}
                              className="flex-1 bg-white/10 border-white/20 resize-none placeholder:text-white/50 text-sm min-h-[80px]"
                              autoFocus
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/70 hover:text-white hover:bg-white/10"
                                onClick={presenter.handleCancelReply}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="bg-white text-black hover:bg-white/90"
                                onClick={presenter.handleSubmitReply}
                                disabled={!presenter.replyText.trim()}
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
                                      onClick={() => presenter.handleCommentLike(comment.id, reply.id)}
                                    >
                                      <Heart className={cn("h-3 w-3", reply.isLiked && "fill-current")} />
                                      <span>{reply.likes}</span>
                                    </button>
                                    <span className="mx-2">•</span>
                                    <button
                                      className="text-white/70 hover:text-white flex items-center gap-1"
                                      onClick={() => presenter.handleReplyClick(comment.id, reply.id)}
                                    >
                                      <Reply className="h-3 w-3" />
                                      <span>Reply</span>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Reply to reply form */}
                              {presenter.replyingTo?.commentId === comment.id && presenter.replyingTo.replyId === reply.id && (
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
                                      value={presenter.replyText}
                                      onChange={(e) => presenter.setReplyText(e.target.value)}
                                      className="flex-1 bg-white/10 border-white/20 resize-none placeholder:text-white/50 text-sm min-h-[80px]"
                                      autoFocus
                                    />
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/70 hover:text-white hover:bg-white/10 text-xs h-8"
                                        onClick={presenter.handleCancelReply}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="bg-white text-black hover:bg-white/90 text-xs h-8"
                                        onClick={presenter.handleSubmitReply}
                                        disabled={!presenter.replyText.trim()}
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
  )
}