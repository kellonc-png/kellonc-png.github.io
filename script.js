// Toggle Menu for mobile devices
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('fa-bars');
    menuToggle.classList.toggle('fa-times');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.add('fa-bars');
        menuToggle.classList.remove('fa-times');
    });
});

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }
});

// Handle folder upload
const uploadForm = document.getElementById('upload-form');
const folderUpload = document.getElementById('folder-upload');
const gamesList = document.getElementById('games-list');
const uploadedGames = document.getElementById('uploaded-games');
let games = []; // Local array to store game data

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const gameName = document.getElementById('game-name').value;
    const files = folderUpload.files;

    if (!gameName || files.length === 0) {
        alert('Please provide a game name and upload a folder.');
        return;
    }

    // Create ZIP file
    const zip = new JSZip();
    for (const file of files) {
        const relativePath = file.webkitRelativePath.replace(/^[^/]+\/?/, '');
        zip.file(relativePath, file);
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Add game to the list (simulate saving)
    const game = { name: gameName, zipBlob };
    games.push(game);
    renderGames();

    // Clear the form
    uploadForm.reset();
});

// Render games in both the public and admin sections
function renderGames() {
    // Public games list
    gamesList.innerHTML = '';
    games.forEach((game) => {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameItem.textContent = game.name;
        gamesList.appendChild(gameItem);
    });

    // Admin uploaded games list
    uploadedGames.innerHTML = '';
    games.forEach((game, index) => {
        const gameItem = document.createElement('li');
        gameItem.textContent = game.name;

        const downloadZipBtn = document.createElement('button');
        downloadZipBtn.textContent = 'Download ZIP';
        downloadZipBtn.classList.add('btn-secondary');
        downloadZipBtn.addEventListener('click', () => {
            saveAs(game.zipBlob, `${game.name}.zip`);
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('btn-danger');
        removeBtn.addEventListener('click', () => {
            games.splice(index, 1);
            renderGames();
        });

        gameItem.appendChild(downloadZipBtn);
        gameItem.appendChild(removeBtn);
        uploadedGames.appendChild(gameItem);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth',
            });
        }
    });
});

// Add active class to nav link based on scroll position
function highlightNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize functions
highlightNavLink();
