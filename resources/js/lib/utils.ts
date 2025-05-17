import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getMoodStyle = (color: string) => {
    const [base, _] = color.split('-') // on prend "red" depuis "red-500"
    console.log(color, base)
    return `bg-gradient-to-br from-${base}-900 to-${base}-600 text-white`
}

export function getThemeBackground(theme: string): string {
  switch (theme) {
    case "minimal":
      return "bg-gradient-to-br from-gray-900 to-gray-600"
    case "dramatic":
      return "bg-gradient-to-br from-rose-900 to-rose-600"
    case "retro":
      return "bg-gradient-to-br from-amber-700 to-amber-500"
    case "neon":
      return "bg-gradient-to-br from-blue-900 to-blue-600 via-purple-800"
    case "elegant":
      return "bg-gradient-to-br from-purple-900 to-purple-600"
    default:
      return "bg-gradient-to-br from-gray-900 to-gray-600"
  }
}

export function getThemeColor(theme: string): string {
  switch (theme) {
    case "minimal":
      return "bg-gradient-to-r from-gray-200 to-gray-300"
    case "dramatic":
      return "bg-gradient-to-r from-rose-500 to-rose-600"
    case "retro":
      return "bg-gradient-to-r from-amber-400 to-amber-500"
    case "neon":
      return "bg-gradient-to-r from-green-400 to-blue-500"
    case "elegant":
      return "bg-gradient-to-r from-purple-400 to-purple-600"
    default:
      return "bg-gradient-to-r from-gray-200 to-gray-300"
  }
}

export function formatMessage(message: string): string {
  // Simple markdown-like formatting
  const formattedMessage = message
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="underline">$1</a>')
    .replace(/\n- (.*)/g, "<ul><li>$1</li></ul>")
    .replace(/\n(\d+)\. (.*)/g, "<ol><li>$2</li></ol>")
    .replace(/\n/g, "<br />")

  return formattedMessage
}