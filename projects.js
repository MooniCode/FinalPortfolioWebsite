// Projects array (unchanged from your original code)
const projects = [
    {
        id: 1,
        title: "Bird Assault",
        category: "Games",
        image: "Images/IMG_BirdAssault.png",
        video: "Videos/VID_BirdAssault.mp4",
        description: "A little game where you collect worms and avoid obstacles.",
        date: "29/12/2023",
        link: "Projects/birdAssault.html"
    },
    {
        id: 2,
        title: "Diorama",
        category: "Art",
        image: "Images/IMG_Diorama.jpg",
        video: "Videos/VID_Diorama.mp4",
        description: "This scene is set in norway where tv signal is scarce..",
        date: "9/01/2023",
        link: "Projects/windmill.html"
    },
    {
        id: 3,
        title: "Bird Assault",
        category: "Games",
        image: "PD1_BirdAssault.png",
        video: "bird_assault_video.mp4", // Added video property
        description: "A little game where you collect worms and avoid obstacles.",
        date: "2023-01-15",
        link: "Projects/birdAssault.html"
    },
    {
        id: 4,
        title: "Test Project",
        category: "Games",
        image: "PD1_BirdAssault.png",
        video: "test_project_video.mp4", // Added video property
        description: "A small game made for my final exam of programming. In this game you play is a bird who has to collect worms and bring them back to his nest. However there are dangerous obstacles that will need to be avoided.",
        date: "2023-01-15",
        link: "Projects/birdAssault.html"
    },
];

// Function to create project cards - Updated to include video
function createProjectCard(project) {
    return `
        <div class="project-card" data-category="${project.category.toLowerCase()}">
            <a href="${project.link}" class="project-link">
                <div class="media-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <video src="${project.video}" muted loop class="project-video"></video>
                </div>
                <div class="project-content">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <p class="project-date">${project.date}</p>
                    <button class="view-project-btn">View Project</button>
                </div>
            </a>
        </div>
    `;
}

// Function to load all projects
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';

    // Sort projects by id in descending order
    const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

    sortedProjects.forEach(project => {
        projectsGrid.innerHTML += createProjectCard(project);
    });
    
    // Add event listeners for video hover effects after creating cards
    setupVideoHoverEffects();
}

// Add this new function to handle video hover effects
function setupVideoHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const video = card.querySelector('.project-video');
        
        card.addEventListener('mouseenter', () => {
            if (video) {
                video.currentTime = 0; // Reset to beginning
                video.play();
                video.classList.add('show');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.classList.remove('show');
            }
        });
    });
}

// Function to filter projects
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('fade-out');
            card.classList.add('fade-in');
            setTimeout(() => {
                card.style.display = 'block';
            }, 300);
        } else {
            card.classList.remove('fade-in');
            card.classList.add('fade-out');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Add event listeners to filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter projects based on category
            const category = button.getAttribute('data-filter');
            filterProjects(category);
        });
    });
}

// Function to add a new project (can be called from anywhere)
function addProject(project) {
    // Add project to the array
    projects.push(project);

    // Reload projects to ensure the new project appears at the top
    loadProjects();

    // Reapply the current filter
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    filterProjects(activeFilter);
}

// Header shrink effect on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.height = '70px';
    } else {
        header.style.height = '100px';
    }
});

// Initialize the portfolio when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupFilters();
});