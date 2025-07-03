document.addEventListener('DOMContentLoaded', function () {
    
    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({ 
        once: true, 
        mirror: false, 
        duration: 800, 
        offset: 120 
    });

    // --- Navbar Scroll Effect ---
    const nav = document.getElementById('cyberNav');
    if (nav) {
        window.addEventListener('scroll', () => { 
            window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled'); 
        });
    }

    // --- Mobile Menu Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => { 
            mobileMenu.classList.toggle('hidden'); 
        });
    }

    // --- Smooth Scrolling for All Anchor Links in Nav ---
    document.querySelectorAll('.cyber-nav-link, #mobile-menu a').forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetElement = document.querySelector(link.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    });

    // ==================================================================
    // --- LOGIKA TAB INDEPENDEN (SUDAH DIPERBAIKI) ---
    // ==================================================================

    // --- Project Tabs Logic (Hanya untuk Proyek) ---
    const projectTabs = document.querySelectorAll('#projects .cyber-tab');
    const projectPanels = document.querySelectorAll('.project-panel');
    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Nonaktifkan semua tab & panel HANYA di dalam section proyek
            projectTabs.forEach(t => t.classList.remove('active'));
            projectPanels.forEach(p => p.classList.remove('active'));

            // Aktifkan yang diklik
            tab.classList.add('active');
            const targetPanel = document.querySelector(tab.dataset.target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Refresh AOS untuk animasi
            setTimeout(() => { AOS.refresh(); }, 500);
        });
    });

    // --- Certificate Tabs Logic (Hanya untuk Sertifikat) ---
    const certTabs = document.querySelectorAll('#certificates .cyber-tab');
    const certPanels = document.querySelectorAll('.cert-panel');
    certTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Nonaktifkan semua tab & panel HANYA di dalam section sertifikat
            certTabs.forEach(t => t.classList.remove('active'));
            certPanels.forEach(p => p.classList.remove('active'));

            // Aktifkan yang diklik
            tab.classList.add('active');
            const targetPanel = document.querySelector(tab.dataset.target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Refresh AOS untuk animasi
            setTimeout(() => { AOS.refresh(); }, 500);
        });
    });


    // --- Modal Preview Logic ---
    const modal = document.getElementById('preview-modal');
    if (modal) {
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalLink = document.getElementById('modal-link');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalOverlay = document.getElementById('modal-overlay');

        const openModal = (button) => {
            modalTitle.textContent = button.dataset.title || '';
            modalImage.src = button.dataset.image || '';
            modalDescription.textContent = button.dataset.description || '';
            modalLink.href = button.dataset.link || '#';
            modalLink.textContent = button.dataset.linkText || 'View Project';
            modal.classList.add('active');
        };

        const closeModal = () => {
            modal.classList.remove('active');
        };

        document.body.addEventListener('click', (event) => {
            const previewButton = event.target.closest('.preview-button');
            if (previewButton) {
                openModal(previewButton);
            }
        });

        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});