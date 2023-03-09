class Game {
    horizontalRows;
    verticalColumns;

    constructor() {
        this.horizontalRows = ['1','2','3','4','5','6','7','8'];
        this.verticalColumns = ['A','B','C','D','E','F','G','H'];

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
                piece.className = 'pieces';
                piece.id = 'white-rook';
                tileEl.appendChild(piece);
            }
            if (i === 1 || i === 6) {
                const piece = document.createElement('img');
                piece.src = 'california/wn.svg';
                piece.className = 'pieces';
                piece.id = 'white-knight';
                tileEl.appendChild(piece);
            }
            if (i === 2 || i === 5) {
                const piece = document.createElement('img');
                piece.src = 'california/wb.svg';
                piece.className = 'pieces';
                piece.id = 'white-bishop';
                tileEl.appendChild(piece);
            }
            if (i === 3) {
                const piece = document.createElement('img');
                piece.src = 'california/wq.svg';
                piece.className = 'pieces';
                piece.id = 'white-queen';
                tileEl.appendChild(piece);
            }
            if (i === 4) {
                const piece = document.createElement('img');
                piece.src = 'california/wk.svg';
                piece.className = 'pieces';
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
            piece.className = 'pieces';
            piece.id = 'white-pawn';
            tileEl.appendChild(piece);
        }
        row = this.horizontalRows[6];
        for (let i = 0; i < this.verticalColumns.length; i++) {
            const string = this.verticalColumns[i] + row;
            const tileEl = document.querySelector('#' + string);
            const piece = document.createElement('img');
            piece.src = 'california/bp.svg';
            piece.className = 'pieces';
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
                piece.className = 'pieces';
                piece.id = 'black-rook';
                tileEl.appendChild(piece);
            }
            if (i === 1 || i === 6) {
                const piece = document.createElement('img');
                piece.src = 'california/bn.svg';
                piece.className = 'pieces';
                piece.id = 'black-knight';
                tileEl.appendChild(piece);
            }
            if (i === 2 || i === 5) {
                const piece = document.createElement('img');
                piece.src = 'california/bb.svg';
                piece.className = 'pieces';
                piece.id = 'black-bishop';
                tileEl.appendChild(piece);
            }
            if (i === 3) {
                const piece = document.createElement('img');
                piece.src = 'california/bq.svg';
                piece.className = 'pieces';
                piece.id = 'black-queen';
                tileEl.appendChild(piece);
            }
            if (i === 4) {
                const piece = document.createElement('img');
                piece.src = 'california/bk.svg';
                piece.className = 'pieces';
                piece.id = 'black-king';
                tileEl.appendChild(piece);
            }
        }
    }

    async reset() {
        this.clear();
        this.setPieces();
    }

    movePiece() {
        //
    }

    getPlayerName() {
        return localStorage.getItem('username') ?? 'Mystery player';
    }

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

function loadSound(filename) {
    return new Audio('assets/' + filename);
}