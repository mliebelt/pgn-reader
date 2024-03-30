import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { view, read } from "../src/api"

const viewApiSuite = suite('Base functionality of the ViewApi');

viewApiSuite('should be able to read a pgn', () => {
    const pgn = 'e4 e5 Nf3 Nc6'
    const pgnGame = read(pgn)

    assert.is(pgnGame.moves.length, 4)
})

viewApiSuite('should be able to view a pgn', () => {
    const pgn = 'e4 e5 Nf3 Nc6'
    const pgnGame = read(pgn)
    const viewGame = view(pgnGame, {})
    let newState = viewGame.makeMove('e4')
    let move = viewGame.gameState.currentMove

    assert.is.not(viewGame, undefined)
    assert.is(move.notation.notation, 'e4')
    assert.is(move.variations.length, 0)
    let fen = viewGame.getCurrentPosition()
    assert.is(move.fen, fen)
    let moves = viewGame.gameState.game.moves
    assert.is(moves.length, 4)
})

viewApiSuite.run()