'use strict'

import { OPERATION_FAILED } from '../const.js'

export const chWDir = async args => {
  let response = ``

  try {
    process.chdir(args[0])
  } catch (e) {
    response = OPERATION_FAILED
  }

  return response
}

export const upCmd = async args => { return chWDir([`..`]) }
