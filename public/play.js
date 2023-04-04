class Game {
    horizontalRows;
    verticalColumns;
    movingPiece;
    possibleMoves;

    blackKingMove;
    whiteKingMove;
    whiteRook1Move;
    whiteRook2Move;
    blackRook1Move;
    blackRook2Move;

    constructor() {
        this.horizontalRows = ['1','2','3','4','5','6','7','8'];
        this.verticalColumns = ['A','B','C','D','E','F','G','H'];
        this.movingPiece = false;
        this.possibleMoves = [];
        blackKingMove = false;
        whiteKingMove = false;
        whiteRook1Move = false;
        whiteRook2Move = false;
        blackRook1Move = false;
        blackRook2Move = false;

        this.clear();
        this.setPieces();

        const playerNameEl = document.querySelector('.player-one');
        playerNameEl.textContent = this.getPlayerName();
    }

    clear() {
        for (let i = 0; i < this.verticalColumns.length; i++) {
            for (let j = 0; j < this.horizontalRows.length; j++) {
                const tileEl = document.querySelector('#' + this.verticalColumns[i] + this.horizontalRows[j]);
                if (tileEl.hasChildNodes()) {
                    tileEl.removeChild(tileEl.firstChild);
                }
            }
        }
    }

    setPieces() {
        let row = this.horizontalRows[0];
        for (let i = 0; i < this.verticalColumns.length; i++) {
            const string = this.verticalColumns[i] + row;
            const tileEl = document.querySelector('#' + string);
            if (i === 0 || i === 7) {
                const piece = document.createElement('img');
                piece.src = 'california/wr.svg';
                piece.className = 'white-piece';
                piece.id = 'white-rook';
                tileEl.appendChild(piece);
            }
            if (i === 1 || i === 6) {
                const piece = document.createElement('img');
                piece.src = 'california/wn.svg';
                piece.className = 'white-piece';
                piece.id = 'white-knight';
                tileEl.appendChild(piece);
            }
            if (i === 2 || i === 5) {
                const piece = document.createElement('img');
                piece.src = 'california/wb.svg';
                piece.className = 'white-piece';
                piece.id = 'white-bishop';
                tileEl.appendChild(piece);
            }
            if (i === 3) {
                const piece = document.createElement('img');
                piece.src = 'california/wq.svg';
                piece.className = 'white-piece';
                piece.id = 'white-queen';
                tileEl.appendChild(piece);
            }
            if (i === 4) {
                const piece = document.createElement('img');
                piece.src = 'california/wk.svg';
                piece.className = 'white-piece';
                piece.id = 'white-king';
                tileEl.appendChild(piece);
            }
        }
        row = this.horizontalRows[1];
        for (let i = 0; i < this.verticalColumns.length; i++) {
            const string = this.verticalColumns[i] + row;
            const tileEl = document.querySelector('#' + string);
            const piece = document.createElement('img');
            piece.src = 'california/wp.svg';
            piece.className = 'white-piece';
            piece.id = 'white-pawn';
            tileEl.appendChild(piece);
        }
        row = this.horizontalRows[6];
        for (let i = 0; i < this.verticalColumns.length; i++) {
            const string = this.verticalColumns[i] + row;
            const tileEl = document.querySelector('#' + string);
            const piece = document.createElement('img');
            piece.src = 'california/bp.svg';
            piece.className = 'black-piece';
            piece.id = 'black-pawn';
            tileEl.appendChild(piece);
        }
        row = this.horizontalRows[7];
        for (let i = 0; i < this.verticalColumns.length; i++) {
            const string = this.verticalColumns[i] + row;
            const tileEl = document.querySelector('#' + string);
            if (i === 0 || i === 7) {
                const piece = document.createElement('img');
                piece.src = 'california/br.svg';
                piece.className = 'black-piece';
                piece.id = 'black-rook';
                tileEl.appendChild(piece);
            }
            if (i === 1 || i === 6) {
                const piece = document.createElement('img');
                piece.src = 'california/bn.svg';
                piece.className = 'black-piece';
                piece.id = 'black-knight';
                tileEl.appendChild(piece);
            }
            if (i === 2 || i === 5) {
                const piece = document.createElement('img');
                piece.src = 'california/bb.svg';
                piece.className = 'black-piece';
                piece.id = 'black-bishop';
                tileEl.appendChild(piece);
            }
            if (i === 3) {
                const piece = document.createElement('img');
                piece.src = 'california/bq.svg';
                piece.className = 'black-piece';
                piece.id = 'black-queen';
                tileEl.appendChild(piece);
            }
            if (i === 4) {
                const piece = document.createElement('img');
                piece.src = 'california/bk.svg';
                piece.className = 'black-piece';
                piece.id = 'black-king';
                tileEl.appendChild(piece);
            }
        }
    }

    async reset() {
        this.movingPiece = false;
        this.possibleMoves.length = 0;

        this.clear();
        this.setPieces();
    }

    movePiece(column, row) {
        if (!this.movingPiece) {
            this.possibleMoves.length = 0;
            const rootTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row]);
            if (!rootTileEl.hasChildNodes()) {
                return;
            }

            const blueBackground = document.createElement('div');
            blueBackground.style.background = 'lightblue';
            blueBackground.style.width = '100%';
            blueBackground.style.height = '100%';
            blueBackground.style.top = '-100%';
            blueBackground.style.border = '5px solid black';
            blueBackground.style.zIndex = '2';
            blueBackground.style.position = 'relative';
            blueBackground.className = 'blueBackground';

            rootTileEl.appendChild(blueBackground);

            this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row]);

            if (rootTileEl.querySelector('#white-pawn') != null) {
                if (row === 1) {
                    let movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + 1]);

                        movingTileEl.appendChild(blueBackground);
                    }
                    movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row + 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + 2]);

                        movingTileEl.appendChild(blueBackground);
                    }
                    if (!(column + 1 > 7)) {
                        movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);
                        if (movingTileEl.hasChildNodes()) {
                            if (movingTileEl.querySelector('.black-piece') != null) {
                                const redBackground = document.createElement('div');
                                redBackground.style.background = 'lightcoral';
                                redBackground.style.width = '100%';
                                redBackground.style.height = '100%';
                                redBackground.style.top = '-100%';
                                redBackground.style.border = '5px solid black';
                                redBackground.style.zIndex = '2';
                                redBackground.style.position = 'relative';
                                redBackground.className = 'redBackground';

                                this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);

                                movingTileEl.appendChild(redBackground);
                            }
                        }
                    }
                    if (!(column - 1 < 0)) {
                        movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
                        if (movingTileEl.hasChildNodes()) {
                            if (movingTileEl.querySelector('.black-piece') != null) {
                                const redBackground = document.createElement('div');
                                redBackground.style.background = 'lightcoral';
                                redBackground.style.width = '100%';
                                redBackground.style.height = '100%';
                                redBackground.style.top = '-100%';
                                redBackground.style.border = '5px solid black';
                                redBackground.style.zIndex = '2';
                                redBackground.style.position = 'relative';
                                redBackground.className = 'redBackground';
    
                                this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
    
                                movingTileEl.appendChild(redBackground);
                            }
                        }
                    }
                }
                else {
                    let movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row + 1]);
                    if (row + 1 < 8 && !movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + 1]);

                        movingTileEl.appendChild(blueBackground);
                    }
                    if (row + 1 < 8 && !(column + 1 > 7)) {
                        movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);
                        if (movingTileEl.hasChildNodes()) {
                            if (movingTileEl.querySelector('.black-piece') != null) {
                                const redBackground = document.createElement('div');
                                redBackground.style.background = 'lightcoral';
                                redBackground.style.width = '100%';
                                redBackground.style.height = '100%';
                                redBackground.style.top = '-100%';
                                redBackground.style.border = '5px solid black';
                                redBackground.style.zIndex = '2';
                                redBackground.style.position = 'relative';
                                redBackground.className = 'redBackground';

                                this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);

                                movingTileEl.appendChild(redBackground);
                            }
                        }
                    }
                    if (row + 1 < 8 && !(column - 1 < 0)) {
                        movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
                        if (movingTileEl.hasChildNodes()) {
                            if (movingTileEl.querySelector('.black-piece') != null) {
                                const redBackground = document.createElement('div');
                                redBackground.style.background = 'lightcoral';
                                redBackground.style.width = '100%';
                                redBackground.style.height = '100%';
                                redBackground.style.top = '-100%';
                                redBackground.style.border = '5px solid black';
                                redBackground.style.zIndex = '2';
                                redBackground.style.position = 'relative';
                                redBackground.className = 'redBackground';
    
                                this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
    
                                movingTileEl.appendChild(redBackground);
                            }
                        }
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#black-pawn') != null) {
                if (row === 6) {
                    let movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - 1]);

                        movingTileEl.appendChild(blueBackground);
                    }
                    movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row - 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - 2]);

                        movingTileEl.appendChild(blueBackground);
                    }
                    if (!(column + 1 > 7)) {
                        movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);
                        if (movingTileEl.hasChildNodes()) {
                            if (movingTileEl.querySelector('.white-piece') != null) {
                                const redBackground = document.createElement('div');
                                redBackground.style.background = 'lightcoral';
                                redBackground.style.width = '100%';
                                redBackground.style.height = '100%';
                                redBackground.style.top = '-100%';
                                redBackground.style.border = '5px solid black';
                                redBackground.style.zIndex = '2';
                                redBackground.style.position = 'relative';
                                redBackground.className = 'redBackground';

                                this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);

                                movingTileEl.appendChild(redBackground);
                            }
                        }
                    }
                    if (!(column - 1 < 0)) {
                        movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
                        if (movingTileEl.hasChildNodes()) {
                            if (movingTileEl.querySelector('.white-piece') != null) {
                                const redBackground = document.createElement('div');
                                redBackground.style.background = 'lightcoral';
                                redBackground.style.width = '100%';
                                redBackground.style.height = '100%';
                                redBackground.style.top = '-100%';
                                redBackground.style.border = '5px solid black';
                                redBackground.style.zIndex = '2';
                                redBackground.style.position = 'relative';
                                redBackground.className = 'redBackground';
    
                                this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
    
                                movingTileEl.appendChild(redBackground);
                            }
                        }
                    }
                }
                else {
                    let movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row - 1]);
                    if (row - 1 > -1 && !movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - 1]);

                        movingTileEl.appendChild(blueBackground);
                    }
                    if (row - 1 > -1 && !(column + 1 > 7)) {
                        movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);
                        if (movingTileEl.hasChildNodes()) {
                            if (movingTileEl.querySelector('.white-piece') != null) {
                                const redBackground = document.createElement('div');
                                redBackground.style.background = 'lightcoral';
                                redBackground.style.width = '100%';
                                redBackground.style.height = '100%';
                                redBackground.style.top = '-100%';
                                redBackground.style.border = '5px solid black';
                                redBackground.style.zIndex = '2';
                                redBackground.style.position = 'relative';
                                redBackground.className = 'redBackground';

                                this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);

                                movingTileEl.appendChild(redBackground);
                            }
                        }
                    }
                    if (row - 1 > -1 && !(column - 1 < 0)) {
                        movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
                        if (movingTileEl.hasChildNodes()) {
                            if (movingTileEl.querySelector('.white-piece') != null) {
                                const redBackground = document.createElement('div');
                                redBackground.style.background = 'lightcoral';
                                redBackground.style.width = '100%';
                                redBackground.style.height = '100%';
                                redBackground.style.top = '-100%';
                                redBackground.style.border = '5px solid black';
                                redBackground.style.zIndex = '2';
                                redBackground.style.position = 'relative';
                                redBackground.className = 'redBackground';
    
                                this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
    
                                movingTileEl.appendChild(redBackground);
                            }
                        }
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#white-rook') != null) {
                for (let i = 1; i < 8; i++) {
                    if (column + i >= 8) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column - i <= -1) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#black-rook') != null) {
                for (let i = 1; i < 8; i++) {
                    if (column + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#white-knight') != null) {
                if (column + 2 < 8 && row + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 2] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 2] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 2] + this.horizontalRows[row + 1]);
                    }
                }
                if (column + 2 < 8 && row - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 2] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 2] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 2] + this.horizontalRows[row - 1]);
                    }
                }
                if (column - 2 > -1 && row + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 2] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 2] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 2] + this.horizontalRows[row + 1]);
                    }
                }
                if (column - 2 > -1 && row - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 2] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 2] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 2] + this.horizontalRows[row - 1]);
                    }
                }
                if (column + 1 < 8 && row + 2 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row + 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 2]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 2]);
                    }
                }
                if (column - 1 > -1 && row + 2 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row + 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 2]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 2]);
                    }
                }
                if (column + 1 < 8 && row - 2 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row - 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 2]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 2]);
                    }
                }
                if (column - 1 > -1 && row - 2 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row - 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 2]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 2]);
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#black-knight') != null) {
                if (column + 2 < 8 && row + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 2] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 2] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 2] + this.horizontalRows[row + 1]);
                    }
                }
                if (column + 2 < 8 && row - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 2] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 2] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 2] + this.horizontalRows[row - 1]);
                    }
                }
                if (column - 2 > -1 && row + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 2] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 2] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 2] + this.horizontalRows[row + 1]);
                    }
                }
                if (column - 2 > -1 && row - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 2] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 2] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 2] + this.horizontalRows[row - 1]);
                    }
                }
                if (column + 1 < 8 && row + 2 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row + 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 2]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 2]);
                    }
                }
                if (column - 1 > -1 && row + 2 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row + 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 2]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 2]);
                    }
                }
                if (column + 1 < 8 && row - 2 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row - 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 2]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 2]);
                    }
                }
                if (column - 1 > -1 && row - 2 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row - 2]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 2]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 2]);
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#white-bishop') != null) {
                for (let i = 1; i < 8; i++) {
                    if (column + i > 7 || row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column - i < 0 || row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0 || column - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0 || column + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#black-bishop') != null) {
                for (let i = 1; i < 8; i++) {
                    if (column + i > 7 || row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column - i < 0 || row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0 || column - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0 || column + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#white-king') != null) {
                if (row + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + 1]);
                    }
                }
                if (row - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - 1]);
                    }
                }
                if (column + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row]);
                    }
                }
                if (column - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row]);
                    }
                }
                if (row + 1 < 8 && column + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);
                    }
                }
                if (row + 1 < 8 && column - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
                    }
                }
                if (row - 1 > -1 && column - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
                    }
                }
                if (row - 1 > -1 && column + 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#black-king') != null) {
                if (row + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + 1]);
                    }
                }
                if (row - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - 1]);
                    }
                }
                if (column + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row]);
                    }
                }
                if (column - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row]);
                    }
                }
                if (row + 1 < 8 && column + 1 < 8) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row + 1]);
                    }
                }
                if (row + 1 < 8 && column - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row + 1]);
                    }
                }
                if (row - 1 > -1 && column - 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - 1] + this.horizontalRows[row - 1]);
                    }
                }
                if (row - 1 > -1 && column + 1 > -1) {
                    const movingTileEl = document.getElementById(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + 1] + this.horizontalRows[row - 1]);
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#white-queen') != null) {
                for (let i = 1; i < 8; i++) {
                    if (column + i >= 8) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column - i <= -1) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column + i > 7 || row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column - i < 0 || row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0 || column - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0 || column + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.white-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                this.movingPiece = true;
            }
            if (rootTileEl.querySelector('#black-queen') != null) {
                for (let i = 1; i < 8; i++) {
                    if (column + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column + i > 7 || row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (column - i < 0 || row + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row + i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row + i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row + i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0 || column - i < 0) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column - i] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column - i] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    if (row - i < 0 || column + i > 7) {
                        break;
                    }
                    const movingTileEl = document.getElementById(this.verticalColumns[column + i] + this.horizontalRows[row - i]);
                    if (!movingTileEl.hasChildNodes()) {
                        const blueBackground = document.createElement('div');
                        blueBackground.style.background = 'lightblue';
                        blueBackground.style.width = '100%';
                        blueBackground.style.height = '100%';
                        blueBackground.style.border = '5px solid black';
                        blueBackground.style.zIndex = '2';
                        blueBackground.style.position = 'relative';
                        blueBackground.className = 'blueBackground';

                        movingTileEl.appendChild(blueBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row - i]);
                    }
                    else if (movingTileEl.querySelector('.black-piece') != null) {
                        break;
                    }
                    else {
                        const redBackground = document.createElement('div');
                        redBackground.style.background = 'lightcoral';
                        redBackground.style.width = '100%';
                        redBackground.style.height = '100%';
                        redBackground.style.top = '-100%';
                        redBackground.style.border = '5px solid black';
                        redBackground.style.zIndex = '2';
                        redBackground.style.position = 'relative';
                        redBackground.className = 'redBackground';

                        movingTileEl.appendChild(redBackground);

                        this.possibleMoves.push(this.verticalColumns[column + i] + this.horizontalRows[row - i]);

                        break;
                    }
                }
                this.movingPiece = true;
            }
        }
        else {
            const rootTileEl = document.getElementById(this.possibleMoves[0]);
            const movingTileEl = document.getElementById(this.verticalColumns[column] + this.horizontalRows[row]);
            for(const tile in this.possibleMoves) {
                const possibleTiles = document.getElementById(this.possibleMoves[tile]);

                if (this.verticalColumns[column] + this.horizontalRows[row] === this.possibleMoves[tile]) {
                    if (this.possibleMoves[0] === this.possibleMoves[tile]) {
                        movingTileEl.removeChild(movingTileEl.lastChild);
                        continue;
                    }
                    if (movingTileEl.querySelector('.blueBackground') != null) {
                        if (rootTileEl.querySelector('.white-piece') != null) {
                            const piece = rootTileEl.querySelector('.white-piece');
                            movingTileEl.removeChild(movingTileEl.firstChild);
                            movingTileEl.appendChild(piece);
                            continue;
                        }
                        else {
                            const piece = rootTileEl.querySelector('.black-piece');
                            movingTileEl.removeChild(movingTileEl.firstChild);
                            movingTileEl.appendChild(piece);
                            continue;
                        }
                    }
                    else {
                        if (rootTileEl.querySelector('.white-piece') != null) {
                            const piece = rootTileEl.querySelector('.white-piece');
                            movingTileEl.removeChild(movingTileEl.firstChild);
                            movingTileEl.removeChild(movingTileEl.firstChild);
                            movingTileEl.appendChild(piece);
                            continue;
                        }
                        else {
                            const piece = rootTileEl.querySelector('.black-piece');
                            movingTileEl.removeChild(movingTileEl.firstChild);
                            movingTileEl.removeChild(movingTileEl.firstChild);
                            movingTileEl.appendChild(piece);
                            continue;
                        }
                    }
                }
                if (tile === "0" || possibleTiles.querySelector('.redBackground') != null) {
                    possibleTiles.removeChild(possibleTiles.lastChild);
                    continue;
                }

                possibleTiles.removeChild(possibleTiles.firstChild);
            }

            if (movingTileEl.querySelector('') != null) {
                //
            }

            this.movingPiece = false;
        }
    }

    getPlayerName() {
        return localStorage.getItem('username') ?? 'Mystery player';
    }

    //Will do this later(for match history) Need multiple players
    saveScore(score) {
        const userName = this.getPlayerName();
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
        scores = this.updateScores(userName, score, scores);

        localStorage.setItem('scores', JSON.stringify(scores));
    }
}

const game = new Game();

function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, milliseconds);
    });
}