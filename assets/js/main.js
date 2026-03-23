document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const nav = document.getElementById('mainNav') || document.getElementById('navbar');
  const themeToggle = document.getElementById('themeToggle');
  const filterInput = document.getElementById('publicationFilter') || document.getElementById('search');
  const publications = document.querySelectorAll('.publication-item');
  const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  const trackedSections = Array.from(document.querySelectorAll('section[id]'));
  const hero = document.querySelector('.hero-section');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const collapseInstance = (navbarCollapse && window.bootstrap && bootstrap.Collapse)
    ? bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false })
    : null;
  const themeMediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const safeStorage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {}
    }
  };

  const getInitialTheme = () => {
    const storedTheme = safeStorage.get('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    return themeMediaQuery && themeMediaQuery.matches ? 'dark' : 'light';
  };

  const updateThemeToggleLabel = (theme) => {
    if (!themeToggle) return;
    themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  };

  const applyTheme = (theme, persist = true) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    updateThemeToggleLabel(theme);
    if (persist) {
      safeStorage.set('theme', theme);
    }
  };

  applyTheme(getInitialTheme(), false);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  if (themeMediaQuery && typeof themeMediaQuery.addEventListener === 'function') {
    themeMediaQuery.addEventListener('change', (event) => {
      if (safeStorage.get('theme')) return;
      applyTheme(event.matches ? 'dark' : 'light', false);
    });
  }

  const handleNavStyle = () => {
    if (!nav) return;
    if (window.scrollY > 18) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  handleNavStyle();
  window.addEventListener('scroll', handleNavStyle, { passive: true });

  const updateActiveNav = () => {
    if (!trackedSections.length) return;
    const threshold = window.scrollY + 140;

    let activeId = trackedSections[0].id;
    trackedSections.forEach((section) => {
      if (section.offsetTop <= threshold) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const isActive = href === `#${activeId}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);

  if (filterInput && publications.length) {
    filterInput.addEventListener('input', () => {
      const query = filterInput.value.trim().toLowerCase();

      publications.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const keywords = item.dataset.keywords ? item.dataset.keywords.toLowerCase() : '';
        const matches = text.includes(query) || keywords.includes(query);
        item.classList.toggle('is-hidden', !matches && query.length > 0);
      });
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && collapseInstance) {
        collapseInstance.hide();
      }
    });
  });

  if (hero) {
    const heroBackgrounds = [
      'assets/img/bg-masthead.jpg',
      'assets/img/hero-rot/GovSmartCities-bg-masthead.jpg',
      'assets/img/hero-rot/cloudnative-bg-masthead.jpg',
      'assets/img/hero-rot/q2020-bg-masthead.jpg',
      'assets/img/hero-rot/ArqIS2021-bg-masthead.jpg',
      'assets/img/hero-rot/eciciencia2025-bg-masthead.jpg',
      'assets/img/hero-rot/cloudnative2021-bg-masthead.jpg'
    ];

    let index = Math.floor(Math.random() * heroBackgrounds.length);

    const applyHeroBackground = () => {
      hero.style.backgroundImage = `url("${heroBackgrounds[index]}"), linear-gradient(180deg, #0f2442 0%, #173861 100%)`;
      hero.style.backgroundSize = 'cover, cover';
      hero.style.backgroundPosition = 'center center, center center';
      hero.style.backgroundRepeat = 'no-repeat, no-repeat';
    };

    applyHeroBackground();
    window.setInterval(() => {
      index = (index + 1) % heroBackgrounds.length;
      applyHeroBackground();
    }, 12000);
  }
});
