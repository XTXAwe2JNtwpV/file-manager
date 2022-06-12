'use strict'

import { homedir } from 'os'

import { cmdHandle } from './cmdHandle.js'
import { outputBanner, getOutputWorkDir } from './status.js'

export class CmdStream {
  exitAfter = false

  constructor() {

    process.stdin.on(`data`, async data => {
      if (data) {
        await this._transform(data)
      }
      if (this.exitAfter) process.exit()
    })

    process.chdir(homedir())
    outputBanner()
  }

  async _transform(chunk) {
    const lines = chunk.toString('utf-8')

    const cmds = lines.split(/(\r*\n\r*)+/).filter(line => !line.match(/^\s*$/))
    for (const cmd of cmds) {
      const { response, exitAfter } = await cmdHandle(cmd)
      this.exitAfter = exitAfter
      if (!exitAfter) {
        if (typeof response === `string`) {
          process.stdout.write(response)
        } else if (response instanceof Promise) {
          await response
        }
        process.stdout.write(getOutputWorkDir())
      }
    }
  }
}
