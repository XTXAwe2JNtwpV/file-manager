'use strict'

import fs from 'fs'
import { unlink } from 'fs/promises'
import { join, basename } from 'path'

import { OPERATION_FAILED } from '../const.js'

export const rnCmd = async args => {
  let result = ``
  try {

    const readStream = fs.createReadStream(args[0])
    const writeStream = fs.createWriteStream(args[1])
    const writeEndPromise = new Promise(resolve => {
      writeStream.on(`close`, () => {
        resolve()
      })
    })

    readStream.pipe(writeStream)

    await writeEndPromise
    await unlink(args[0])
  } catch (e) {
    result = OPERATION_FAILED
  }
  return result
}

export const cpCmd = async args => {
  let result = ``
  try {

    const readStream = fs.createReadStream(args[0])
    const writeStream = fs.createWriteStream(args[1])
    const writeEndPromise = new Promise(resolve => {
      writeStream.on(`close`, () => {
        resolve()
      })
    })

    readStream.pipe(writeStream)
    await writeEndPromise

  } catch (e) {
    result = OPERATION_FAILED
  }
  return result
}

export const mvCmd = async args => {
  let result = ``
  try {

    const readStream = fs.createReadStream(args[0])
    const writeStream = fs.createWriteStream(join(args[1], basename(args[0])))
    const writeEndPromise = new Promise(resolve => {
      writeStream.on(`close`, () => {
        resolve()
      })
    })

    readStream.pipe(writeStream)

    await writeEndPromise
    await unlink(args[0])

  } catch (e) {
    result = OPERATION_FAILED
  }
  return result
}

export const rmCmd = async args => {
  let result = ``
  try {
    await unlink(args[0])
  } catch (e) {
    result = OPERATION_FAILED
  }
  return result
}

export const addCmd = async args => {
  let result = ``
  try {
    const fStream = await fs.createWriteStream(args[0])
    await new Promise(resolve => {
      fStream.write(``, () => {
        resolve()
      })
    })
    fStream.close()
  } catch (e) {
    result = OPERATION_FAILED
  }
  return result
}
