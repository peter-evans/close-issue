import * as core from '@actions/core'
import * as github from '@actions/github'
import {inspect} from 'util'

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

function getInputAsArray(name: string, options?: core.InputOptions): string[] {
  return getStringAsArray(core.getInput(name, options))
}

function getStringAsArray(str: string): string[] {
  return str
    .split(/[\n,]+/)
    .map(s => s.trim())
    .filter(x => x !== '')
}

async function run(): Promise<void> {
  try {
    const inputs = {
      token: core.getInput('token'),
      repository: core.getInput('repository'),
      issueNumber: Number(core.getInput('issue-number')),
      closeReason: core.getInput('close-reason'),
      comment: core.getInput('comment'),
      labels: getInputAsArray('labels')
    }
    core.debug(`Inputs: ${inspect(inputs)}`)

    const [owner, repo] = inputs.repository.split('/')
    core.debug(`Repo: ${inspect(repo)}`)

    const octokit = github.getOctokit(inputs.token)

    if (inputs.comment && inputs.comment.length > 0) {
      core.info('Adding a comment before closing the issue')
      await octokit.rest.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: inputs.issueNumber,
        body: inputs.comment
      })
    }

    core.info('Closing the issue as ' + inputs.closeReason)

    await octokit.rest.issues.update({
      owner: owner,
      repo: repo,
      issue_number: inputs.issueNumber,
      state: 'closed',
      state_reason: inputs.closeReason,
      labels: inputs.labels.length > 0 ? inputs.labels : undefined
    })
  } catch (error) {
    core.debug(inspect(error))
    core.setFailed(getErrorMessage(error))
  }
}

run()
