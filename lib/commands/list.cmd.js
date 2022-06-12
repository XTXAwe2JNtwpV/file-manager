'use strict'

import fs from 'fs'
import { readdir } from 'fs/promises'

import { OPERATION_FAILED } from '../const.js'

export const catCmd = async args => {
  let result = ``
  try {
    const fStream = fs.createReadStream(args[0])
    const fStreamEndPromise = new Promise((resolve) => {
      fStream.on(`close`, () => {
        resolve()
      })
    })
    fStream.pipe(process.stdout)

    result = fStreamEndPromise
  } catch (e) {
    result = OPERATION_FAILED
  }
  return result
}

export const lsCmd = async args => {
  let result
  try {
    result = await readdir(process.cwd())
    result = result.join(`\n`) + `\n`
  } catch (e) {
    result = OPERATION_FAILED
  }
  return result
}
