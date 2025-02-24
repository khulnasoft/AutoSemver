/**
 * Represents a Git tag.
 */
export interface Tag {
  name: string
  commit: {
    sha: string
  }
}

/**
 * Represents a commit object.
 */
export interface Commit {
  message: string
  sha: string
}

/**
 * Represents changelog rules for a commit type.
 */
export interface ChangelogRule {
  release: string
  section: string
}

/**
 * Represents a mapping of commit types to changelog rules.
 */
export type ChangelogRules = Record<string, ChangelogRule>
