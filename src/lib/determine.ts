import {isHTMLTag, isMathTag, isSVGTag} from './utils'

export const determineNamespace = <K extends keyof TagNameMap>(
  name: K
) => {
  if (isHTMLTag(name)) {
    return 'http://www.w3.org/1999/xhtml'
  } else if (isSVGTag(name)) {
    return 'http://www.w3.org/2000/svg'
  } else if (isMathTag(name)) {
    return 'http://www.w3.org/1998/Math/MathML'
  }
}

export const determineElement = <K extends keyof TagNameMap>(
  name: K
) => {
  const ns = determineNamespace(name)

  if (!ns) throw `Unknown element: ${name}`

  return document.createElementNS(ns, name) as TagNameMap[K]
}

export const determineChild = (child: Node) => {
  return typeof child === 'string' ? new Text(child) : child
}
