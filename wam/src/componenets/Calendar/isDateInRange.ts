import { isAfter, isBefore } from 'date-fns'

/**
 * Checks if targetDate is between startDate and endDate (inclusive).
 * @param startDate - The start date
 * @param endDate - The end date
 * @param targetDate - The target date to check
 * @returns boolean - True if targetDate is between startDate and endDate
 */
export function isDateInRange(
  startDate: Date,
  endDate: Date,
  targetDate: Date
): boolean {
  return (
    (isAfter(targetDate, startDate) ||
      targetDate.getTime() === startDate.getTime()) &&
    (isBefore(targetDate, endDate) ||
      targetDate.getTime() === endDate.getTime())
  )
}
