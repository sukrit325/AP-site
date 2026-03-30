function scrollToSections() {
    const sectionsSection = document.getElementById('sections');
    if (sectionsSection) {
        sectionsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const navCards = document.querySelectorAll('.nav-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        navCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Smooth animations on page load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.overview-card, .nav-card, .topic-item');
    cards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s forwards`;
        card.style.opacity = '0';
    });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.nav-card').forEach(card => {
    observer.observe(card);
});
const toggle = document.getElementById("uiToggle");

// Get current page name (e.g., index.html, Introduction.html)
const currentPage = window.location.pathname.split("/").pop();

// Detect current folder
const isOld = window.location.pathname.includes("/Old/");
const isNew = window.location.pathname.includes("/New/");

// Set toggle state on load
if (isNew) {
    toggle.checked = true; // switch ON for New UI
}

// Toggle action
toggle.addEventListener("change", () => {
    if (toggle.checked) {
        localStorage.setItem("uiVersion", "New");
        window.location.href = "../New/" + currentPage;
    } else {
        localStorage.setItem("uiVersion", "Old");
        window.location.href = "../Old/" + currentPage;
    }
});

// Auto-redirect based on saved preference
const saved = localStorage.getItem("uiVersion");

if (saved === "New" && isOld) {
    window.location.href = "../New/" + currentPage;
}

if (saved === "Old" && isNew) {
    window.location.href = "../Old/" + currentPage;
}