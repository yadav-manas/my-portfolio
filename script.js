// --- Projects Data ---
const projects = [
  {
    title: "Drone Landing Website",
    description: "A modern web application for drone landing zone management and scheduling. Features include real-time availability tracking, booking system, and weather integration.",
    tech: ["React.js", "Node.js", "MongoDB", "Socket.io"],
    demo: "#",
    github: "#"
  },
  // Add more projects here
];

// --- Render Projects ---
const projectsGrid = document.getElementById('projectsGrid');
if (projectsGrid) {
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-title">${project.title}</div>
      <div class="project-desc">${project.description}</div>
      <div class="project-tech">
        ${project.tech.map(t => `<span>${t}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${project.demo}" class="project-link" target="_blank">Live Demo</a>
        <a href="${project.github}" class="project-link" target="_blank">GitHub</a>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

// --- Contact Form Interactivity ---
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = 'Thank you for reaching out! (Demo only)';
    contactForm.reset();
    setTimeout(() => { formMessage.textContent = ''; }, 3000);
  });
}

// --- Smooth Scroll for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Dynamic Card Live Update ---
const cardTitleInput = document.getElementById('cardTitleInput');
const cardDescInput = document.getElementById('cardDescInput');
const dynamicCardTitle = document.getElementById('dynamicCardTitle');
const dynamicCardDesc = document.getElementById('dynamicCardDesc');

if (cardTitleInput && dynamicCardTitle) {
  cardTitleInput.addEventListener('input', function() {
    dynamicCardTitle.textContent = this.value || 'Dynamic Card Title';
  });
}
if (cardDescInput && dynamicCardDesc) {
  cardDescInput.addEventListener('input', function() {
    dynamicCardDesc.textContent = this.value || 'This is a dynamic card. Change the text and see the card update live!';
  });
}

// --- Animated Text in Hero Section ---
const animatedText = document.getElementById('animatedText');
const roles = [
  'Web Developer',
  'Software Developer',
  'App Developer',
  'Tech Enthusiast',
  'Drone Tech Explorer',
  'BCA Student',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 90;

function typeRole() {
  if (!animatedText) return;
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
    animatedText.innerHTML = currentRole.substring(0, charIndex) + '<span class="cursor">|</span>';
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 600);
    } else {
      setTimeout(typeRole, typingSpeed / 2);
    }
  } else {
    charIndex++;
    animatedText.innerHTML = currentRole.substring(0, charIndex) + '<span class="cursor">|</span>';
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1200);
    } else {
      setTimeout(typeRole, typingSpeed);
    }
  }
}
typeRole();

// --- Sticky Nav Active Link on Scroll ---
const navLinks = document.querySelectorAll('.nav-links a');
const sections = Array.from(document.querySelectorAll('section'));
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 120;
  let current = sections.find(section => section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos);
  navLinks.forEach(link => link.classList.remove('active'));
  if (current) {
    let id = current.getAttribute('id');
    let activeLink = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (activeLink) activeLink.classList.add('active');
  }
});

// --- Section Reveal Animation on Scroll ---
function revealSectionsOnScroll() {
  const sections = document.querySelectorAll('.section-card');
  const trigger = window.innerHeight * 0.85;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < trigger) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSectionsOnScroll);
window.addEventListener('DOMContentLoaded', revealSectionsOnScroll);

// --- Feedback Form Success Animation ---
const feedbackForm = document.getElementById('feedbackForm');
const feedbackMessage = document.getElementById('feedbackMessage');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    feedbackMessage.innerHTML = '<span class="success-check">✔</span> Thank you for your feedback!';
    feedbackForm.reset();
    setTimeout(() => { feedbackMessage.innerHTML = ''; }, 3000);
  });
} 