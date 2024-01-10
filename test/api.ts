import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { view, read } from "../src/api"

const viewApiSuite = suite('Base functionality of the ViewApi');

viewApiSuite('should be able to view a pgn', () => {
    const pgn = 'e4 e5 Nf3 Nc6'
    const pgnGame = read(pgn)

    assert.is(pgnGame.moves.length, 4)
})

// viewApiSuite.run()