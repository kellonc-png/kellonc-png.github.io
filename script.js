// Admin Authentication
const ADMIN_PASSWORD = "your-secure-password"; // Change this to a secure password

document.addEventListener('DOMContentLoaded', () => {
  const gamesContainer = document.getElementById('games-container');
  const uploadSection = document.querySelector('.admin-only');
  const adminLoginBtn = document.getElementById('admin-login-btn');
  const uploadForm = document.getElementById('upload-form');

  // Fetch Games from GitHub
  async function fetchGames() {
    try {
      const response = await fetch('games.json'); // Replace with actual GitHub API if needed
      const games = await response.json();

      gamesContainer.innerHTML = '';
      games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
          <div class="card">
            <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="${game.name}">
            <div class="card-body">
              <h5 class="card-title">${game.name}</h5>
              <p class="card-text">${game.description}</p>
              <a href="${game.file}" class="btn btn-primary" download>Download</a>
            </div>
          </div>
        `;
        gamesContainer.appendChild(card);
      });
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  }

  // Handle Admin Login
  adminLoginBtn.addEventListener('click', () => {
    const password = prompt('Enter admin password:');
    if (password === ADMIN_PASSWORD) {
      alert('Admin access granted.');
      uploadSection.style.display = 'block';
    } else {
      alert('Access denied.');
    }
  });

  // Handle Game Upload
  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const gameName = document.getElementById('game-name').value;
    const gameDescription = document.getElementById('game-description').value;
    const gameFile = document.getElementById('game-files').value;

    const newGame = { name: gameName, description: gameDescription, file: gameFile };

    // Push new game to GitHub (requires GitHub API integration)
    console.log('New game uploaded:', newGame);

    // Add to UI
    fetchGames();
    uploadForm.reset();
  });

  fetchGames();
});
