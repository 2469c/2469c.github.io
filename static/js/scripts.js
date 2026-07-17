window.addEventListener('DOMContentLoaded', () => {

    // Language switch
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'zh';
            const next = current === 'en' ? 'zh' : 'en';
            document.documentElement.setAttribute('data-lang', next);
            document.documentElement.setAttribute('lang', next);
            try { localStorage.setItem('site-lang', next); } catch (e) { }
        });
    }

    // Mobile nav toggle
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                toggle.setAttribute('aria-expanded', false);
            });
        });
    }

    // Scrollspy: highlight the nav link of the section in view
    const spyLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const spyMap = new Map();
    spyLinks.forEach(a => {
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) spyMap.set(el, a);
    });
    if ('IntersectionObserver' in window && spyMap.size) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    spyLinks.forEach(a => a.classList.remove('active'));
                    spyMap.get(entry.target)?.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        spyMap.forEach((_, el) => observer.observe(el));
    }

});
