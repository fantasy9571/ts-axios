import { isDate, isPlainObject } from './util'
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  let parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializeParams = parts.join('&')
  if (serializeParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams
  }
  return url
}

interface URLOrigin {
  protocol: string
  host: string
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

export function isUrlSameOrigin(requestURL: string): boolean {
  const parseOrigin = resolveURL(requestURL)
  return parseOrigin.protocol === currentOrigin.protocol && parseOrigin.host === currentOrigin.host
}

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}
