/**
 * Calculates the average rating from an array of ratings
 */
export function calculateAverageRating(
  ratings: Array<{ rating: number }>,
): number | null {
  if (ratings.length === 0) return null

  const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0)
  return sum / ratings.length
}

/**
 * Formats a rating number to display format (e.g., 4.5 -> "4,5")
 */
export function formatRating(rating: number | null): string {
  if (rating === null) return "Novo"
  return rating.toFixed(1).replace(".", ",")
}

/**
 * Gets the display text for rating count
 */
export function getRatingCountText(count: number): string {
  if (count === 0) return "Sem avaliações"
  if (count === 1) return "1 avaliação"
  return `${count} avaliações`
}

/**
 * Validates if a rating value is within acceptable range
 */
export function isValidRating(rating: number): boolean {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5
}
