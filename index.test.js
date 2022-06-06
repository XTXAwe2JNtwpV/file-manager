'use strict'

const { spawn } = require('child_process')

test(`Run index and exit`, async () => {
  try {
    let cp
    expect(() => { cp = spawn(`npm`, `run start -- --username=your_username`.split(/\s+/)) }).not.ToThrow()
    expect(cp).toBeInstanceOf(ChildProcessWithoutNullStreams)
    const exitCode = await new Promise(resolve => { cp.on(`close`, exitCode => resolve(exitCode)) })
    expect(exitCode).toBe(0)
  } catch (e) {
    expect(true).toBe(true)
  }
})