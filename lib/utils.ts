import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sitePath(path: string) {
  return process.env.GITHUB_PAGES === 'true' ? `/Toolglass${path}` : path;
}
