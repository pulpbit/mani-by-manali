// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle?.classList.remove('active');
      }
    }
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach(el => observer.observe(el));

// Product filters (optional, on products page)
const filterPills = document.querySelectorAll('[data-filter]');
const productCards = document.querySelectorAll('[data-category]');

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const cat = pill.dataset.filter;
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    productCards.forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = '';
        requestAnimationFrame(() => card.classList.add('show'));
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Auto-fill WhatsApp message with product name
document.querySelectorAll('[data-product-name]').forEach(btn => {
  const name = btn.dataset.productName;
  const base = 'https://wa.me/919673974620?text=Hello%20I%20want%20to%20order%20';
  btn.setAttribute('href', base + encodeURIComponent(name));
});
