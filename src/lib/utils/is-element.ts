export function isElement<T>(value: unknown): value is JSX.Element<T> {
  return (
    typeof value === 'function' &&
    value.prototype &&
    value.prototype.constructor === value
  )
}
