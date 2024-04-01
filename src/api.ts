import {GameState} from "./state"
import {FEN, PgnReaderConfiguration, SAN} from "./types"
import {PgnGame, PgnReaderMove} from "@mliebelt/pgn-types";
import {PgnReader} from "./pgn";
import * as fs from 'fs';

export interface ViewApi {
    gameState: GameState,
    makeMove(move?: PgnReaderMove|SAN): GameState // Returns the new GameState if the move was legal.
    setPosition(position: FEN): GameState // Returns the new GameState if the position could be found in the existing moves
    getCurrentPosition(): FEN // Returns the current position
    getMoves(): PgnReaderMove[]  //
}

/**
 * Read a PGN string and return the game.
 * @param pgn the PGN string to read.
 */
export function read(pgn: string): PgnGame {
    const reader = new PgnReader({ pgn: pgn })
    return {
        moves: reader.getMoves(),
        gameComment: reader.getGameComment(),
        tags: reader.getTags()
    }
}

/**
 * Read a PGN string and return the games read as array.
 * @param pgn the PGN string to read.
 */
export function readMany(pgn: string): PgnGame[] {
    const reader = new PgnReader({ pgn: pgn, manyGames: true })
    const numGames = reader.games.length
    const games: PgnGame[] = []
    for (let i = 0; i < numGames; i++) {
        reader.loadOne(i)
        games.push({
            moves: reader.getMoves(),
            gameComment: reader.getGameComment(),
            tags: reader.getTags()
        })
    }
    return games
}


/**
 * Reads a PGN file and returns an array of PgnGame objects.
 * Each PgnGame object represents a single game in the PGN file.
 *
 * @param {string} file - The path of the PGN file to be read.
 * @return {PgnGame[]} - An array of PgnGame objects representing the games in the PGN file.
 */
export function readFile(file: string): Promise<PgnGame[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error while reading file: ${err}`);
                reject(err);
                return;
            }
            resolve(readMany(data));
        });
    });
}

/*
    Implement it in a way that is backward compatible with the PgnReader. Later on, we have to refactor it,
    and then create (possibly) a new major version of it. Current problems:
    * PgnGame knows only implicit about the starting position (but can be computed, if SetUp and FEN is given).
    * PgnReader is not really playing a game. It gets all information needed for the next move. The current structure
        helps here, because moves are linked to each other
    * We need a new constructor for PgnReader, that allows to create it from a PgnGame (that is already read)
 */
export function view(game: PgnGame, configuration: PgnReaderConfiguration): ViewApi {
    const reader = new PgnReader(configuration)
    reader.loadGame(game)
    let gameState: GameState = {
        game: game
        }
    return {
        gameState: gameState,
        makeMove: (move?: PgnReaderMove | SAN): GameState => {
            if (! move) {
                let _move = reader.getFirstMove()
                reader.makeMove(_move)
                gameState.currentMove = _move
            } else {
                if ((move as PgnReaderMove).notation !== undefined) {
                    reader.makeMove(move)
                    gameState.currentMove = move as PgnReaderMove
                } else {
                    let _move = reader.findMove(move as string)
                    reader.makeMove(_move)
                    gameState.currentMove = _move
                }
            }
            return gameState
        },
        setPosition: (position: FEN): GameState => {
            return this.makeMove(position)
        },
        getCurrentPosition: (): FEN => {
            return gameState.currentMove.fen
        },
        getMoves: (): PgnReaderMove[] => {
            return gameState.game.moves
        }
    }
}


/*
export interface EditApi extends ViewApi {
    addMove(gameState: GameState, move: PgnReaderMove): boolean // Returns true if the move was legal.
    deleteMove(gameState: GameState, move: PgnReaderMove): boolean // Returns true if the move could be deleted.
    addComment(gameState: GameState, comment: string, before: boolean): void // Add a comment to the current move, if before, add it before the move.
    setNAGs(gameState: GameState, nag: NAGs): void // Set the NAG of the current move.
    // ... and many more...
}
*/

/*

export function edit(game: PgnGame, configuration: PgnReaderConfiguration): EditApi {
    let gameState: GameState = { game: game}
    return {
        gameState: gameState,
        makeMove: (move?: PgnReaderMove | SAN): boolean => {   return false },
        setPosition: (position: FEN): boolean => { return false },
        getPosition: (): FEN => { return "" },
        getMoves: (): PgnReaderMove[] => { return [] },
        addMove: (gameState: GameState, move: PgnReaderMove): boolean => { return false},
        deleteMove: (gameState: GameState, move: PgnReaderMove): boolean => { return false },
        addComment: (gameState: GameState, comment: string, before: boolean = false): void => { return},
        setNAGs: (gameState: GameState, nag: NAGs): void => { return }
    }
}*/
