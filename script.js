// Apps menu toggle
const appsButton = document.getElementById('apps-button');
const appsMenu = document.getElementById('apps-menu');

appsButton.addEventListener('click', (e) => {
    e.stopPropagation();
    appsMenu.style.display = appsMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
    if (!appsMenu.contains(e.target) && e.target !== appsButton) {
        appsMenu.style.display = 'none';
    }
});

// Update time display
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('time-display').textContent = `${hours}:${minutes}`;
}

updateTime();
setInterval(updateTime, 60000); // Update every minute

// Search functionality
const searchBar = document.querySelector('.search-bar');
const searchIcon = document.querySelector('.search-icon');

searchIcon.addEventListener('click', () => {
    if (searchBar.value.trim()) {
        alert(`You searched for: ${searchBar.value}`);
        searchBar.value = '';
    }
});

searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchBar.value.trim()) {
        alert(`You searched for: ${searchBar.value}`);
        searchBar.value = '';
    }
});

// Modal functionality
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.mac-close');

// Create overlay
const overlay = document.createElement('div');
overlay.className = 'modal-overlay';
document.body.appendChild(overlay);

function openModal(modal) {
    document.body.classList.add('modal-open');
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal(modal) {
    document.body.classList.remove('modal-open');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Close modal when close button is clicked
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(button.closest('.modal'));
    });
});

// Close modal when clicking outside
overlay.addEventListener('click', () => {
    modals.forEach(modal => {
        closeModal(modal);
    });
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            closeModal(modal);
        });
    }
});

// Make modals draggable
modals.forEach(modal => {
    const header = modal.querySelector('.mac-window-controls');
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('mac-btn')) return;
        
        isDragging = true;
        offsetX = e.clientX - modal.getBoundingClientRect().left;
        offsetY = e.clientY - modal.getBoundingClientRect().top;
        modal.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        modal.style.left = `${e.clientX - offsetX}px`;
        modal.style.top = `${e.clientY - offsetY}px`;
        modal.style.transform = 'none';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        modal.style.cursor = 'default';
    });
});

// Planet parallax effect
function initPlanetParallax() {
    const planets = document.querySelectorAll('.planet');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        planets.forEach((planet, index) => {
            const speed = (index + 1) * 0.5;
            const xMove = x * 20 * speed;
            const yMove = y * 20 * speed;
            
            planet.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    });
}

// Theme toggle functionality (mode scolaire/pro)
const themeToggle = document.getElementById('theme-toggle');
let isSchoolMode = false;

// Applications pour chaque mode
const schoolApps = [
    { icon: '<i class="fas fa-user"></i>', title: "", modal: "about-modal" },
    { icon: '<i class="fas fa-graduation-cap"></i>', title: "", modal: "education-modal" },
    { icon: '<i class="fas fa-file"></i>', title: "", modal: "cv-modal" },
    { icon: '<i class="fas fa-project-diagram"></i>', title: "", modal: "school-projects-modal" },
    { icon: '<i class="fas fa-briefcase"></i>', title: "", modal: "internships-modal" },
    { icon: '<i class="fas fa-book"></i>', title: "", modal: "references-modal" },
    { icon: '<i class="fas fa-globe"></i>', title: "", modal: "watch-modal" },
    { icon: '<i class="fas fa-comment"></i>', title: "", modal: "contact-modal" }
];

const proApps = [
    { icon: '<i class="fas fa-user"></i>', title: "", modal: "about-modal" },
    { icon: '<i class="fas fa-trophy"></i>', title: "", modal: "skills-modal" },
    { icon: '<i class="fas fa-file"></i>', title: "", modal: "cv-modal" },
    { icon: '<i class="fas fa-suitcase"></i>', title: "", modal: "projects-modal" },
    { icon: '<i class="fas fa-eye"></i>', title: "", modal: "internships-modal" },
    { icon: '<i class="fas fa-inbox"></i>', title: "", modal: "documents-modal" },
    { icon: '<i class="fas fa-globe"></i>', title: "", modal: "watch-modal" },
    { icon: '<i class="fas fa-comment"></i>', title: "", modal: "contact-modal" }
];

