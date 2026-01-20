/**
 * Date Utilities
 * 
 * Helper functions for date manipulation
 */

/**
 * Format date to string
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day);
}

/**
 * Get current date
 */
export function getCurrentDate(): string {
  return formatDate(new Date());
}

/**
 * Get date N days from now
 */
export function getDaysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

/**
 * Get date N days ago
 */
export function getDaysAgo(days: number): string {
  return getDaysFromNow(-days);
}

/**
 * Parse date string
 */
export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

/**
 * Check if date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseDate(date) : date;
  return dateObj < new Date();
}
