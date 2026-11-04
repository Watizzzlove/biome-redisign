document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = themeToggle.querySelector('.theme-label');
  const htmlEl = document.documentElement;
  const dynamicImgs = document.querySelectorAll('.dynamic-theme-img');
  const fullBoardImg = document.getElementById('fullBoardImg');

  // Theme Toggle Functionality
  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('biome_theme', theme);

    if (theme === 'dark') {
      themeLabel.textContent = 'Светлая тема';
      dynamicImgs.forEach(img => {
        const darkSrc = img.getAttribute('data-dark');
        if (darkSrc) img.src = darkSrc;
      });
      if (fullBoardImg) {
        fullBoardImg.src = fullBoardImg.getAttribute('data-dark');
      }
    } else {
      themeLabel.textContent = 'Тёмная тема';
      dynamicImgs.forEach(img => {
        const lightSrc = img.getAttribute('data-light');
        if (lightSrc) img.src = lightSrc;
      });
      if (fullBoardImg) {
        fullBoardImg.src = fullBoardImg.getAttribute('data-light');
      }
    }
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  });

  // Check saved theme or preference
  const savedTheme = localStorage.getItem('biome_theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }

  // View Switcher (Redesign Only vs Compare)
  const switchBtns = document.querySelectorAll('.switch-btn');
  const originalViews = document.querySelectorAll('.original-view');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-view');
      if (mode === 'compare') {
        originalViews.forEach(v => v.classList.remove('hidden'));
      } else {
        originalViews.forEach(v => v.classList.add('hidden'));
      }
    });
  });

  // Lightbox Modal
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  const zoomableImages = document.querySelectorAll('.phone-frame img, .board-preview-card img');
  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
});
