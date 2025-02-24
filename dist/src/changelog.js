'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateChangelog = generateChangelog
exports.formatChangelog = formatChangelog
var defaults_1 = require('./defaults')
/**
 * Parses commit messages and categorizes them into changelog sections.
 * @param commits - An array of commit messages.
 * @returns An object with categorized commit messages.
 */
function generateChangelog(commits) {
  var changelog = {}
  commits.forEach(function (_a) {
    var message = _a.message
    var commitType = Object.keys(defaults_1.defaultChangelogRules).find(
      function (type) {
        return message.startsWith(type)
      },
    )
    if (commitType) {
      var section = defaults_1.defaultChangelogRules[commitType].section
      if (section) {
        if (!changelog[section]) {
          changelog[section] = []
        }
        changelog[section].push(message)
      }
    }
  })
  return changelog
}
/**
 * Formats the categorized changelog into a markdown string.
 * @param changelog - The categorized changelog object.
 * @returns A formatted markdown string.
 */
function formatChangelog(changelog) {
  var formatted = ''
  Object.entries(changelog).forEach(function (_a) {
    var section = _a[0],
      messages = _a[1]
    formatted += '## '.concat(section, '\n\n')
    messages.forEach(function (msg) {
      formatted += '- '.concat(msg, '\n')
    })
    formatted += '\n'
  })
  return formatted.trim()
}
