// Emojis pour les animations flottantes
export const emojis = ["😭", "😂", "😐", "💅", "🤪", "🫣", "😒", "👋", "💔", "👀", "🔥", "✨", "💯", "🎵"]

// Couleurs pour les particules
export const colors = [
  "bg-rose-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-indigo-500",
]

export const moods = [
  { emoji: "😭", name: "Dramatic", color: "bg-rose-500" },
  { emoji: "😂", name: "Ironic", color: "bg-amber-500" },
  { emoji: "😐", name: "Honest", color: "bg-blue-500" },
  { emoji: "💅", name: "Classy", color: "bg-purple-500" },
  { emoji: "🤪", name: "Absurd", color: "bg-green-500" },
  { emoji: "🫣", name: "Cringe", color: "bg-pink-500" },
  { emoji: "😒", name: "Passive-aggressive", color: "bg-indigo-500" },
]

export const pages = {
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
