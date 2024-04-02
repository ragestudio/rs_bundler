import Logger from "../logger"

import ISM_GIT_CLONE from "./git_clone"
import ISM_GIT_PULL from "./git_pull"
import ISM_GIT_RESET from "./git_reset"
import ISM_HTTP from "./http"

const InstallationStepsMethods = {
    git_clone: ISM_GIT_CLONE,
    git_pull: ISM_GIT_PULL,
    git_reset: ISM_GIT_RESET,
    http_file: ISM_HTTP,
}

const StepsOrders = [
    "git_clones",
    "git_pull",
    "git_reset",
    "http_file",
]

export default async function processGenericSteps(pkg, steps, logger = Logger) {
    logger.info(`Processing generic steps...`)

    if (!Array.isArray(steps)) {
        throw new Error(`Steps must be an array`)
    }

    if (steps.length === 0) {
        return pkg
    }

    steps = steps.sort((a, b) => {
        return StepsOrders.indexOf(a.type) - StepsOrders.indexOf(b.type)
    })

    for await (let step of steps) {
        step.type = step.type.toLowerCase()

        if (!InstallationStepsMethods[step.type]) {
            throw new Error(`Unknown step: ${step.type}`)
        }

        await InstallationStepsMethods[step.type](pkg, step, logger)
    }

    return pkg
}