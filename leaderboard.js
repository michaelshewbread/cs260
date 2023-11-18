function loadScores() {
    let scores = JSON.parse(localStorage.getItem('scores'));
    if (scores) {
        let hasChanged = false;
        do {
            for(let i=0; i < scores.length - 1; i++) {
                if (scores[i].time.seconds > scores[i+1].time.seconds) {
                    temp = scores[i];
                    scores[i+1] = temp;
                    scores[i] = scores[i+1];
                    hasChanged = true;
                }
            }
        } while (hasChanged);
    }
  
    const tableBodyEl = document.querySelector('#scores');
  
    if (scores) {
      for (const [i, score] of scores.entries()) {
        const rankTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const timeTdEl = document.createElement('td');
        const KOsTdEl = document.createElement('td');
  
        rankTdEl.textContent = i + 1;
        nameTdEl.textContent = score.name;
        timeTdEl.textContent = score.time;
        KOsTdEl.textContent = score.KOs;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(rankTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(timeTdEl);
        rowEl.appendChild(KOsTdEl);
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Looks like no one has played...</td></tr>';
    }
  }
  
  loadScores();