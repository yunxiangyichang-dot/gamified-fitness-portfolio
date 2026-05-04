const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach(function (item) {
  revealObserver.observe(item);
});

const glow = document.querySelector('.ambient-glow');
if (glow) {
  window.addEventListener('pointermove', function (event) {
    glow.style.setProperty('--x', `${event.clientX}px`);
    glow.style.setProperty('--y', `${event.clientY}px`);
  });
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const lightboxClose = document.querySelector('.lightbox button');

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('open');
  lightbox.classList.remove('rotate-90');
  lightbox.classList.remove('rotate-270');
  lightboxImage.removeAttribute('src');
}

document.querySelectorAll('[data-lightbox]').forEach(function (image) {
  image.addEventListener('click', function () {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.getAttribute('src');
    if (image.getAttribute('data-lightbox-rotate') === '90') {
      lightbox.classList.add('rotate-90');
    }
    if (image.getAttribute('data-lightbox-rotate') === '270') {
      lightbox.classList.add('rotate-270');
    }
    lightbox.classList.add('open');
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) closeLightbox();
  });
}

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeLightbox();
});
