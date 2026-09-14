// ==========================================================================
// Theme (Light / Dark Mode) Management
// ==========================================================================
(function() {
  const currentTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (currentTheme === 'dark' || (!currentTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle (SVG icons)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('theme-icon-moon');
  const sunIcon = document.getElementById('theme-icon-sun');

  function updateThemeUI(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'dark') {
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunIcon) sunIcon.style.display = 'block';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
      themeToggleBtn.setAttribute('title', 'Switch to light mode');
    } else {
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunIcon) sunIcon.style.display = 'none';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
      themeToggleBtn.setAttribute('title', 'Switch to dark mode');
    }
  }

  const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeUI(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateThemeUI(targetTheme);
    });
  }

  // ==========================================================================
  // Tab Switching Logic (pbb.sh Header & Content)
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const currentTabTitle = document.getElementById('current-tab-title');

  const tabTitles = {
    'tab-about': 'About',
    'tab-papers': 'Papers',
    'tab-projects': 'Tools & Projects',
    'tab-contact': 'Contact'
  };

  function switchTab(targetTabId) {
    const targetPane = document.getElementById(targetTabId);
    if (!targetPane) return;

    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === targetTabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === targetTabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    if (currentTabTitle && tabTitles[targetTabId]) {
      currentTabTitle.textContent = tabTitles[targetTabId];
    }

    const cleanHash = targetTabId.replace('tab-', '');
    if (history.replaceState) {
      history.replaceState(null, null, '#' + cleanHash);
    } else {
      location.hash = '#' + cleanHash;
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      switchTab(targetTabId);
    });
  });

  // Check URL hash on initial load
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const tabFromHash = 'tab-' + hash;
    if (document.getElementById(tabFromHash)) {
      switchTab(tabFromHash);
    }
  }

  // ==========================================================================
  // BibTeX Toggle & Copy Functionality
  // ==========================================================================
  const bibButtons = document.querySelectorAll('.toggle-bib-btn');

  bibButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const bibBlock = document.getElementById(targetId);
      if (bibBlock) {
        bibBlock.classList.toggle('open');
      }
    });
  });

  const copyButtons = document.querySelectorAll('.copy-bib-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const bibBlock = document.getElementById(targetId);
      if (bibBlock) {
        const text = bibBlock.querySelector('pre').innerText;
        navigator.clipboard.writeText(text).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy BibTeX: ', err);
        });
      }
    });
  });
});
