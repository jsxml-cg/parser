export function Fragment() {
  const template = document.createElement('template')
  return template.content.cloneNode(true)
}
