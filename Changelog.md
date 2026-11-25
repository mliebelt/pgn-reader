# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Unknown version

### Changed

### Fixed

## 1.2.31

Published 2026-11-25.

### Changed

* Upgraded chess.js from 0.12.1 to 1.4.0, including the migration to the new chess.js 1.x API internally. The public API of this library did not change.
* Upgraded sync-fetch to 0.7.x, and `@mliebelt/pgn-parser` to 1.4.16
* [#176](https://github.com/mliebelt/pgn-reader/issues/176) Migrated to TypeScript 6.0.x
* CI runs with Node versions 20 and 22 only now, Dependabot auto-merge is restricted to verified patch updates

### Fixed

* [#253](https://github.com/mliebelt/pgn-reader/issues/253) Wrong FEN code given - with the new chess.js version the FEN strings are now computed correctly, covered by a test case now

## 1.2.30

Published 2025-04-12.

### Changed

* NAGs `$11` and `$12` are now handled like `$10`
* Several dependency updates (rollup, TypeScript 5.x, and others)

### Fixed

* [#110](https://github.com/mliebelt/pgn-reader/issues/110) Missing SetUp / FEN when a position is given
* [#97](https://github.com/mliebelt/pgn-reader/issues/97) Fixed wrong tsconfig.json

## 1.2.29

Published 2024-08-24.

### Fixed

* [#48](https://github.com/mliebelt/pgn-reader/issues/48) Fixed handling of game switching with `manyGames: true`

## 1.2.28

First new release after a long time, that will prepare the refactoring to

* more functional api (no objects any more)
* clean API to be used by any client

The API is growing, and will at the end allow `pgn-viewer` to switch to the API methods. When that point is reached, I will eliminate the old `PgnReader`, and go to version 2.0.x then.

### Changed

* [#8](https://github.com/mliebelt/pgn-reader/issues/8) First additional API methods, not finished
* [#7](https://github.com/mliebelt/pgn-reader/issues/7) Switched from mocha, chai to uvu to speed-up tests

### Fixed

## 1.2.27

This release was done with the old setup, the issues match the issues in repository [pgn-viewer](https://github.com/mliebelt/pgn-viewer/issues) then.
