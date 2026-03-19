document.addEventListener('DOMContentLoaded', function () {

    /** Mobile menu */
    const navbarMenu = document.getElementById('navbar__menu');
    const navbarCollapse = document.getElementById('navbar');
    const body = document.body;

    if (navbarMenu && navbarCollapse) {
        navbarMenu.addEventListener('click', function () {
            this.classList.toggle('open');
            navbarCollapse.classList.toggle('open');

            if (body.classList.contains('menu-open')) {
                setTimeout(() => {
                    body.classList.remove('menu-open');
                }, 350);
            } else {
                body.classList.add('menu-open');
            }
        });

        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarMenu.classList.remove('open');
                navbarCollapse.classList.remove('open');

                setTimeout(() => {
                    body.classList.remove('menu-open');
                }, 350);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('open')) {
                navbarMenu.classList.remove('open');
                navbarCollapse.classList.remove('open');

                setTimeout(() => {
                    body.classList.remove('menu-open');
                }, 350);
            }
        });

        document.addEventListener('click', function (e) {
            if (!navbarMenu.contains(e.target) &&
                !navbarCollapse.contains(e.target) &&
                navbarCollapse.classList.contains('open')) {
                navbarMenu.classList.remove('open');
                navbarCollapse.classList.remove('open');

                setTimeout(() => {
                    body.classList.remove('menu-open');
                }, 350);
            }
        });
    }

    /** To top and Call buttons */
    const scrollTopButton = document.getElementById('scroll-top');
    const callButton = document.getElementById('call');

    const getViewportHeight = () => window.innerHeight;

    const setupButtonVisibility = (button, showThreshold, viewportHeight) => {
        if (!button) return;

        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition > showThreshold) {
            button.style.display = 'block';
            setTimeout(() => {
                button.style.opacity = '1';
            }, 10);
        } else {
            button.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= showThreshold) {
                    button.style.display = 'none';
                }
            }, 300);
        }
    };

    const initButtonStyles = (button) => {
        if (!button) return;
        button.style.opacity = '0';
        button.style.display = 'none';
        button.style.transition = 'opacity 0.3s ease';
    };

    scrollTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    if (callButton) {
        callButton.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }

    const toggleButtons = () => {
        const viewportHeight = getViewportHeight();

        setupButtonVisibility(scrollTopButton, viewportHeight, viewportHeight);
        setupButtonVisibility(callButton, viewportHeight * 0.2, viewportHeight);
    };

    initButtonStyles(scrollTopButton);
    initButtonStyles(callButton);

    window.addEventListener('scroll', toggleButtons);

    toggleButtons();

    /** Swiper Slider */
    try {
        const swiper = new Swiper(".swiper-slider", {
            loop: true,
            centeredSlides: true,
            slidesPerView: "auto",
            spaceBetween: 40,
            speed: 800,

            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },

            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },

            navigation: {
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
            },

            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 12,
                    centeredSlides: false
                },
                768: {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    centeredSlides: true
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});