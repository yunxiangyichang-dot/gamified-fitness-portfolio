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

document.querySelectorAll('.doc-image-row').forEach(function (row) {
  var imgs = row.querySelectorAll('.doc-image');
  imgs.forEach(function (img, idx) {
    img.classList.add('reveal');
    img.style.transitionDelay = (idx * 0.12) + 's';
    revealObserver.observe(img);
  });
});

document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
  var slides = carousel.querySelectorAll('[data-slide]');
  var thumbs = carousel.querySelectorAll('.crazy8-thumb');
  var counter = carousel.querySelector('.crazy8-counter-current');
  var prevBtn = carousel.querySelector('.crazy8-arrow-prev');
  var nextBtn = carousel.querySelector('.crazy8-arrow-next');
  var total = slides.length;
  var current = 0;
  var animating = false;
  var FLIP_DURATION = 750;

  function go(index) {
    if (total === 0 || animating) return;
    var newIndex = ((index % total) + total) % total;
    if (newIndex === current) return;

    var isForward;
    if (newIndex === 0 && current === total - 1) isForward = true;
    else if (newIndex === total - 1 && current === 0) isForward = false;
    else isForward = newIndex > current;

    var oldSlide = slides[current];
    var newSlide = slides[newIndex];
    var outClass = isForward ? 'is-leaving-fwd' : 'is-leaving-back';
    var inClass = isForward ? 'is-entering-fwd' : 'is-entering-back';

    animating = true;
    oldSlide.classList.remove('is-active');
    oldSlide.classList.add(outClass);
    newSlide.classList.add(inClass);

    thumbs.forEach(function (t, i) {
      t.classList.toggle('is-active', i === newIndex);
    });
    if (counter) counter.textContent = String(newIndex + 1);

    setTimeout(function () {
      oldSlide.classList.remove(outClass);
      newSlide.classList.remove(inClass);
      newSlide.classList.add('is-active');
      animating = false;
    }, FLIP_DURATION);

    current = newIndex;
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); });

  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { go(i); });
  });

  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
  });
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
  lightbox.classList.remove('rotate-cw');
  lightbox.classList.remove('rotate-ccw');
  lightboxImage.removeAttribute('src');
}

document.querySelectorAll('[data-lightbox]').forEach(function (image) {
  image.addEventListener('click', function () {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.getAttribute('src');
    lightbox.classList.remove('rotate-cw');
    lightbox.classList.remove('rotate-ccw');
    var rot = image.getAttribute('data-lightbox-rotate');
    if (rot === 'cw') {
      lightbox.classList.add('rotate-cw');
    } else if (rot === 'ccw') {
      lightbox.classList.add('rotate-ccw');
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
