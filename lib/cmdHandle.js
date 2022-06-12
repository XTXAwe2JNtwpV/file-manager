'use strict'

import { catCmd, lsCmd } from './commands/list.cmd.js'
import { chWDir, upCmd } from './commands/chwdir.cmd.js'
import { rnCmd, cpCmd, mvCmd, rmCmd, addCmd } from './commands/files.cmd.js'
import { osCmd } from './commands/os.cmd.js'
import { compressCmd, decompressCmd, hashCmd } from './commands/hash-compress.cmd.js'

export const cmdHandle = async (cmd) => {
  let response = `Invalid input\n`
  let exitAfter = false

  const [cmdName, ...cmdArgs] = cmd.replace(/[\n\r]+$/, ``).split(/\s+/)
  if (cmdName) {
    switch (cmdName) {
      case '.exit':
        response = ``
        exitAfter = true
        break

      case 'cat':
        response = await catCmd(cmdArgs)
        break

      case `cd`:
        response = await chWDir(cmdArgs)
        break

      case 'ls':
        response = await lsCmd(cmdArgs)
        break

      case 'up':
        response = await upCmd(cmdArgs)
        break

      case 'rn':
        response = await rnCmd(cmdArgs)
        break

      case 'cp':
        response = await cpCmd(cmdArgs)
        break

      case 'mv':
        response = await mvCmd(cmdArgs)
        break

      case 'rm':
        response = await rmCmd(cmdArgs)
        break

      case 'os':
        response = await osCmd(cmdArgs)
        break

      case 'hash':
        response = await hashCmd(cmdArgs)
        break

      case 'compress':
        response = await compressCmd(cmdArgs)
        break

      case 'decompress':
        response = await decompressCmd(cmdArgs)
        break

      case 'add':
        response = await addCmd(cmdArgs)
        break
    }
  }

  return { response, exitAfter }
}
