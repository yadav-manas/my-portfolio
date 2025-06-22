console.log('Script loaded');

// Projects Data
const projects = [
  {
    title: "Wanderlust - Travel & Tourism Website",
    description: "A modern web application for discovering destinations and booking tours. Explore amazing places and create unforgettable memories.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://yadav-manas.github.io/Travel-Tourism-Website/",
    github: "https://github.com/yadav-manas/Travel-Tourism-Website"
  }
];

// Render Projects
const projectsGrid = document.getElementById('projectsGrid');
if (projectsGrid) {
  console.log('Rendering projects');
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card tilt-card';
    card.innerHTML = `
      <div class="project-title">${project.title}</div>
      <div class="project-desc">${project.description}</div>
      <div class="project-tech">
        ${project.tech.map(t => `<span>${t}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>
        <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
} else {
  console.error('projectsGrid element not found');
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        formMessage.innerHTML = '<span class="success-check">✔</span> Thank you for your message!';
        contactForm.reset();
      } else {
        formMessage.innerHTML = 'Oops! There was a problem submitting your form.';
      }
    } catch (error) {
      formMessage.innerHTML = 'Oops! There was a problem submitting your form.';
    }
    setTimeout(() => formMessage.innerHTML = '', 4000);
  });
} else {
  console.error('contactForm element not found');
}

// Animated Text
const animatedText = document.getElementById('animatedText');
const texts = [
  'Web Developer',
  'App Developer',
  'Tech Enthusiast',
  'Problem Solver'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    animatedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    animatedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 100 : 150;
  
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500; // Pause before next word
  }
  
  setTimeout(typeText, typeSpeed);
}

if (animatedText) {
  typeText();
}

// Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// 3D Tilt Effect (Optimized)
document.querySelectorAll('.tilt-card').forEach(card => {
  let ticking = false;
  card.addEventListener('mousemove', e => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -y / rect.height * 10;
        const rotateY = x / rect.width * 10;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        ticking = false;
      });
      ticking = true;
    }
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all section cards
document.querySelectorAll('.section-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});