document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('character-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreContainer = document.getElementById('load-more-container');
    
    // Only proceed with grid logic if the grid exists
    if (grid) {
        const cards = Array.from(grid.children);
        const INITIAL_COUNT = 12;
        const LOAD_COUNT = 12;

        // Initially hide cards beyond the index 11 (12th card)
        cards.forEach((card, index) => {
            if (index >= INITIAL_COUNT) {
                card.style.display = 'none';
            }
        });

        // Check if we need to show the button at all
        if (cards.length <= INITIAL_COUNT) {
            if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        }

        // Load More functionality
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const hiddenCards = cards.filter(card => card.style.display === 'none');
                const cardsToShow = hiddenCards.slice(0, LOAD_COUNT);
                cardsToShow.forEach(card => {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.animate([
                        { opacity: 0, transform: 'translateY(20px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], {
                        duration: 500,
                        easing: 'ease-out',
                        fill: 'forwards'
                    });
                });
                if (hiddenCards.length <= LOAD_COUNT) {
                    if (loadMoreContainer) loadMoreContainer.style.display = 'none';
                }
            });
        }
    }

    // Modal elements
    const modal = document.getElementById('char-modal');
    const modalContent = document.getElementById('char-modal-content');
    const closeModalBtn = document.getElementById('close-modal');
    const modalCharDisplay = document.getElementById('modal-char-display');
    const modalCharTitle = document.getElementById('modal-char-title');
    const modalCharDesc = document.getElementById('modal-char-desc');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    // Modal Functionality
    if (modal) {
        function openModal(char, desc) {
            if (!modalCharDisplay || !modalCharTitle || !modalCharDesc) return;
            
            modalCharDisplay.textContent = char;
            modalCharTitle.textContent = char;
            // Keep the original short description or use a placeholder if empty
            modalCharDesc.textContent = desc || "The definitive form.";
            
            modal.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            requestAnimationFrame(() => {
                modal.classList.remove('opacity-0');
                if (modalContent) {
                    modalContent.classList.remove('scale-95');
                    modalContent.classList.add('scale-100');
                }
            });
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function closeModal() {
            modal.classList.add('opacity-0');
            if (modalContent) {
                modalContent.classList.remove('scale-100');
                modalContent.classList.add('scale-95');
            }
            
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }

        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                const cardBack = btn.closest('.backface-hidden'); 
                const charTitle = cardBack.querySelector('h3').textContent;
                const charDesc = cardBack.querySelector('p').textContent;

                openModal(charTitle, charDesc);
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
});
