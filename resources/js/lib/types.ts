export type Page = {
  id: string;
  title: string;
  excerpt: string;
  mood: string;
  likes: number;
  views: number;
  image: string;
  slug: string;
  color: string;
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