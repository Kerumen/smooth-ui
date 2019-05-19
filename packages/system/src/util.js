/* eslint-disable no-console */
import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.

const __DEV__ = process.env.NODE_ENV !== 'production'

export const is = n => n !== undefined && n !== null
export const num = n => typeof n === 'number' && !Number.isNaN(n)
export const string = n => typeof n === 'string' && n !== ''
export const obj = n => typeof n === 'object' && n !== null
export const func = n => typeof n === 'function'
export const negative = n => num(n) && n < 0

export const get = (from, path) => {
  const paths = String(path).split('.')
  const pathsLength = paths.length
  let result = from
  for (let i = 0; i < pathsLength; i += 1) {
    if (result === undefined) return result
    const path = paths[i]
    result = is(result[path]) ? result[path] : undefined
  }
  return result
}

export const merge = (acc, item) => {
  if (!is(item)) {
    return acc
  }

  // No need to clone deep, it's way faster.
  return deepmerge(acc, item, { clone: false })
}

export const warn = (condition, message) => {
  if (__DEV__) {
    if (!condition && console.error) {
      console.error(message)
    }
  }
}

export const flat = array => {
  const flattend = []
  function innerFlat(array) {
    const arrayLength = array.length
    for (let i = 0; i < arrayLength; i += 1) {
      const el = array[i]
      if (Array.isArray(el)) {
        innerFlat(el)
      } else {
        flattend.push(el)
      }
    }
  }

  innerFlat(array)
  return flattend
}

export const cascade = (fn, ...args) => {
  if (!func(fn)) return fn
  const next = fn(...args)
  return cascade(next, ...args)
}

export const getThemeValue = (props, path, initial = props.theme) =>
  cascade(get(initial, path), props)
