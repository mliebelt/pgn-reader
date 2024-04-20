# API Comments

This was extracted from pgn-reader, and is the current exported functions, so similar to an API. As it is visible, not all functions are used at all, those are good candidates to get rid of. Some functions have no context, or a defined one and should be easy to use to a separate file and provide that functionality if needed.    

## Future Reader API

Collect here the API methods / functions, that should be usable in the future as well.

* configuration: PgnReaderConfiguration;	--> Why is that needed at all in the viewer? Strange ...
* addMove(move: PrimitiveMove | string, moveNumber: number): number;	--> Should be part of the new API, arguments have to be checked. There is some overlap with makeMove ...
* findMove(moveRep: number | string): PgnReaderMove | undefined;	--> Check, if needed any more. Logic should be simple enough to reimplement it.
* gameState: GameState;  // Asking for the game state: tuple PgnGame & PgnReaderMove
* getMove(id: number): PgnReaderMove | undefined;	--> Should be part of the new API, part of the static structure
* getPosition(index: number | null): FEN;  // Could be part of the structure of PgnReaderMove, if not, how to get it then?
* makeMove(move?: PgnReaderMove | SAN): boolean; // viewer of reader API?
* moves: PgnReaderMove[]; --> Move to new API
    
## Future Editor API

* changeNag(_nag: string, moveNumber: number, added: boolean): void;	--> Needed for the editor only, separate module
* clearNags(moveNumber: number): void;
* deleteMove(id: number): void;	--> Needed for the editor only, part of EditAPI then?
* promoteMove(id: number): void;		--> Part of the edit API then.
* setShapes(move: PgnReaderMove, shapes: Shape[]): void;	--> Needed for editor, near Chessground


## No Future API

Not handling multiple games any more.

* checkedGames?: PgnGame[];		==> Part of the new API, no idea what that was for
* chess: any;	--> not necessary, create individually, no reference to reader
* constructor(configuration: PgnReaderConfiguration);	--> Not needed
* currentGameIndex: number;
* games: ParseTree[];
* getGame(index: number): PgnGame;
* getGames(): ParseTree[];		--> Only needed in the context of multiple games, should be refactored. Eliminate from reader then.
* loadGame(game: PgnGame): void; --> Only needed for multiple games
* loadMany(): void;
* loadOne(game: ParseTree | number): void;	--> Old API, eliminate
* loadPgn(): PgnReader;		--> Old API, see what is the replacement for it. Should be the central place (== read??)
* readMoves(moves: PgnMove[]): void;  --> algorithm to build the moves tree, not part of the API
* san(move: PgnReaderMove): string;		--> Should be a utility function without any dependency
* sanWithNags(move: PgnReaderMove): string;	--> Should be a utility function without any dependency
* startMainLine(move: PgnReaderMove): boolean;	--> Utility function, separated from API
* startVariation(move: PgnReaderMove): boolean;	--> Utility function, separated from API
* updateVariationLevel(move: PgnReaderMove, varLevel: number): void;


## Unclear

The following was initially the pool of all functions, moved to the above 3 sections. The rest has to be clarified.

* afterMoveWithVariation(move: PgnReaderMove): boolean;
* deleteMovesBefore(moveRep: number | string): string;
* eachMove(movesMainLine: PgnMove[]): void;
* endGame: string;
* endVariation(move: PgnReaderMove): boolean;		--> Utility function, separated from API
* getEndGame(): string;	--> Should be part of the static structure, not needed in the API
* getFirstMove(): PgnReaderMove | null;	--> Unclear why needed, candidate to get rid of
* getGameComment(): GameComment;		--> Should be part of the static structure
* getMoves(): PgnReaderMove[];	--> Should not be necessary any more, part of the static structure
* getOrderedMoves(current: PgnReaderMove, returnedMoves: PgnReaderMove[]): PgnReaderMove[];	--> Strange case, only once needed in the viewer, how to get rid of it?
* getTags(): Tags;		--> Part of the static structure in the future
* isDeleted(id: number): boolean;		--> Seems to be needed for cleanup, strange. Should be not necessary
* isMove(id: number): boolean;
* possibleMoves(move: number | string): Map<Field, Field[]>; --> not needed in the context of the reader, only argument should be a FEN all the time
* setPosition(position: FEN): boolean;
* setToStart(): string;		--> Check carefully, only needed by the editor at the moment (why??)
* writePgn(configuration?: {}): string;		--> Is that needed by the reader at all, or only in the viewer. Check implementation!
