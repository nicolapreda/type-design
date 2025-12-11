
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'public', 'index.html');
const cardsPath = path.join(__dirname, 'cards_output_interactive.html');

let indexContent = fs.readFileSync(indexPath, 'utf8');
let cardsContent = fs.readFileSync(cardsPath, 'utf8');

// Define Markers
// We look for the grid container to replace
const gridStartMarker = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 justify-items-center">';
// The end of the grid is the closing div BEFORE the "text-center mt-32" div
const footerStartMarker = '<div class="text-center mt-32">';

const startIndex = indexContent.indexOf(gridStartMarker);
const footerIndex = indexContent.indexOf(footerStartMarker);

if (startIndex === -1) {
    console.error('Grid start marker not found!');
    console.log('Expected:', gridStartMarker);
    process.exit(1);
}

if (footerIndex === -1) {
    console.error('Footer start marker not found!');
    process.exit(1);
}

// Find the end of the grid div. It should be just before footerIndex.
// We can just rely on replacing everything between startIndex and footerIndex with the new content + the new button logic.
// However, the `cards_output_interactive.html` includes the wrapper div?
// Let's check the generator script.
// `const html = <div id="card-grid" class="grid ...`
// So it includes the wrapper.
// So we should replace from `startIndex` to `footerIndex`. (Excluding footerIndex).

// But wait, the original file has `</div>` closing the grid just before `footerIndex`.
// Let's verify what's between them.
// Likely whitespace and `</div>`.

// New content to insert:
// 1. The Cards Grid (interactive version)
// 2. The Load More Button
// 3. The Modal
// 4. The Scripts

const loadMoreAndModal = `
    
    <div class="text-center mt-12" id="load-more-container">
        <button id="load-more-btn" onclick="loadMore()" class="relative group inline-flex items-center justify-center w-64 h-24 transition-transform hover:scale-105 cursor-pointer z-50">
             <img src="./assets/cornice_bottoni.png" class="absolute inset-0 w-full h-full object-fill pointer-events-none" alt="" />
             <span class="relative z-10 text-xl font-bold uppercase tracking-widest pt-1 text-brand-blue">Carica le altre</span>
        </button>
    </div>
    
    <!-- MODAL -->
    <div id="detail-modal" class="fixed inset-0 z-[100] hidden flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onclick="closeModal(event)">
        <div class="relative w-full max-w-5xl h-[85vh] bg-brand-cream border-2 border-brand-blue flex flex-col md:flex-row shadow-2xl overflow-hidden" onclick="event.stopPropagation()">
             <button onclick="closeModal()" class="absolute top-4 right-4 z-50 text-4xl text-brand-blue hover:scale-110">&times;</button>
             
             <!-- Left: Image -->
             <div class="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 bg-brand-cream border-b md:border-b-0 md:border-r border-brand-blue/20 relative overflow-hidden">
                <img src="./assets/colonna 1.png" class="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" alt="" />
                <span id="modal-char" class="text-[15rem] md:text-[20rem] font-brand-custom relative z-10 leading-none text-brand-blue select-none">A</span>
             </div>
             
             <!-- Right: Text -->
             <div class="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 flex flex-col overflow-y-auto">
                <h2 id="modal-title" class="text-6xl font-bold mb-8 text-brand-blue border-b border-brand-blue/20 pb-4">A</h2>
                <div class="prose prose-lg text-brand-blue font-serif">
                    <p id="modal-desc" class="text-xl italic mb-6 text-brand-blue/80">Description...</p>
                    <p class="leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        <br><br>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
             </div>
        </div>
    </div>

    <script>
        // Pagination Logic
        const batchSize = 6;
        
        function loadMore() {
            const hiddenCards = document.querySelectorAll('.card-item.hidden');
            if (hiddenCards.length === 0) return;
            
            let count = 0;
            for (let i = 0; i < hiddenCards.length; i++) {
                if(count >= batchSize) break;
                hiddenCards[i].classList.remove('hidden');
                count++;
            }
            
            // Check remaining
            if (document.querySelectorAll('.card-item.hidden').length === 0) {
                const btn = document.getElementById('load-more-container');
                if(btn) btn.style.display = 'none';
            }
        }

        // Modal Logic
        function openModal(char, desc) {
            document.getElementById('modal-char').innerText = char;
            document.getElementById('modal-title').innerText = char;
            // document.getElementById('modal-desc').innerText = desc; // Use generic for now or passed desc
            const modal = document.getElementById('detail-modal');
            modal.classList.remove('hidden');
            // Animate in?
            
            document.body.style.overflow = 'hidden';
        }

        function closeModal(event) {
            const modal = document.getElementById('detail-modal');
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    </script>
`;

// Extract proper range
// We want to replace everything from `startIndex` up to `footerIndex`.
// And we want to REMOVE the existing footer text part "more specimens in the archive" because we are replacing it with the button.
// The `footerIndex` points to `<div class="text-center mt-32">`.
// Let's replace THAT div as well with our new button container (which has mt-12, maybe we keep consistent spacing).

// Find end of footer div
const footerEndIndex = indexContent.indexOf('</div>', footerIndex) + 6;

const newFileContent = indexContent.slice(0, startIndex) + cardsContent + loadMoreAndModal + indexContent.slice(footerEndIndex);

fs.writeFileSync(indexPath, newFileContent);
console.log('Successfully injected interactive content!');
