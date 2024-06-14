import {determineChild, determineElement} from './determine'
import {isElement, isFactory} from './utils'
import {handleAttrs} from './handle-attrs'

export function createElement<K extends keyof TagNameMap>(
  tagOrFactory: K,
  attrs: Partial<TagNameMap[K]>,
  ...children: Node[]
): JSX.Element<TagNameMap[K]>
export function createElement<K extends keyof TagNameMap>(
  tagOrFactory: JSX.Factory<TagNameMap[K]>,
  attrs: Partial<TagNameMap[K]>,
  ...children: Node[]
): JSX.Element<TagNameMap[K]>
export function createElement<K extends keyof TagNameMap>(
  tagOrFactory: K | JSX.Factory<TagNameMap[K]>,
  attrs: Partial<TagNameMap[K]>,
  ...children: Node[]
) {
  let component: TagNameMap[K] | null = null

  if (typeof tagOrFactory === 'string') {
    const element = determineElement(tagOrFactory)
    component = handleAttrs<K>(element, attrs ?? {}) ?? null
  } else if (isFactory(tagOrFactory)) {
    if (isElement<TagNameMap[K]>(tagOrFactory)) {
      component = new tagOrFactory(attrs)
    } else {
      component = tagOrFactory(attrs)
    }
  }

  if (component) {
    component.append(...children.flatMap(determineChild))
  }

  return component
}
