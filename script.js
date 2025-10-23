document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only for on-page links
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                e.preventDefault();
    
                // Store hash
                var hash = this.hash;
    
                // Get the target element
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    // Get navbar height
                    const navbarHeight = document.getElementById('mainNav') ? document.getElementById('mainNav').offsetHeight : 0;
                    
                    // Calculate position
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20; // 20px offset

                    // Scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Function to set theme
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    };

    // Get preferred theme from localStorage or system preference
    const getPreferredTheme = () => {
        const storedTheme = localStorage.getItem('portfolio-theme');
        if (storedTheme) {
            return storedTheme;
        }
        // Default to dark mode as per the HTML
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    // Apply the preferred theme on load
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    // Toggle button click event
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // --- Multi-Role "Slider" (Tabbed Interface) ---
    const roleTabs = document.querySelectorAll('.role-tabs .nav-link');
    const rolePanes = document.querySelectorAll('.role-pane');

    roleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Get the target role from data attribute
            const targetRole = tab.getAttribute('data-role');

            // Deactivate all tabs and panes
            roleTabs.forEach(t => t.classList.remove('active'));
            rolePanes.forEach(p => p.classList.remove('active'));

            // Activate the clicked tab and corresponding pane
            tab.classList.add('active');
            document.getElementById(`role-${targetRole}`).classList.add('active');
        });
    });
    
    // --- Navbar Shrink on Scroll ---
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        // Run on load
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-scrolled');
        } else {
            mainNav.classList.remove('navbar-scrolled');
        }
        // Run on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainNav.classList.add('navbar-scrolled');
            } else {
                mainNav.classList.remove('navbar-scrolled');
            }
        });
    }

    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});