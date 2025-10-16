// Data Produk
const products = [
    {
        id: 'blue-night',
        name: 'Blue Night',
        image: 'BLUE NIGHT.jpg',
        description: 'Kombinasi aroma yang menyegarkan dan sejuk, cocok untuk pria modern yang aktif dan percaya diri di malam hari.',
        notes: {
            top: 'Bergamot, Grapefruit, Pink Pepper',
            middle: 'Marine Accord, Lavender, Geranium',
            base: 'Amberwood, Vetiver, Patchouli'
        }
    },
    {
        id: 'cool-man',
        name: 'Cool Man',
        image: 'COOLMAN.jpg',
        description: 'Aroma maskulin yang elegan, memberikan kesan profesional dan berkelas bagi pemakainya.',
        notes: {
            top: 'Mint, Green Apple, Lemon',
            middle: 'Tonka Bean, Ambroxan, Geranium',
            base: 'Madagascar Vanilla, Cedar, Oakmoss'
        }
    },
    {
        id: 'lucky',
        name: 'Lucky',
        image: 'LUCKY.jpg',
        description: 'Perpaduan aroma yang segar namun tetap kalem, menciptakan aura keberuntungan dan ketenangan.',
        notes: {
            top: 'Plum, Ozonic notes, Grapefruit',
            middle: 'Hazelnut, Honey, Cedar',
            base: 'Amberwood, Patchouli, Oakmoss'
        }
    },
    {
        id: 'pinkfon',
        name: 'Pinkfon',
        image: 'PINKFON.jpg',
        description: 'Wewangian manis dan feminim yang lembut, sempurna untuk menonjolkan sisi ceria dan romantis Anda.',
        notes: {
            top: 'Raspberry, Black Currant, Pear',
            middle: 'Peony, Rose, Freesia',
            base: 'Vanilla, Praline, Musk'
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');
    const modalOverlay = document.getElementById('product-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- LOGIKA UNTUK HAMBURGER MENU ---
    function toggleNavMenu() {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('nav-open');
        document.body.classList.toggle('nav-open');
        document.documentElement.classList.toggle('nav-open'); // Tambahkan ke HTML
    }

    function closeNavMenu() {
        if (navMenu.classList.contains('nav-open')) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('nav-open');
            document.body.classList.remove('nav-open');
            document.documentElement.classList.remove('nav-open'); // Hapus dari HTML
        }
    }

    hamburgerBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleNavMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', closeNavMenu);
    });

    document.addEventListener('click', (event) => {
        if (navMenu.classList.contains('nav-open') && !navMenu.contains(event.target)) {
            closeNavMenu();
        }
    });

    // --- LOGIKA UNTUK MODAL PRODUK ---
    function populateModal(productData) {
        document.getElementById('modal-img').src = productData.image;
        document.getElementById('modal-title').textContent = productData.name;
        document.getElementById('modal-description').textContent = productData.description;
        document.getElementById('modal-top-notes').textContent = productData.notes.top;
        document.getElementById('modal-middle-notes').textContent = productData.notes.middle;
        document.getElementById('modal-base-notes').textContent = productData.notes.base;
    }

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productId = card.getAttribute('data-id');
            const productData = products.find(p => p.id === productId);

            if (productData) {
                populateModal(productData);
                modalOverlay.classList.add('active');
                // --- PERBAIKAN DI SINI ---
                document.body.classList.add('modal-open');
                document.documentElement.classList.add('modal-open');
            }
        });
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        // --- PERBAIKAN DI SINI ---
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
});