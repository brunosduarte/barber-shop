/**
 * Serializes Prisma objects for client-side usage by converting Decimal fields to numbers
 * This is a more explicit alternative to JSON.parse(JSON.stringify())
 */
export function serializeForClient<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
