const rowsContainer = document.getElementById('container');

function displayPlayerScores() {
    fetch("https://group-assignment-1-db.onrender.com/users/leaderboard")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to retrieve user scores: ${response.status}`);
        }
        return response.json();
      })
      .then(userScores => {
        if (rowsContainer) {
          rowsContainer.innerHTML = '';
          
          userScores.forEach(player => {
            const rowDiv = document.createElement('div'); // Outer 'row' div tags
            rowDiv.classList.add('row');
  
            const nameDiv = document.createElement('div'); // Inner 'name' div tags
            nameDiv.classList.add('name');
            nameDiv.textContent = player.name; // Add text content in between tags from score objects
  
            const scoreDiv = document.createElement('div'); // Inner 'name' div tags
            scoreDiv.classList.add('score');
            scoreDiv.textContent = player.score;
  
            // Append elements to the rowsContainer
            rowDiv.appendChild(nameDiv);
            rowDiv.appendChild(scoreDiv);
            rowsContainer.appendChild(rowDiv);
          });
        } else {
          console.error("Could not find the 'rowsContainer' element.");
        }
      })
      .catch(error => {
        console.error("Failed to load user scores. Please try again later.:", error);
      });
  }
  
  displayPlayerScores();