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
                tileEl.removeChild(tileEl.firstChild);
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
                piece.innerHTML = '<img src=california/wr.svg class=pieces id=white-rook/>';
                tileEl.appendChild(piece);
            }
            if (i === 1 || i === 6) {
                const piece = document.createElement('img');
                piece.innerHTML = '<img src=california/wn.svg class=pieces id=white-knight/>';
                tileEl.appendChild(piece);
            }
            if (i === 2 || i === 5) {
                const piece = document.createElement('img');
                piece.innerHTML = '<img src=california/wb.svg class=pieces id=white-bishop/>';
                tileEl.appendChild(piece);
            }
            if (i === 3) {
                const piece = document.createElement('img');
                piece.innerHTML = '<img src=california/wq.svg class=pieces id=white-queen/>';
                tileEl.appendChild(piece);
            }
            if (i === 4) {
                const piece = document.createElement('img');
                piece.innerHTML = '<img src=california/wk.svg class=pieces id=white-king/>';
                tileEl.appendChild(piece);
            }
        }
        row = this.horizontalRows[1];
        for (let i = 0; i < this.verticalColumns.length; i++) {
            const string = this.verticalColumns[i] + row;
            const tileEl = document.querySelector('#' + string);
            const piece = document.createElement('img');
            piece.innerHTML = '<img src=california/wp.svg class=pieces id=white-pawn/>';
            tileEl.appendChild(piece);
        }
        row = this.horizontalRows[6];
        for (let i = 0; i < this.verticalColumns.length; i++) {
            const string = this.verticalColumns[i] + row;
            const tileEl = document.querySelector('#' + string);
            const piece = document.createElement('img');
            piece.innerHTML = '<img src=california/bp.svg class=pieces id=black-pawn/>';
            tileEl.appendChild(piece);
        }
        for (let i = 0; i < this.verticalColumns.length; i++) {
            const string = this.verticalColumns[i] + row;
            const tileEl = document.querySelector('#' + string);
            if (i === 0 || i === 7) {
                const piece = document.createElement('img');
                piece.innerHTML = '<img src=california/br.svg class=pieces id=black-rook/>';
                tileEl.appendChild(piece);
            }
            if (i === 1 || i === 6) {
                const piece = document.createElement('img');
                piece.innerHTML = '<img src=california/bn.svg class=pieces id=black-knight/>';
                tileEl.appendChild(piece);
            }
            if (i === 2 || i === 5) {
                const piece = document.createElement('img');
                piece.innerHTML = '<img src=california/bb.svg class=pieces id=black-bishop/>';
                tileEl.appendChild(piece);
            }
            if (i === 3) {
                const piece = document.createElement('img');
                piece.innerHTML = '<img src=california/bq.svg class=pieces id=black-queen/>';
                tileEl.appendChild(piece);
            }
            if (i === 4) {
                const piece = document.createElement('img');
                piece.innerHTML = '<img src=california/bk.svg class=pieces id=black-king/>';
                tileEl.appendChild(piece);
            }
        }
    }

    async reset() {
        this.clear();
        this.setPieces();
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