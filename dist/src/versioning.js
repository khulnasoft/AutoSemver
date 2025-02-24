'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getNextVersion = getNextVersion
exports.determineLatestVersion = determineLatestVersion
exports.sortVersions = sortVersions
var semver_1 = require('semver')
var github_1 = require('./github')
/**
 * Determines the next semantic version based on commit messages.
 * @param currentVersion - The latest valid version tag.
 * @param releaseType - The type of version bump (major, minor, patch, prerelease).
 * @returns The new incremented version string.
 */
function getNextVersion(currentVersion, releaseType) {
  if (!(0, semver_1.valid)(currentVersion)) {
    throw new Error('Invalid current version: '.concat(currentVersion))
  }
  var newVersion = (0, semver_1.inc)(currentVersion, releaseType)
  if (!newVersion) {
    throw new Error('Failed to increment version from '.concat(currentVersion))
  }
  return newVersion
}
/**
 * Determines the highest valid tag version.
 * @param tags - A list of repository tags.
 * @param prefixRegex - The regex pattern to identify valid tags.
 * @param tagPrefix - The prefix used for tagging.
 * @returns The latest valid tag.
 */
function determineLatestVersion(tags, prefixRegex, tagPrefix) {
  var latestTag = (0, github_1.getLatestTag)(tags, prefixRegex, tagPrefix)
  return latestTag ? latestTag.name.replace(prefixRegex, '') : '0.0.0'
}
/**
 * Sorts an array of version tags in descending order.
 * @param tags - An array of version strings.
 * @returns A sorted array of versions.
 */
function sortVersions(tags) {
  return tags.filter(semver_1.valid).sort(semver_1.rcompare)
}
