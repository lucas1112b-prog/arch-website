import { defaultFontSize } from './layout.mjs'

function validateUnitless(value, functionName) {
  const numValue = Number.parseFloat(value)
  if (Number.isNaN(numValue)) {
    throw new Error(`Invalid value for ${functionName}: ${value}`)
  }
  if (typeof value === 'string' && /[a-zA-Z%]/.test(value.trim())) {
    throw new Error(
      `Don't use units when using the ${functionName}() function; only numbers.`
    )
  }
  return numValue
}

function evaluateExpression(expression) {
  if (typeof expression !== 'string') {
    return Number.parseFloat(expression)
  }

  const trimmed = expression.trim()

  if (trimmed.startsWith('calc(') || trimmed.includes('var(--')) {
    return trimmed
  }

  const cleaned = trimmed.replace(/\s+/g, '')

  const simpleNum = Number.parseFloat(cleaned)
  if (!Number.isNaN(simpleNum) && cleaned === String(simpleNum)) {
    return simpleNum
  }

  if (/[a-zA-Z%]/.test(cleaned)) {
    throw new Error(
      `Math expressions cannot contain units. Use calc() for CSS variables. Received: ${expression}`
    )
  }

  try {
    if (!/^[0-9+\-*/().\s]+$/.test(cleaned)) {
      throw new Error(`Invalid characters in expression: ${expression}`)
    }

    const result = Function(`"use strict"; return (${cleaned})`)()
    const numResult = Number(result)

    if (Number.isNaN(numResult) || !Number.isFinite(numResult)) {
      throw new Error(`Expression evaluated to invalid number: ${expression}`)
    }

    return numResult
  } catch (error) {
    throw new Error(
      `Failed to evaluate expression "${expression}": ${error.message}`
    )
  }
}

export const functions = {
  /**
   * Converte pixels para rem com base no font-size padrão
   * @param pixels - Valor em pixels (número sem unidade)
   * @param keepMinSize - Opcional: mantém tamanho mínimo
   * @returns String com valor em rem
   * @example rem(16) => "1rem"
   * @example rem(16, true) => "max(1rem, 16px)"
   */
  rem: (pixels, keepMinSize = false) => {
    const numPixels = validateUnitless(pixels, 'rem')
    const result = `${numPixels / defaultFontSize}rem`

    if (keepMinSize === 'true' || keepMinSize === true) {
      if (numPixels >= 0) {
        return `max(${result}, ${numPixels}px)`
      }
      return `min(${result}, ${numPixels}px)`
    }

    return result
  },

  /**
   * Ajuste responsivo com base na viewport e aspect ratio
   */
  vfit: (value, aspectRatio = 2, minSize = null, maxSize = null) => {
    const evaluatedValue = evaluateExpression(value)
    const evaluatedAspectRatio = aspectRatio
      ? evaluateExpression(aspectRatio)
      : 2

    const isValueCalc =
      typeof evaluatedValue === 'string' &&
      (evaluatedValue.includes('calc(') || evaluatedValue.includes('var(--'))
    const isAspectRatioCalc =
      typeof evaluatedAspectRatio === 'string' &&
      (evaluatedAspectRatio.includes('calc(') ||
        evaluatedAspectRatio.includes('var(--'))

    let vwValue
    let vhValue

    if (isValueCalc) {
      vwValue = `calc(${evaluatedValue} * 1vw)`
      vhValue = `calc(calc(${evaluatedValue} * 1vh) * ${evaluatedAspectRatio})`
    } else {
      vwValue = `${evaluatedValue}vw`
      vhValue = isAspectRatioCalc
        ? `calc(${evaluatedValue}vh * ${evaluatedAspectRatio})`
        : `calc(${evaluatedValue}vh * ${evaluatedAspectRatio})`
    }

    let result = `min(${vwValue}, ${vhValue})`

    if (minSize) {
      result = `max(${result}, ${minSize})`
    }

    if (maxSize) {
      result = `min(${result}, ${maxSize})`
    }

    return result
  },
}
