// Mock admin authentication (Replace with real authentication in backend)
const isAdmin = true; // Set to false for non-admin view

document.addEventListener('DOMContentLoaded', () => {
  const uploadSection = document.getElementById('upload-section');
  const uploadForm = document.getElementById('upload-form');
  const gamesContainer = document.getElementById('games-container');

  // Show admin panel if admin
  if (isAdmin) {
    uploadSection.style.display = 'block';
  }

  // Handle game upload
  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const gameName = document.getElementById('game-name').value;
    const gameFiles = document.getElementById('game-files').files;

    if (!gameName || gameFiles.length === 0) {
      alert('Please provide a game name and files.');
      return;
    }

    // Mock server request (Replace with real backend API call)
    alert(`Game "${gameName}" uploaded successfully!`);

    // Add to game list
    const gameItem = document.createElement('li');
    gameItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    gameItem.innerHTML = `<span>${gameName}</span> <a href="#" class="btn btn-sm btn-outline-primary">Download</a>`;
    gamesContainer.appendChild(gameItem);

    // Reset form
    uploadForm.reset();
  });
});
