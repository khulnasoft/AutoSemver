import { rcompare, inc, valid } from 'semver'
import { getLatestTag } from './github'

/**
 * Determines the next semantic version based on commit messages.
 * @param currentVersion - The latest valid version tag.
 * @param releaseType - The type of version bump (major, minor, patch, prerelease).
 * @returns The new incremented version string.
 */
export function getNextVersion(
  currentVersion: string,
  releaseType: string,
): string {
  if (!valid(currentVersion)) {
    throw new Error(`Invalid current version: ${currentVersion}`)
  }
  const newVersion = inc(currentVersion, releaseType)
  if (!newVersion) {
    throw new Error(`Failed to increment version from ${currentVersion}`)
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
export function determineLatestVersion(
  tags: { name: string }[],
  prefixRegex: RegExp,
  tagPrefix: string,
): string {
  const latestTag = getLatestTag(tags, prefixRegex, tagPrefix)
  return latestTag ? latestTag.name.replace(prefixRegex, '') : '0.0.0'
}

/**
 * Sorts an array of version tags in descending order.
 * @param tags - An array of version strings.
 * @returns A sorted array of versions.
 */
export function sortVersions(tags: string[]): string[] {
  return tags.filter(valid).sort(rcompare)
}
