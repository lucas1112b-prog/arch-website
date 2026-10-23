import { functions } from './src/styles/postcss-functions.mjs'

/**
 * @type {import('postcss-preset-env').pluginOptions}
 */
const presetEnvConfig = {
  autoprefixer: {
    flexbox: 'no-2009',
  },
  stage: 3,
  features: {
    'custom-properties': false,
    'custom-media-queries': true,
    'nesting-rules': true,
  },
}

/**
 * @type {import('@csstools/postcss-global-data').pluginOptions}
 */
const globalDataConfig = {
  files: ['./src/styles/breakpoints.css'],
}

const postcssConfig = {
  plugins: {
    '@csstools/postcss-global-data': globalDataConfig,
    'postcss-functions': { functions },
    'postcss-preset-env': presetEnvConfig,
  },
}

export default postcssConfig
