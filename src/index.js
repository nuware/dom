import {
  compose
} from '@nuware/functions'

import Effect from '@nuware/effect'

export const win = Effect.of(window)
export const doc = Effect.of(document)

// qi :: String -> Effect DOMElement
export const qi = (id) => doc.map((x) => x.getElementById(id))

// qs :: String -> Effect DOMElement -> Effect DOMElement
export const qs = (selector) => (eff) => eff.map((x) => x.querySelector(selector))

// qa :: String -> Effect DOMElement -> Effect [DOMElement]
export const qa = (selector) => (eff) => eff.map((x) => Array.from(x.querySelectorAll(selector)))

// createElement :: String -> Effect DOMElement
export const createElement = (tag) => doc.map((x) => x.createElement(tag))

// createText :: String -> Effect DOMElement
export const createText = (text) => doc.map((x) => x.createTextNode(text))

// createFragment :: * -> Effect DocumentFragment
export const createFragment = () => doc.map((x) => x.createDocumentFragment())

// appendChild :: Node -> Node -> Node
export const appendChild = (child) => (node) => {
  return node.appendChild(child)
}

// removeChild :: Node -> Node -> null
export const removeChild = (child) => (node) => {
  let removed = node.removeChild(child)
  removed = null // fix memory leaks
  return removed
}

// removeChilds :: Node -> Node
export const removeChilds = (node) => {
  const cleanup = (node) => {
    while (node.hasChildNodes()) {
      cleanup(node.lastChild)
    }
    removeChild(node)(node.parentNode)
  }

  while (node.hasChildNodes()) {
    cleanup(node.lastChild)
  }

  return node
}

// replaceWith :: Node -> Node -> Node
export const replaceWith = (child) => (node) => {
  return compose(appendChild(child), removeChilds)(node)
}
