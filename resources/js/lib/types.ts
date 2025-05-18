export type Page = {
  id: string;
  title: string;
  excerpt: string;
  mood: string;
  moodColor: string,
  likes: number;
  views: number;
  image: string;
  slug: string;
  theme: string;

}

export type PageDetail = {
  content: string,
  images: Array<string>,
  song: string,
  author: Author,
  date: string,
} & Page

export type Author = {
  name: string,
  username: string,
  avatar: string
}

export type ReplyType = {
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

export  type Comment = {
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

export type Testimonial = {
  image: string;
  title: string;
  author: string;
  quote: string;
  mood: string;
  color: string;
}

export type Mood = {
  emoji: string;
  name: string;
  color: string;
}

export type AttachedFile = {
  id: string
  type: "image" | "music"
  name: string
  url: string
}

export type Theme = {
  value: string,
  label: string
}