// Main.js - General UI Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Load and inject navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('/components/navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarContainer.innerHTML = html;
                highlightActiveNavLink();
            })
            .catch(error => console.error('Error loading navbar:', error));
    }

    // Highlight active navigation link
    function highlightActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (currentPath.includes('/pages/html/')) {
                if (link.id === 'nav-html') link.classList.add('active');
            } else if (currentPath.includes('/pages/css/')) {
                if (link.id === 'nav-css') link.classList.add('active');
            } else if (currentPath.includes('/pages/js/')) {
                if (link.id === 'nav-js') link.classList.add('active');
            } else if (currentPath.includes('tryit')) {
                if (link.id === 'nav-editor') link.classList.add('active');
            } else {
                if (link.id === 'nav-home') link.classList.add('active');
            }
        });
    }

    // Highlight active sidebar link
    function highlightActiveSidebarLink() {
        const currentPath = window.location.pathname;
        const sidebarLinks = document.querySelectorAll('.sidebar a');
        
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (currentPath.includes(href)) {
                link.classList.add('active');
            }
        });
    }

    // Re-highlight active links after navigation
    setTimeout(highlightActiveSidebarLink, 100);

    // Scroll to top functionality
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border: none;
        color: white;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollButton.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });

    scrollButton.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
