const kebabCase = require('lodash/kebabCase')

module.exports = tag => `/tag/${kebabCase(tag)}/`
