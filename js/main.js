/* ============ NAV TOGGLE (mobile menu) ============ */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}
if (navClose) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}
document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/* ============ HEADER BACKGROUND ON SCROLL ============ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY >= 50);
});

/* ============ ACTIVE LINK ON SCROLL ============ */
const sections = document.querySelectorAll('section[id]');
function markActiveLink() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);
    if (!link) return;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', markActiveLink);

/* ============ SCROLL UP BUTTON ============ */
const scrollUp = document.getElementById('scroll-up');
window.addEventListener('scroll', () => {
  scrollUp.classList.toggle('show-scroll', window.scrollY >= 350);
});

/* ============ CUSTOM CURSOR ============ */
const cursor = document.getElementById('cursor');
if (cursor && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll('a, button, .work__card, .services__header').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });
  document.addEventListener('mouseleave', () => cursor.classList.add('cursor--hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('cursor--hidden'));
}

/* ============ HOME CIRCULAR ROTATING TEXT ============ */
const circularText = 'FULL STACK DEVELOPER • REACT • NODE.JS • ';
const circularContainer = document.getElementById('home-circular');

if (circularContainer) {
  const chars = circularText.split(''); // Converts text into an array of characters
  const angleStep = 360 / chars.length; // Angle for each character; length counts the number of characters
  circularContainer.innerHTML = ''; // Clears the original content

  const radius = circularContainer.clientWidth / 2 - 8; // Radius derived from the container so it scales on any screen size

  chars.forEach((char, i) => { // Iterates through each character
    const span = document.createElement('span'); // Creates a <span> for each letter
    span.textContent = char; // Inserts each character into the span
    const angle = angleStep * i; // Rotates each letter based on its index to form the circle
    span.style.transform = `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`;
    circularContainer.appendChild(span); // Appends the span to the main container
  });
}

/* ============ HOME TYPED EFFECT ============ */
const professions = ['Web Developer', 'Backend Developer', 'React Developer', 'Problem Solver']; // Insert professions
const typedEl = document.getElementById('home-typed');

if (typedEl) {
  let profIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = professions[profIndex];

    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        profIndex = (profIndex + 1) % professions.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
  }
  typeLoop();
}

/* ============ SERVICES ACCORDION ============ */
const serviceHeaders = document.querySelectorAll('.services__header'); // It iterates over each button found

serviceHeaders.forEach((header) => {
  header.addEventListener('click', () => {
    const card = header.parentElement; // Get the class of the clicked button (.services__card) and ⬇
    const isOpen = card.classList.contains('services-open'); // Check already has the services-open class (Returns true or false)

    document.querySelectorAll('.services__card').forEach((c) => c.classList.remove('services-open')); // Close all other services data

    if (!isOpen) { // If the clicked card was closed, it opens it
      card.classList.add('services-open');
    }
  });
});

/* ============ SCROLL REVEAL ============ */
const revealTargets = document.querySelectorAll(
  '.about__data, .about__stats, .work__card, .services__card, .skills__group, .testimonials__card, .contact__data, .contact__form'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

/* ============ CONTACT FORM (EmailJS) ============
   The code below is a sample/test integration.
   Create a free account at https://www.emailjs.com/,
   then replace the placeholders below with your own IDs
   following EmailJS's setup instructions (Service, Template, Public Key).
*/
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

if (window.emailjs && PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(PUBLIC_KEY);
}

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the page from reloading

    if (!window.emailjs || PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      contactStatus.textContent = 'Contact form not yet connected — add your EmailJS IDs in js/main.js';
      contactStatus.className = 'contact__form-status contact__form-status--error';
      return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, '#contact-form') // serviceID - templateID - #form - publicKey
      .then(() => {
        contactStatus.textContent = 'Message sent successfully ✅'; // Show sent message
        contactStatus.className = 'contact__form-status contact__form-status--ok';
        contactForm.reset(); // Clear input fields
        setTimeout(() => { contactStatus.textContent = ''; }, 5000); // Remove message after five seconds
      })
      .catch(() => {
        contactStatus.textContent = 'Message not sent (service error) ❌'; // Show error message
        contactStatus.className = 'contact__form-status contact__form-status--error';
        setTimeout(() => { contactStatus.textContent = ''; }, 5000);
      });
  });
}
