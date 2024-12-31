document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Particle.js initialization
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // AOS initialization
    AOS.init({
        duration: 1000,
        once: true,
        mirror: true,
        offset: 100
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / speed;

        const updateCount = () => {
            count += inc;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(handleIntersection, {
        threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));


    // Background music
    const backgroundMusic = document.getElementById('background-music');
    const toggleMusicBtn = document.getElementById('toggle-music');
    const volumeSlider = document.getElementById('volume-slider');
    let isPlaying = false;

    const toggleMusic = () => {
        if (isPlaying) {
            backgroundMusic.pause();
            toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            backgroundMusic.play();
            toggleMusicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    };

    toggleMusicBtn.addEventListener('click', toggleMusic);

    volumeSlider.addEventListener('input', (e) => {
        backgroundMusic.volume = e.target.value;
    });

    // Autoplay music when user interacts with the page
    const autoplayMusic = () => {
        if (!isPlaying) {
            toggleMusic();
        }
        document.removeEventListener('click', autoplayMusic);
    };

    document.addEventListener('click', autoplayMusic, { once: true });

    // Snowfall effect
    const createSnowflake = () => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * window.innerWidth}px`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.opacity = Math.random();
        snowflake.innerHTML = '❄';
        
        const snowfallContainer = document.getElementById('snowfall');
        snowfallContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    };

    setInterval(createSnowflake, 200);

    // Glitch effect on scroll
    const glitchElements = document.querySelectorAll('.glitch');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            glitchElements.forEach(element => {
                element.style.animation = 'none';
                void element.offsetWidth; // Trigger reflow
                element.style.animation = null;
            });
            lastScrollTop = scrollTop;
        }
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyImageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyImageObserver.observe(img));

    // Form submission handling (if applicable)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    }

    // Responsive navigation
    const handleResponsiveNav = () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    };

    window.addEventListener('resize', handleResponsiveNav);

    // Initialize tooltips (if using a tooltip library)
    // Example: tippy('[data-tippy-content]');

    // Add any additional interactive features or animations here
});

