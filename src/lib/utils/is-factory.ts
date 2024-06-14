export function isFactory<T>(value: unknown): value is JSX.Factory<T> {
  return typeof value === 'function'
}
