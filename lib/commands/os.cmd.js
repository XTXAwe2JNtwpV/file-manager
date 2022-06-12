'use strict'

import os from 'os'

export const osCmd = async args => {
  let result = ``
  switch (args[0].replace(/^--/, ``)) {
    case `EOL`:
      result = JSON.stringify(os.EOL) + `\n`
      break;

    case `cpus`:
      result = JSON.stringify(os.cpus().map(cpu => {
        const { model, speed } = cpu; return { model, speed }
      })) + `\n`
      break;

    case `homedir`:
      result = os.homedir() + `\n`
      break;

    case `username`:
      result = os.userInfo().username + `\n`
      break;

    case `architecture`:
      result = os.arch() + `\n`
      break;

    default:
      result = OPERATION_FAILED
  }
  return result
}

