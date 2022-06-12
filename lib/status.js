'use strict'

export const getUsername = (args) => {
  const argsObj = {}
  let username = ``

  for (const arg of args) {
    const argsPair = arg.split(/=+/)
    if (argsPair.length) {
      const [key, value] = [argsPair[0], argsPair[1] ?? '']
      if (key == `--username`) {
        username = value
        break
      }
    }
  }

  return username
}

export const getOutputWorkDir = () => {
  const workDir = process.cwd()
  return `You are currently in ${workDir}\n`
}

export const outputBanner = () => {
  const args = [...process.argv];
  [0, 1].forEach(() => { args.shift() })
  const username = getUsername(args)

  process.stdout.write(`Welcome to the File Manager, ${username}!\n`)
  process.on(`exit`, () => { process.stdout.write(`Thank you for using File Manager, ${username}!\n`) })

  process.stdout.write(getOutputWorkDir())
}