function updateAppsMenu() {
    const appGrid = document.querySelector('.app-grid');
    appGrid.innerHTML = '';
    
    const appsToUse = isSchoolMode ? schoolApps : proApps;
    
    appsToUse.forEach(app => {
        const appIcon = document.createElement('div');
        appIcon.className = 'app-icon';
        appIcon.setAttribute('title', app.title);
        appIcon.setAttribute('data-modal', app.modal);
        appIcon.innerHTML = app.icon;
        appGrid.appendChild(appIcon);
        
        // Re-attach event listener
        appIcon.addEventListener('click', () => {
            const modalId = appIcon.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            const title = appIcon.getAttribute('title');
            
            modal.querySelector('.mac-title').textContent = title;
            appsMenu.style.display = 'none';
            openModal(modal);
        });
    });
}

function updateProfileContent() {
    const modeTitle = document.getElementById('mode-title');
    const modeBio = document.getElementById('mode-bio');
    const mainTitle = document.getElementById('main-title');
    const planet1 = document.querySelector('.planet-1');
    const planet2 = document.querySelector('.planet-2');
    
    if (isSchoolMode) {
        // Mode scolaire
        mainTitle.textContent = "Mon Portfolio Scolaire";
        modeTitle.textContent = "Étudiant en Informatique";
        modeBio.textContent = "Étudiant passionné par l'informatique et les nouvelles technologies. Je recherche activement un stage pour mettre en pratique mes connaissances et apprendre de nouveaux concepts.";
        planet1.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/e2/Full_moon.png')";
        planet2.style.backgroundImage = "url('https://i.postimg.cc/sXLKrV5g/download.jpg')";
        
        // Animation du titre
        gsap.fromTo("#main-title", 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5 }
        );
    } else {
        // Mode pro
        mainTitle.textContent = "Mon Portfolio Pro";
        modeTitle.textContent = "Développeur Full Stack";
        modeBio.textContent = "Passionné par le développement web et les nouvelles technologies. J'aime créer des interfaces utilisateur intuitives et des expériences utilisateur mémorables.";
        planet1.style.backgroundImage = "url('https://i.postimg.cc/sXLKrV5g/download.jpg')";
        planet2.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/e/e2/Full_moon.png')";
        
        // Animation du titre
        gsap.fromTo("#main-title", 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5 }
        );
    }
}

themeToggle.addEventListener('click', () => {
    isSchoolMode = !isSchoolMode;
    document.body.classList.toggle('school-mode');
    themeToggle.classList.toggle('active');
    
    // Mettre à jour les applications et le contenu
    updateAppsMenu();
    updateProfileContent();
    
    // Animation avec GSAP
    if (isSchoolMode) {
        gsap.to(".switch-knob", { x: 30, duration: 0.3 });
        gsap.to(".switch-top", { backgroundColor: "#FFFFFF", duration: 0.3 });
        gsap.to(".switch-light", { 
            opacity: 1, 
            width: 80, 
            height: 80, 
            duration: 0.3,
            ease: "power2.out"
        });
    } else {
        gsap.to(".switch-knob", { x: 0, duration: 0.3 });
        gsap.to(".switch-top", { backgroundColor: "#827d96", duration: 0.3 });
        gsap.to(".switch-light", { 
            opacity: 0, 
            width: 16, 
            height: 16, 
            duration: 0.3,
            ease: "power2.in"
        });
    }
});

// Initialize when page loads
window.addEventListener('load', () => {
    initPlanetParallax();
    updateAppsMenu(); // Initialiser les applications
    
    // Preload planet images
    const planetImages = [
        'https://i.postimg.cc/sXLKrV5g/download.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/e2/Full_moon.png',
        'https://upload.wikimedia.org/wikipedia/commons/2/27/Mars_transparent.png'
    ];
    
    planetImages.forEach(img => {
        new Image().src = img;
    });
});