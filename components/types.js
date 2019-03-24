export let apiTypes = {
    createRoom: 'createRoom',
    joinRoom: 'joinRoom',
    pingToStartGame: 'pingToStartGame',
    movedPiece: 'movedPiece',
    oppositePlayerMovedPiece: 'oppositePlayerMovedPiece',
    oppositePlayerDisconnected: 'oppositePlayerDisconnected',
    gameOver: 'gameOver'
}


export let pieceType = {
    king: 'king',
    queen: 'queen',
    knight: 'knight',
    rook: 'rook',
    pawn: 'pawn',
    bishop: 'bishop'
}

export let images = {
    king: [ require('./Figurines/main/king0.png'), require('./Figurines/main/king1.png') ],
    pawn: [ require('./Figurines/main/pawn0.png'), require('./Figurines/main/pawn1.png') ],
    knight: [ require('./Figurines/main/knight0.png'), require('./Figurines/main/knight1.png') ],
    rook: [ require('./Figurines/main/rook0.png'), require('./Figurines/main/rook1.png') ],
    queen: [ require('./Figurines/main/queen0.png'), require('./Figurines/main/queen1.png') ],
    bishop: [ require('./Figurines/main/bishop0.png'), require('./Figurines/main/bishop1.png') ]
}

export let defaultMoveDetails = {
    i: null,
    j: null,
    isIconSeleted: false,
}

let emptyLongArray = [{},{},{},{},{},{},{},{}]
export let defaultGame = [
    [{ type: pieceType.rook, player: 0, isYetMoved: false }, { type: pieceType.knight, player: 0, isYetMoved: false }, { type: pieceType.bishop, player: 0, isYetMoved: false }, { type: pieceType.queen, player: 0, isYetMoved: false },
    { type: pieceType.king, player: 0, isYetMoved: false }, { type: pieceType.bishop, player: 0, isYetMoved: false }, { type: pieceType.knight, player: 0, isYetMoved: false }, { type: pieceType.rook, player: 0, isYetMoved: false }],
    [{ type: pieceType.pawn, player: 0, isYetMoved: false }, { type: pieceType.pawn, player: 0, isYetMoved: false }, { type: pieceType.pawn, player: 0, isYetMoved: false }, { type: pieceType.pawn, player: 0, isYetMoved: false },
    { type: pieceType.pawn, player: 0, isYetMoved: false }, { type: pieceType.pawn, player: 0, isYetMoved: false }, { type: pieceType.pawn, player: 0, isYetMoved: false }, { type: pieceType.pawn, player: 0, isYetMoved: false }],
     emptyLongArray, emptyLongArray, emptyLongArray, emptyLongArray,
    [{ type: pieceType.pawn, player: 1, isYetMoved: false }, { type: pieceType.pawn, player: 1, isYetMoved: false }, { type: pieceType.pawn, player: 1, isYetMoved: false }, { type: pieceType.pawn, player: 1, isYetMoved: false },
    { type: pieceType.pawn, player: 1, isYetMoved: false }, { type: pieceType.pawn, player: 1, isYetMoved: false }, { type: pieceType.pawn, player: 1, isYetMoved: false }, { type: pieceType.pawn, player: 1, isYetMoved: false }],
    [{ type: pieceType.rook, player: 1, isYetMoved: false }, { type: pieceType.knight, player: 1, isYetMoved: false }, { type: pieceType.bishop, player: 1, isYetMoved: false }, { type: pieceType.queen, player: 1, isYetMoved: false },
    { type: pieceType.king, player: 1, isYetMoved: false }, { type: pieceType.bishop, player: 1, isYetMoved: false }, { type: pieceType.knight, player: 1, isYetMoved: false }, { type: pieceType.rook, player: 1, isYetMoved: false }]
]