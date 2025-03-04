import * as core from '@actions/core'

/**
 * Logs a debug message if debugging is enabled.
 * @param message - The message to log.
 */
export function debugLog(message: string): void {
  core.debug(message)
}

/**
 * Ensures a string is a valid semantic version, returning a formatted version.
 * @param version - The version string to validate.
 * @param prefix - The optional prefix to include (e.g., 'v').
 * @returns A formatted version string.
 */
export function formatVersion(version: string, prefix: string = 'v'): string {
  return version.startsWith(prefix) ? version : `${prefix}${version}`
}

/**
 * Extracts the branch name from a Git reference.
 * @param ref - The full Git reference string (e.g., 'refs/heads/main').
 * @returns The extracted branch name.
 */
export function getBranchName(ref: string): string {
  return ref.replace('refs/heads/', '')
}

/**
 * Checks if a given Git reference corresponds to a pull request.
 * @param ref - The full Git reference string.
 * @returns True if the reference is a pull request, false otherwise.
 */
export function isPullRequest(ref: string): boolean {
  return ref.includes('refs/pull/')
}
