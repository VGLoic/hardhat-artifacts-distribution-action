import * as core from '@actions/core'
import { wait } from './wait'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const releaseName: string = core.getInput('releaseName')
    if (!releaseName) throw new Error('No release name provided')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Preparing release ${releaseName}...`)

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    core.info('Waiting for 1 second...')
    await wait(1_000)
    core.info('Done waiting.')
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('hasDistributed', true)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
