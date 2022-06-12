'use strict'

import fs from 'fs'
import { createHash } from 'crypto'
import { createBrotliCompress, createBrotliDecompress } from 'zlib'

import { OPERATION_FAILED } from '../const.js'

export const hashCmd = async args => {
  let result = ``

  const hashStream = createHash(`sha256`)
  try {
    const input = fs.createReadStream(args[0])
    const hashPromise = new Promise((resolve, reject) => {
      hashStream.on(`readable`, () => {
        const hashValue = hashStream.read()
        if (hashValue) {
          resolve(hashValue.toString(`hex`))
        } else {
          reject()
        }
      })
    })
    input.pipe(hashStream)
    result = await hashPromise
  } catch (e) {
    result = OPERATION_FAILED
  }

  result += `\n`
  return result
}

export const compressCmd = async args => {
  let result = ''
  try {
    const compressStream = createBrotliCompress()
    const readStream = fs.createReadStream(args[0])
    const writeStream = fs.createWriteStream(args[1])

    const writeEndPromise = new Promise((resolve) => {
      writeStream.on(`close`, () => {
        resolve()
      })
    })

    readStream.pipe(compressStream).pipe(writeStream)

    await writeEndPromise
  } catch (e) {
    result = OPERATION_FAILED
  }

  return result
}

export const decompressCmd = async args => {
  let result = ''
  try {
    const decompressStream = createBrotliDecompress()
    const readStream = fs.createReadStream(args[0])
    const writeStream = fs.createWriteStream(args[1])

    const writeEndPromise = new Promise((resolve) => {
      writeStream.on(`close`, () => {
        resolve()
      })
    })

    readStream.pipe(decompressStream).pipe(writeStream)

    await writeEndPromise
  } catch (e) {
    result = OPERATION_FAILED
  }

  return result
}

