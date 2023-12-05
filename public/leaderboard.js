async function loadScores() {
  let scores = [];
  try {
    const response = await fetch('/api/leaderboard');
    scores = await response.json();

    localStorage.setItem('scores', JSON.stringify(scores));
    console.log("loaded leaderboard");
  } catch {
    console.log("Error calling /api/leaderboard");
    scores = JSON.parse(localStorage.getItem('scores'));
  }

  if (scores) {
      let hasChanged = false;
      do {
        hasChanged = false;
          for(let i=0; i < scores.length - 1; i++) {
            if (scores[i].time.minutes < scores[i+1].time.minutes) {
              temp = scores[i];
              scores[i] = scores[i+1];
              scores[i+1] = temp;
              hasChanged = true;
            }
            else if (scores[i].KOs < scores[i+1].KOs) {
              temp = scores[i];
              scores[i] = scores[i+1];
              scores[i+1] = temp;
              hasChanged = true;
            }
            else if (scores[i].time.seconds < scores[i+1].time.seconds) {
              temp = scores[i];
              scores[i] = scores[i+1];
              scores[i+1] = temp;
              hasChanged = true;
            }
          }
      } while (hasChanged);
  }
  
    const tableBodyEl = document.querySelector('#scores');
  
    // if you give a tr element the class="player-rank" thing,
    // the css will animate it differently, so do that.
    if (scores.length) {
      for (const [i, score] of scores.entries()) {

        const rankTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const timeTdEl = document.createElement('td');
        const KOsTdEl = document.createElement('td');

        const minutes = document.createElement('span');
        const minute_text = document.createElement('span');
        const seconds = document.createElement('span');
        const second_text = document.createElement('span');
        
        minute_text.textContent = ' m ';
        second_text.textContent = ' s ';
        minutes.textContent = score.time.minutes;
        seconds.textContent = score.time.seconds;

        timeTdEl.appendChild(minutes);
        timeTdEl.appendChild(minute_text);
        timeTdEl.appendChild(seconds);
        timeTdEl.appendChild(second_text);

        rankTdEl.textContent = i + 1;
        nameTdEl.textContent = score.name;
        KOsTdEl.textContent = score.KOs;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(rankTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(timeTdEl);
        rowEl.appendChild(KOsTdEl);

        if (score.name === localStorage.getItem("username")) {
          rowEl.classList.add("player-rank");
        }
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Looks like no one has played...</td></tr>';
    }
  }
  
  loadScores();