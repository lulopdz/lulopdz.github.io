// Client-side behaviour for the single-page layout: theme toggle, tab
// switching (with URL hash sync), BibTeX toggle/copy and the papers/tools
// filters. Loaded once as a module script from Layout.astro, so the DOM is
// already parsed when this runs.

// ---------------------------------------------------------------------------
// Theme toggle
// ---------------------------------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('theme-icon-moon');
const sunIcon = document.getElementById('theme-icon-sun');

function updateThemeUI(theme: string) {
  if (!themeToggleBtn) return;
  const isDark = theme === 'dark';
  if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'block';
  if (sunIcon) sunIcon.style.display = isDark ? 'block' : 'none';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  themeToggleBtn.setAttribute('aria-label', label);
  themeToggleBtn.setAttribute('title', label);
}

updateThemeUI(document.documentElement.getAttribute('data-theme') || 'light');

themeToggleBtn?.addEventListener('click', () => {
  const targetTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', targetTheme);
  try {
    localStorage.setItem('theme', targetTheme);
  } catch {}
  updateThemeUI(targetTheme);
});

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------
const tabButtons = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
const tabPanes = document.querySelectorAll<HTMLElement>('.tab-pane');
const currentTabTitle = document.getElementById('current-tab-title');

const tabTitles: Record<string, string> = {
  'tab-about': 'About',
  'tab-papers': 'Papers',
  'tab-teaching': 'Teaching',
  'tab-tools': 'Tools',
  'tab-contact': 'Contact',
};

function switchTab(targetTabId: string) {
  if (!document.getElementById(targetTabId)) return;

  tabButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === targetTabId));
  tabPanes.forEach((pane) => pane.classList.toggle('active', pane.id === targetTabId));

  if (currentTabTitle && tabTitles[targetTabId]) {
    currentTabTitle.textContent = tabTitles[targetTabId];
  }

  history.replaceState(null, '', '#' + targetTabId.replace('tab-', ''));
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (btn.dataset.tab) switchTab(btn.dataset.tab);
  });
});

function checkHash() {
  if (!window.location.hash) return;
  let hash = window.location.hash.slice(1);
  if (hash === 'projects') hash = 'tools'; // legacy URL
  switchTab('tab-' + hash);
}

checkHash();
window.addEventListener('hashchange', checkHash);

// ---------------------------------------------------------------------------
// BibTeX toggle & copy
// ---------------------------------------------------------------------------
document.querySelectorAll<HTMLButtonElement>('.toggle-bib-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const bibBlock = btn.dataset.target ? document.getElementById(btn.dataset.target) : null;
    bibBlock?.classList.toggle('open');
  });
});

document.querySelectorAll<HTMLButtonElement>('.copy-bib-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const bibBlock = btn.dataset.target ? document.getElementById(btn.dataset.target) : null;
    const text = bibBlock?.querySelector('pre')?.innerText ?? '';
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2000);
      })
      .catch((err) => console.error('Failed to copy BibTeX: ', err));
  });
});

// ---------------------------------------------------------------------------
// Papers: year & featured filter
// ---------------------------------------------------------------------------
// Scoped to the Papers pane: the Teaching pane reuses .year-group for its timeline
const yearPills = document.querySelectorAll<HTMLButtonElement>('#tab-papers .year-pill');
const yearGroups = document.querySelectorAll<HTMLElement>('#tab-papers .year-group');

let currentFilter =
  document.querySelector<HTMLButtonElement>('.year-pill.active')?.dataset.yearFilter || 'featured';

function applyPaperFilters() {
  yearGroups.forEach((group) => {
    const groupYear = group.dataset.yearGroup;
    let visibleCount = 0;

    group.querySelectorAll<HTMLElement>('.pub-item').forEach((paper) => {
      const matches =
        currentFilter === 'all' ||
        (currentFilter === 'featured' && paper.dataset.featured === 'true') ||
        currentFilter === groupYear;
      paper.style.display = matches ? 'block' : 'none';
      if (matches) visibleCount++;
    });

    group.style.display = visibleCount > 0 ? 'flex' : 'none';
  });
}

applyPaperFilters();

yearPills.forEach((pill) => {
  pill.addEventListener('click', (e) => {
    e.preventDefault();
    yearPills.forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
    currentFilter = pill.dataset.yearFilter || 'all';
    applyPaperFilters();
  });
});

// ---------------------------------------------------------------------------
// Tools: tag filter
// ---------------------------------------------------------------------------
const toolPills = document.querySelectorAll<HTMLButtonElement>('.tool-pill');
const toolCards = document.querySelectorAll<HTMLElement>('.tool-card');

let currentToolFilter = 'all';

function applyToolFilters() {
  toolCards.forEach((card) => {
    const cardTags = (card.dataset.tags || '').split(',');
    const matches = currentToolFilter === 'all' || cardTags.includes(currentToolFilter.toLowerCase());
    card.style.display = matches ? 'flex' : 'none';
  });
}

toolPills.forEach((pill) => {
  pill.addEventListener('click', (e) => {
    e.preventDefault();
    toolPills.forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
    currentToolFilter = pill.dataset.toolFilter || 'all';
    applyToolFilters();
  });
});
