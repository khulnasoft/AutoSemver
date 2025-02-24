import * as core from '@actions/core'
import * as github from '@actions/github'
import { getValidTags, getLatestTag } from './versioning'
import { createTag, createRelease } from './github'

async function run() {
  try {
    core.info('Starting Auto SemVer GitHub Action...')

    // Get inputs from action.yml
    const token = core.getInput('github_token', { required: true })
    const tagPrefix = core.getInput('tag_prefix') || 'v'

    // Initialize GitHub client
    const octokit = github.getOctokit(token)
    const { owner, repo } = github.context.repo

    // Fetch valid tags from repository
    const prefixRegex = new RegExp(`^${tagPrefix}`)
    const tags = await getValidTags(prefixRegex, true)
    const latestTag = getLatestTag(tags, prefixRegex, tagPrefix)

    core.info(`Latest tag found: ${latestTag.name}`)

    // Generate next version (logic handled in versioning.ts)
    const nextVersion = 'v1.0.1' // Placeholder: Implement SemVer logic
    core.info(`Next version: ${nextVersion}`)

    // Create and push the new tag
    await createTag(nextVersion, latestTag.commit.sha)

    // Create GitHub release
    const releaseNotes = `Automated release for version ${nextVersion}`
    await createRelease(nextVersion, releaseNotes)

    core.info('Auto SemVer GitHub Action completed successfully!')
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`)
  }
}

run()
