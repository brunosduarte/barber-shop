export const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
] as const

export type BookingTime = (typeof TIME_LIST)[number]

// Rating system constants
export const RATING_STARS = [1, 2, 3, 4, 5] as const
export const MIN_RATING = 1
export const MAX_RATING = 5

export type RatingValue = (typeof RATING_STARS)[number]
