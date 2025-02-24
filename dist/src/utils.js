'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.debugLog = debugLog
exports.formatVersion = formatVersion
exports.getBranchName = getBranchName
exports.isPullRequest = isPullRequest
var core = require('@actions/core')
/**
 * Logs a debug message if debugging is enabled.
 * @param message - The message to log.
 */
function debugLog(message) {
  core.debug(message)
}
/**
 * Ensures a string is a valid semantic version, returning a formatted version.
 * @param version - The version string to validate.
 * @param prefix - The optional prefix to include (e.g., 'v').
 * @returns A formatted version string.
 */
function formatVersion(version, prefix) {
  if (prefix === void 0) {
    prefix = 'v'
  }
  return version.startsWith(prefix)
    ? version
    : ''.concat(prefix).concat(version)
}
/**
 * Extracts the branch name from a Git reference.
 * @param ref - The full Git reference string (e.g., 'refs/heads/main').
 * @returns The extracted branch name.
 */
function getBranchName(ref) {
  return ref.replace('refs/heads/', '')
}
/**
 * Checks if a given Git reference corresponds to a pull request.
 * @param ref - The full Git reference string.
 * @returns True if the reference is a pull request, false otherwise.
 */
function isPullRequest(ref) {
  return ref.includes('refs/pull/')
}
