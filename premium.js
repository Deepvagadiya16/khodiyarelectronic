// premium.js - Handles Lenis Smooth Scroll, Custom Cursor, and Advanced Interactions

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lenis Smooth Scrolling ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    // --- 4. Auto-Apply Hover Glow ---
    const glowElements = document.querySelectorAll('.btn, .service-card');
    glowElements.forEach(el => {
        el.classList.add('hover-glow');
    });

    // --- 5. Parallax Scrolling Engine ---
    const heroBg = document.querySelector('.hero');
    const floatingIcons = document.querySelectorAll('.hero-trust .trust-badge');

    lenis.on('scroll', (e) => {
        const scrolled = e.scroll;
        
        // Hero Background Parallax (moves slower than scroll)
        if(heroBg && scrolled < window.innerHeight) {
            heroBg.style.backgroundPositionY = (scrolled * 0.4) + 'px';
        }

        // Floating Icons in hero
        floatingIcons.forEach((icon, index) => {
            const speed = 0.05 * (index + 1);
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Section Background Color Transitions
        // Transition from White to Soft Gray based on scroll depth
        const sections = document.querySelectorAll('section');
        let currentBgHex = null;
        
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            // If section is predominantly in view
            if(rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                if(sec.classList.contains('bg-dark')) {
                    currentBgHex = document.documentElement.getAttribute('data-theme') === 'dark' ? 'var(--secondary)' : '#0F172A';
                } else if(sec.classList.contains('bg-light')) {
                    currentBgHex = 'var(--section-bg)';
                } else {
                    currentBgHex = 'var(--background)';
                }
            }
        });

        if(currentBgHex) {
           document.body.style.backgroundColor = currentBgHex;
        }

        // Animation Timeline Fill
        const timeline = document.getElementById('repair-timeline');
        const timelineFill = document.getElementById('timeline-fill');
        if(timeline && timelineFill) {
            const rect = timeline.getBoundingClientRect();
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                let scrollPercentage = ((window.innerHeight - rect.top) / (rect.height + window.innerHeight/3)) * 100;
                scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));
                timelineFill.style.height = scrollPercentage + '%';
            }
        }
    });

    // --- 6. Loading Screen Out ---
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if(loadingScreen) loadingScreen.classList.add('hidden');
        }, 1200); // 1.2s boot animation
    });

    // --- 7. Image Comparison Slider ---
    const compContainer = document.getElementById('comp-slider');
    const compBefore = document.getElementById('comp-before');
    const compThumb = document.getElementById('comp-thumb');
    
    if(compContainer && compBefore && compThumb && !isTouchDevice) {
        let isDragging = false;
        
        // Initial setup wait for layout
        setTimeout(() => {
            const w = compContainer.offsetWidth;
            const h = compContainer.offsetHeight;
            compBefore.style.width = (w / 2) + "px";
            compThumb.style.top = (h / 2) + "px";
            compThumb.style.left = (w / 2) + "px";
        }, 100);

        function slide(e) {
            const rect = compContainer.getBoundingClientRect();
            let x = e.clientX - rect.left;
            
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;

            compBefore.style.width = x + "px";
            compThumb.style.left = x + "px";
        }

        compContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            slide(e);
        });
        window.addEventListener('mouseup', () => { isDragging = false; });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            slide(e);
        });

        // Add touch support
        compContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            slide(e.touches[0]);
        });
        window.addEventListener('touchend', () => { isDragging = false; });
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            slide(e.touches[0]);
        });
    }

});
