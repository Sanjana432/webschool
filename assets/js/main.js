// Main.js - General UI Interactions

(function () {
    function getBasePath() {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const isGithubPages = window.location.hostname.endsWith('github.io') && segments.length > 0;
        return isGithubPages ? `/${segments[0]}` : '';
    }

    function toSitePath(path) {
        const normalized = path.startsWith('/') ? path : `/${path}`;
        return `${getBasePath()}${normalized}`;
    }

    async function fetchPartial(pathOptions) {
        for (const path of pathOptions) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    return await response.text();
                }
            } catch (_) {
                // try next option
            }
        }
        throw new Error(`Unable to load partial: ${pathOptions.join(', ')}`);
    }

    function normalizeLinksForHosting() {
        document.querySelectorAll('a[href^="/"]').forEach((link) => {
            const href = link.getAttribute('href');
            link.setAttribute('href', toSitePath(href));
        });
    }

    function highlightActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar-links a');

        navLinks.forEach((link) => link.classList.remove('active'));

        if (currentPath.includes('/pages/html/')) {
            document.getElementById('nav-html')?.classList.add('active');
        } else if (currentPath.includes('/pages/css/')) {
            document.getElementById('nav-css')?.classList.add('active');
        } else if (currentPath.includes('/pages/js/')) {
            document.getElementById('nav-js')?.classList.add('active');
        } else if (currentPath.includes('tryit')) {
            document.getElementById('nav-editor')?.classList.add('active');
        } else {
            document.getElementById('nav-home')?.classList.add('active');
        }
    }

    function highlightActiveSidebarLink() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.sidebar a').forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            if (href.includes('/pages/')) {
                const cleanHref = href.replace(getBasePath(), '');
                if (currentPath.endsWith(cleanHref) || currentPath.includes(cleanHref)) {
                    link.classList.add('active');
                }
            }
        });
    }

    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const storageKey = 'webschool_theme';

        const applyTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            if (themeToggle) {
                themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
            }
        };

        const storedTheme = localStorage.getItem(storageKey) || 'light';
        applyTheme(storedTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
                localStorage.setItem(storageKey, nextTheme);
                applyTheme(nextTheme);
            });
        }
    }

    function setupScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.id = 'scroll-to-top';
        scrollButton.innerHTML = '↑';
        scrollButton.setAttribute('aria-label', 'Scroll to top');

        document.body.appendChild(scrollButton);

        window.addEventListener('scroll', () => {
            scrollButton.style.display = window.pageYOffset > 300 ? 'grid' : 'none';
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            const navbarHtml = await fetchPartial([
                toSitePath('/components/navbar.html'),
                '/components/navbar.html',
                'components/navbar.html',
                '../components/navbar.html',
                '../../components/navbar.html'
            ]);
            navbarContainer.innerHTML = navbarHtml;
        }

        normalizeLinksForHosting();
        highlightActiveNavLink();
        highlightActiveSidebarLink();
        setupThemeToggle();
        setupScrollToTop();
    });
})();
