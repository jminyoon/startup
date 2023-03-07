function loadHistory() {
    let history = [];
    const historyText = localStorage.getItem('history');
    if (historyText) {
        history = JSON.parse(historyText);
    }

    const tableBodyEl = document.querySelector('#history');

    if (history.length) {
        for (const [i, match] of history.entries()) {
            const dateTdEl = document.createElement('td');
            const nameTdEl = document.createElement('td');
            const scoreTdEl = document.createElement('td');

            dateTdEl.textContent = match.date;
            nameTdEl.textContent = match.name;
            scoreTdEl.textContent = match.score;

            const rowEl = document.createElement('tr');
            rowEl.appendChild(dateTdEl);
            rowEl.appendChild(nameTdEl);
            rowEl.appendChild(scoreTdEl);

            tableBodyEl.appendChild(rowEl);
        }
    }
    else {
        tableBodyEl.innerHTML = '<tr><td colSpan=3>Play a game</td></tr>'
    }
}

loadHistory();