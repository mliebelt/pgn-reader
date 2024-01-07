import {GameState} from "./state"
import {FEN, NAGs, PgnReaderConfiguration, SAN} from "./types"
import {PgnGame, PgnReaderMove} from "@mliebelt/pgn-types";

export interface ViewApi {
    makeMove(gameState: GameState, move?: PgnReaderMove|SAN): boolean // Returns true if the move was legal.
    setPosition(gameState: GameState, position: FEN): boolean // Returns true if the position could be found in the existing moves
    getPosition(gameState: GameState): FEN // Returns the current position
    getMoves(gameState: GameState): PgnReaderMove[]  //
}

export interface EditApi extends ViewApi {
    addMove(gameState: GameState, move: PgnReaderMove): boolean // Returns true if the move was legal.
    deleteMove(gameState: GameState, move: PgnReaderMove): boolean // Returns true if the move could be deleted.
    addComment(gameState: GameState, comment: string, before: boolean = false): void // Add a comment to the current move, if before, add it before the move.
    setNAGs(gameState: GameState, nag: NAGs): void // Set the NAG of the current move.
    // ... and many more...
}

/**
 * Read a PGN string and return the game.
 * @param pgn the PGN string to read.
 */
export function read(pgn: string): PgnGame {
    return {
        moves: []
    }
}

export function view(game: PgnGame, configuration: PgnReaderConfiguration): ViewApi {
    return {
        makeMove: (gameState: GameState, move?: PgnReaderMove | SAN): boolean => {
            return false
        },
        setPosition:
            (gameState: GameState, position: FEN): boolean => {
                return false
            },
        getPosition:
            (gameState: GameState): FEN => {
                return ""
            },
        getMoves:
            (gameState: GameState): PgnReaderMove[] => {
                return []
            }
    }
}

export function edit(game: PgnGame, configuration: PgnReaderConfiguration): EditApi {
    return {
        makeMove: (gameState: GameState, move?: PgnReaderMove | SAN): boolean => {        return false
    },
        setPosition
:
    (gameState: GameState, position: FEN): boolean => {
        return false
    },
        getPosition
:
    (gameState: GameState): FEN => {
        return ""
    },
        getMoves
:
    (gameState: GameState): PgnReaderMove[] => {
        return []
    },
        addMove
:
    (gameState: GameState, move: PgnReaderMove): boolean => {
        return false
    },
        deleteMove
:
    (gameState: GameState, move: PgnReaderMove): boolean => {
        return false
    },
        addComment
:
    (gameState: GameState, comment: string, before: boolean = false): void => {
        return
    },
        setNAGs
:
    (gameState: GameState, nag: NAGs): void => {
        return
    }
    }
}