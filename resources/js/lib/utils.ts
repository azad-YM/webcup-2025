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