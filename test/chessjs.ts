import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { Chess } from 'chess.js';

const chessjs = suite('chess.js');

chessjs('evaluates move with sloppy', () => {
    const chess = new Chess();
    chess.load('r1bqkbnr/ppp1pppp/2P5/8/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 3');

    const move = chess.move('bxc6', { sloppy: true });

    // assert.is(move, null);   // Seems to be fixed in version 0.12.1
});

chessjs('evaluates move without sloppy', () => {
    const chess = new Chess();
    chess.load('r1bqkbnr/ppp1pppp/2P5/8/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 3');

    const move = chess.move('bxc6');

    assert.is(move.san, 'bxc6');
});

chessjs('check combinations of load and fen', () => {
    const chess = new Chess();
    chess.load("8/1p6/p3pR2/4R3/4b3/2B1kp1P/PP2r1P1/6K1 w - - 0 1")
    assert.is(chess.fen(), '8/1p6/p3pR2/4R3/4b3/2B1kp1P/PP2r1P1/6K1 w - - 0 1')
    const move = chess.move('Rxf3')
    assert.is(move.san, 'Rxf3#');

})
chessjs('check combinations of Chess() and fen', () => {
    const chess = new Chess("8/1p6/p3pR2/4R3/4b3/2B1kp1P/PP2r1P1/6K1 w - - 0 1");
    assert.is(chess.fen(), '8/1p6/p3pR2/4R3/4b3/2B1kp1P/PP2r1P1/6K1 w - - 0 1');
})

chessjs.run();
