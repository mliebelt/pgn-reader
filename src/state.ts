import {PgnGame} from "@mliebelt/pgn-types";

/**
 * Interface representing the state of a game.
 * Contains the PgnGame representing the full game.
 * The idea is to have some functions to return parts of the state of the game.
 * Playing a game is mostly moving through the tree of moves. For editing, more functions are needed.
 */
export interface GameState {
    game: PgnGame,
    // gameState() => GameState
}