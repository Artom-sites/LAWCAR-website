/**
 * LAWCAR - Premium Car Detailing Website
 * JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive components
    initFAQ();
    initDropdown();
    initSmoothScroll();
    initHeaderScroll();
    initFormSubmit();
    initServiceTabs();
    initMobileMenu();
    initLangSwitcher();
});

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
}

/**
 * Service Tabs
 */
function initServiceTabs() {
    const tabs = document.querySelectorAll('.service-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Here you could filter services based on tab
            // For now, we just toggle the active state
            const tabType = tab.dataset.tab;
            console.log('Selected tab:', tabType);
        });
    });
}

/**
 * Navigation Dropdown (for mobile/touch devices)
 */
function initDropdown() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        // For touch devices, toggle on click
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Close other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });

            dropdown.classList.toggle('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
}

/**
 * Smooth Scroll for navigation links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header scroll effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(0, 0, 0, 0.85)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Contact Form Submit - Telegram Integration
 */
function initFormSubmit() {
    const form = document.querySelector('.contact-form');

    // === TELEGRAM BOT SETTINGS ===
    // Замініть на свої дані:
    const TELEGRAM_BOT_TOKEN = '8314260257:AAGMpZPPokoBt9t-TXfn7r9rFRLl6m7usuI';
    const TELEGRAM_CHAT_ID = '-1002917867010';

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = form.querySelector('input[name="name"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const car = form.querySelector('input[type="text"]:not([name="name"])').value;

            // Simple validation
            if (!name || !phone || !car) {
                alert(window.currentLang === 'de' ? 'Bitte füllen Sie alle Felder aus' :
                    window.currentLang === 'ru' ? 'Пожалуйста, заполните все поля' :
                        'Будь ласка, заповніть всі поля');
                return;
            }

            // Prepare Telegram message
            const message = `🚗 *Нова заявка з сайту LAWCAR*

👤 *Ім'я:* ${name}
📱 *Телефон:* ${phone}
🚙 *Авто:* ${car}
🕐 *Час:* ${new Date().toLocaleString('uk-UA')}`;

            try {
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                });

                if (response.ok) {
                    alert(window.currentLang === 'de' ? 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.' :
                        window.currentLang === 'ru' ? 'Спасибо! Мы свяжемся с вами в ближайшее время.' :
                            'Дякуємо! Ми зв\'яжемося з вами найближчим часом.');
                    form.reset();
                } else {
                    throw new Error('Telegram API error');
                }
            } catch (error) {
                console.error('Error sending to Telegram:', error);
                alert('Помилка відправки. Спробуйте пізніше.');
            }
        });
    }
}

/**
 * Parallax effect for hero car (optional enhancement)
 */
function initParallax() {
    const heroCar = document.querySelector('.hero-car');

    if (heroCar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            heroCar.style.transform = `translateY(${rate}px)`;
        });
    }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuBtn.classList.toggle('active');
            nav.classList.toggle('mobile-open');
            header.classList.toggle('menu-open');
        });

        // Close menu when clicking on actual page links (not dropdown toggles)
        const pageLinks = nav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
        pageLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                nav.classList.remove('mobile-open');
                header.classList.remove('menu-open');
            });
        });

        // Handle dropdown toggle in mobile - must use stopPropagation
        const dropdownToggles = nav.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (nav.classList.contains('mobile-open')) {
                    const dropdown = toggle.closest('.nav-dropdown');
                    dropdown.classList.toggle('active');
                }
            });
        });
    }
}

/**
 * Language Switcher with i18n Support
 */
let translations = {};
window.currentLang = 'uk';

async function initLangSwitcher() {
    // Load translations
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
        return;
    }

    const langSwitcher = document.querySelector('.lang-switcher');
    const langDropdown = document.querySelector('.lang-dropdown');

    if (langSwitcher && langDropdown) {
        langSwitcher.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langDropdown.classList.remove('active');
        });

        // Handle language selection
        const langOptions = langDropdown.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;

                // Update button text
                langSwitcher.querySelector('span').textContent = lang.toUpperCase();

                // Apply translations
                applyTranslations(lang);

                // Save preference
                localStorage.setItem('lawcar-lang', lang);

                langDropdown.classList.remove('active');
            });
        });

        // Load saved language preference
        const savedLang = localStorage.getItem('lawcar-lang');
        if (savedLang && translations[savedLang]) {
            langSwitcher.querySelector('span').textContent = savedLang.toUpperCase();
            applyTranslations(savedLang);
        }
    }
}

function applyTranslations(lang) {
    if (!translations[lang]) return;

    window.currentLang = lang;
    const t = translations[lang];

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const navKeys = ['nav.about', 'nav.services', 'nav.works', 'nav.reviews', 'nav.faq'];
    navLinks.forEach((link, i) => {
        if (t[navKeys[i]]) link.textContent = t[navKeys[i]];
    });

    // Section titles
    document.querySelectorAll('.section-title').forEach(el => {
        const section = el.closest('section');
        if (!section) return;

        if (section.classList.contains('about') && t['about.title']) el.textContent = t['about.title'];
        if (section.classList.contains('services') && t['services.title']) el.textContent = t['services.title'];
        if (section.classList.contains('process') && t['process.title']) el.textContent = t['process.title'];
        if (section.classList.contains('faq') && t['faq.title']) el.textContent = t['faq.title'];
    });

    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceKeys = ['wash', 'cleaning', 'detailing', 'polish', 'ceramic', 'ppf'];
    serviceCards.forEach((card, i) => {
        const title = card.querySelector('.service-title');
        const desc = card.querySelector('.service-description');
        const btn = card.querySelector('.service-link');

        if (title && t[`services.${serviceKeys[i]}.title`]) title.textContent = t[`services.${serviceKeys[i]}.title`];
        if (desc && t[`services.${serviceKeys[i]}.desc`]) desc.textContent = t[`services.${serviceKeys[i]}.desc`];
        if (btn && t['services.order']) btn.textContent = t['services.order'];
    });

    // Process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, i) => {
        const title = step.querySelector('.step-title');
        const text = step.querySelector('.step-text');

        if (title && t[`process.step${i + 1}.title`]) title.textContent = t[`process.step${i + 1}.title`];
        if (text && t[`process.step${i + 1}.text`]) text.textContent = t[`process.step${i + 1}.text`];
    });

    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, i) => {
        const question = item.querySelector('.faq-question span:first-child');
        const answer = item.querySelector('.faq-answer');

        if (question && t[`faq.q${i + 1}`]) question.textContent = t[`faq.q${i + 1}`];
        if (answer && t[`faq.a${i + 1}`]) answer.textContent = t[`faq.a${i + 1}`];
    });

    // Footer CTA
    const ctaTitle = document.querySelector('.cta-title');
    if (ctaTitle && t['footer.cta']) ctaTitle.textContent = t['footer.cta'];

    // Form placeholders
    const nameInput = document.querySelector('input[name="name"]');
    const phoneInput = document.querySelector('input[type="tel"]');
    const carInput = document.querySelector('input[type="text"]:not([name="name"])');
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');

    if (nameInput && t['form.name']) nameInput.placeholder = t['form.name'];
    if (phoneInput && t['form.phone']) phoneInput.placeholder = t['form.phone'];
    if (carInput && t['form.car']) carInput.placeholder = t['form.car'];
    if (submitBtn && t['form.submit']) submitBtn.textContent = t['form.submit'];
}
