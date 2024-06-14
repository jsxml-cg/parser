import {isWritable} from './utils'

export function handleAttrs<K extends keyof TagNameMap>(
  element: TagNameMap[K],
  attrs: Partial<TagNameMap[K]> = {}
) {
  for (const [attr, value] of Object.entries(attrs)) {
    if (!value) return

    if (!isWritable(element, attr)) {
      element.setAttribute(attr, value)
    } else {
      type A = keyof TagNameMap[K]

      if (typeof value === 'function') {
        if (attr === 'ref') {
          value(element)
        } else if (attr.startsWith('on')) {
          element[attr.toLowerCase() as A] = value
        } else {
          element[attr as A] = value
        }
      } else if (attr.startsWith('data-')) {
        Object.assign(element.dataset, {[attr]: value})
      } else if (attr === 'style') {
        Object.assign(element.style, {[attr]: value})
      } else if (element instanceof SVGElement) {
        element.setAttribute(attr, value)
      } else {
        element[attr as A] = value
      }
    }
  }

  return element
}
