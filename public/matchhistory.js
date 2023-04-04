async function loadHistory() {
    let matches = [];
    try {
      const response = await fetch('/api/scores');
      matches = await response.json();
        
      localStorage.setItem('scores', JSON.stringify(matches));
    } 
    catch {
      const scoresText = localStorage.getItem('scores');
      if (scoresText) {
        matches = JSON.parse(scoresText);
      }
    }
    
    displayHistory(matches);
}

function displayHistory(matches) {
    const tableBodyEl = document.querySelector('#scores');
    
    if (scores.length) {
      for (const [i, score] of scores.entries()) {
        const positionTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const scoreTdEl = document.createElement('td');
        const dateTdEl = document.createElement('td');
    
        positionTdEl.textContent = i + 1;
        nameTdEl.textContent = score.name;
        scoreTdEl.textContent = score.score;
        dateTdEl.textContent = score.date;
    
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(scoreTdEl);
        rowEl.appendChild(dateTdEl);
    
        tableBodyEl.appendChild(rowEl);
      }
    } 
    else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Play a game</td></tr>';
    }
}

loadHistory();