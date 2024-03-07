import { shell } from '@yun-jie/shell'
import chalk from 'chalk'

import { sh } from './index'

const shellMock = shell as jest.Mock

jest.mock('@yun-jie/shell')

process.env = { DEFAULT_ENV: 'default env' }

describe('sh()', () => {
  let logger: any

  beforeEach(() => {
    jest.resetAllMocks()
    logger = {
      error: jest.fn(),
      log: jest.fn(),
      title: jest.fn(),
      warning: jest.fn()
    }
  })

  it('calls original @yun-jie/shell function with the same command', () => {
    sh('test command', undefined, logger)
    expect(shellMock).toHaveBeenCalledTimes(1)
    expect(shellMock).toHaveBeenCalledWith('test command', expect.anything())
  })

  it('logs executed command', () => {
    sh('test command', undefined, logger)
    expect(logger.log).toHaveBeenCalledTimes(1)
    expect(logger.log).toHaveBeenCalledWith(chalk.bold('test command'))
  })

  it('calls original @yun-jie/shell with default options values', () => {
    sh('test command', undefined, logger)
    expect(shellMock).toHaveBeenCalledTimes(1)
    expect(shellMock).toHaveBeenCalledWith(expect.anything(), {
      env: {
        DEFAULT_ENV: 'default env',
        PATH: expect.anything()
      }
    })
  })

  it('calls original @yun-jie/shell with given options values', () => {
    sh(
      'test command',
      {
        async: true,
        cwd: 'cwd-dir',
        env: { CUSTOM_ENV: 'custom env' },
        stdio: 'pipe',
        timeout: 1000
      },
      logger
    )
    expect(shellMock).toHaveBeenCalledTimes(1)
    expect(shellMock).toHaveBeenCalledWith(expect.anything(), {
      async: true,
      cwd: 'cwd-dir',
      env: {
        CUSTOM_ENV: 'custom env',
        PATH: expect.anything()
      },
      stdio: 'pipe',
      timeout: 1000
    })
  })

  it('adds ./node_modules/.bin to $PATH', () => {
    sh('test command', undefined, logger)
    expect(shellMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        env: expect.objectContaining({
          PATH: expect.stringContaining('node_modules/.bin:')
        })
      })
    )
  })
})
