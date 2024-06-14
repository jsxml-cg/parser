export function isWritable<
  K extends keyof TagNameMap,
  A extends keyof TagNameMap[K]
>(element: TagNameMap[K], attr: A): TagNameMap[K]
export function isWritable<
  K extends keyof TagNameMap,
  A extends keyof TagNameMap[K]
>(element: TagNameMap[K], attr: PropertyKey): TagNameMap[K]
export function isWritable<
  K extends keyof TagNameMap,
  A extends keyof TagNameMap[K]
>(element: TagNameMap[K], attr: A) {
  const original = element[attr]

  try {
    const value = 'writable' as TagNameMap[K][A]
    element[attr] = value
  } catch {
    return false
  }

  element[attr] = original

  return true
}
