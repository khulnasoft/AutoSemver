import * as core from '@actions/core'
import * as github from '@actions/github'

const octokit = github.getOctokit(
  core.getInput('github_token', { required: true }),
)
const { owner, repo } = github.context.repo

/**
 * Lists all tags in the repository.
 * @param fetchAll - Whether to fetch all available tags.
 * @returns An array of tag objects.
 */
export async function listTags(fetchAll: boolean = false) {
  const { data: tags } = await octokit.rest.repos.listTags({
    owner,
    repo,
    per_page: fetchAll ? 100 : 10,
  })
  return tags
}

/**
 * Compares two commits and returns the list of commits between them.
 * @param base - The base commit SHA.
 * @param head - The head commit SHA.
 * @returns An array of commit objects.
 */
export async function compareCommits(base: string, head: string) {
  const { data } = await octokit.rest.repos.compareCommits({
    owner,
    repo,
    base,
    head,
  })
  return data.commits
}

/**
 * Creates a new Git tag in the repository.
 * @param tagName - The name of the new tag.
 * @param commitSha - The commit SHA to tag.
 */
export async function createTag(tagName: string, commitSha: string) {
  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/tags/${tagName}`,
    sha: commitSha,
  })
  core.info(`Created new tag: ${tagName}`)
}

/**
 * Creates a new GitHub release.
 * @param tagName - The tag associated with the release.
 * @param releaseNotes - The release notes.
 */
export async function createRelease(tagName: string, releaseNotes: string) {
  await octokit.rest.repos.createRelease({
    owner,
    repo,
    tag_name: tagName,
    name: tagName,
    body: releaseNotes,
  })
  core.info(`Created new release: ${tagName}`)
}
