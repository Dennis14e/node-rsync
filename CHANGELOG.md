# Changelog

## v0.7.1

  - Updated GitHub Actions for automatic release

## v0.7.0

  - Complete overhaul
  - Added ESLint
  - Replaced testing framework with Jest
  - Replaced Travis CI with GitHub Actions
  - Merged [mattijs/node-rsync#62](https://github.com/mattijs/node-rsync/pull/62)
  - Merged [mattijs/node-rsync#70](https://github.com/mattijs/node-rsync/pull/70)
  - Merged [mattijs/node-rsync#71](https://github.com/mattijs/node-rsync/pull/71)

## v0.6.1

  - Add support for windows file paths under cygwin (#53)

## v0.6.0

  - Escape dollar signs in filenames (#40)
  - Add permission shorthands (#46)
  - Added env() option to set the process environment variables (#51)

## v0.5.0

  - Properly treat flags as String
  - Differentiate between shell and file arguments (escaping)
  - Added a bunch of unit tests
  - Added TravisCI setup to run tests on branches and PRs
  - Added cwd() option to set the process CWD (#36)

## v0.4.0

  - Child process pid is returned from `execute` (#27)
  - Command execution shell is configurable for Unix systems (#27)
  - Better escaping for filenames with spaces (#24)

## v0.3.0

  - Launch the command under a shell (#15)
  - Typo fix isaArray -> isArray for issue (#14)
  - Error: rsync exited with code 14 (#11)

## v0.2.0

  - use spawn instead of exec (#6)

## v0.1.0

  - better support for include/exclude filters
  - better support for output handlers
  - removed output buffering (#6)

## v0.0.2

  - swapped exclude and include order
  - better shell escaping

## v0.0.1

  - initial version (actually the second)
