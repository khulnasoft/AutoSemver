import { defaultChangelogRules } from './defaults'

/**
 * Parses commit messages and categorizes them into changelog sections.
 * @param commits - An array of commit messages.
 * @returns An object with categorized commit messages.
 */
export function generateChangelog(commits: { message: string }[]) {
  const changelog: Record<string, string[]> = {}

  commits.forEach(({ message }) => {
    const commitType = Object.keys(defaultChangelogRules).find((type) =>
      message.startsWith(type),
    )

    if (commitType) {
      const section = defaultChangelogRules[commitType].section
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
export function formatChangelog(changelog: Record<string, string[]>) {
  let formatted = ''

  Object.entries(changelog).forEach(([section, messages]) => {
    formatted += `## ${section}\n\n`
    messages.forEach((msg) => {
      formatted += `- ${msg}\n`
    })
    formatted += '\n'
  })

  return formatted.trim()
}
