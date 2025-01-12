import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ellipsisMiddle = (
  str: string,
  start = 0,
  end = 7,
  limitEndChars = 8,
  separator = '...'
): string => {
  if (!str) return ''
  const stLeng = str.length
  if (stLeng <= end) return str
  if (stLeng <= limitEndChars) return `${str.substring(start, end)}${separator}`
  return `${str.substring(start, end)}${separator}${str.substring(str.length - limitEndChars, str.length)}`
}
