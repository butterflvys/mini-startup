$file = "RE-LOOP/top-products.html"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$newMain = @"
    <main style="padding: 40px 0 80px; background-color: #F8FAFC; min-height: calc(100vh - 80px);">
        <div class="container">
            <!-- AI Header Section -->
            <div class="ai-header">
                <div class="ai-icon-wrapper">
                    <i class="ri-robot-2-fill"></i>
                </div>
                <h1 class="ai-title">RE-LOOP AI Assistant</h1>
                <p class="ai-subtitle">Beritahu saya apa yang Anda cari, dan saya akan memberikan rekomendasi terbaik untuk Anda.</p>
                
                <div class="ai-search-box">
                    <input type="text" id="aiSearchInput" placeholder="Contoh: 'Saya cari sepatu untuk olahraga ringan' atau 'Gadget murah'">
                    <button id="aiSearchBtn"><i class="ri-send-plane-fill"></i></button>
                </div>

                <div class="ai-quick-prompts">
                    <span class="ai-prompt-chip">Rekomendasi Fashion Pria</span>
                    <span class="ai-prompt-chip">Gadget Terbaik</span>
                    <span class="ai-prompt-chip">Skincare Rutin</span>
                    <span class="ai-prompt-chip">Sepatu Olahraga</span>
                </div>
            </div>

            <!-- Loading Indicator -->
            <div id="aiLoadingIndicator" class="ai-loading" style="display: none;">
                <div class="spinner"></div>
                <p>AI sedang menganalisis jutaan data produk untuk Anda...</p>
            </div>

            <!-- Results Section -->
            <div id="aiResultsSection" style="display: none;">
                <div class="ai-results-header">
                    <h2 id="aiResultsTitle">Rekomendasi Terbaik</h2>
                    <span id="aiResultsCount" class="badge-ai-count">Ditemukan 0 produk</span>
                </div>
                <div class="shop-grid" id="aiRecommendationGrid">
                    <!-- Products will be injected here via JS -->
                </div>
            </div>
            
            <!-- Default Content if no search yet -->
            <div id="aiDefaultSection">
                <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 24px; text-align: center;">10 Produk Terpopuler Pilihan AI Minggu Ini</h2>
                <div class="shop-grid" id="defaultTopProductsGrid">
                    <!-- Preloaded top 10 products will be injected here via JS -->
                </div>
            </div>
        </div>
    </main>

    <!-- Make sure products.js is loaded -->
    <script src="products.js"></script>
    
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Check if products loaded
            if (!window.reloopProducts) {
                console.error("Products database not loaded!");
                return;
            }

            const searchInput = document.getElementById('aiSearchInput');
            const searchBtn = document.getElementById('aiSearchBtn');
            const chips = document.querySelectorAll('.ai-prompt-chip');
            const loadingIndicator = document.getElementById('aiLoadingIndicator');
            const resultsSection = document.getElementById('aiResultsSection');
            const defaultSection = document.getElementById('aiDefaultSection');
            const resultsGrid = document.getElementById('aiRecommendationGrid');
            const defaultGrid = document.getElementById('defaultTopProductsGrid');
            const resultsCount = document.getElementById('aiResultsCount');
            const resultsTitle = document.getElementById('aiResultsTitle');

            // Render product card HTML
            const renderProductCard = (p) => {
                const discountHTML = p.discount ? `<span class="top-card-discount">${p.discount}</span>` : '';
                return `
                <a href="product-detail.html?id=${p.id}" class="shop-card" style="text-decoration: none; color: inherit;">
                    <div class="shop-card-image-wrap" style="height: 220px; overflow: hidden; position: relative;">
                        <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        <div style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: white; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; display: flex; align-items: center; gap: 4px;">
                            <i class="ri-robot-2-fill" style="color: #F2542D;"></i> AI Score: ${p.aiScore}
                        </div>
                    </div>
                    <div class="shop-card-info" style="padding: 16px;">
                        <div class="shop-card-title-row" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                            <h3 class="shop-card-title" style="font-size: 1.1rem; font-weight: 700; margin: 0;">${p.name}</h3>
                        </div>
                        <div class="shop-card-price-row" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span class="shop-card-price" style="font-size: 1.2rem; font-weight: 800; color: #F2542D;">${p.price}</span>
                            ${discountHTML}
                        </div>
                        <div class="shop-card-rating-row" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 12px; font-size: 0.85rem;">
                            <div class="rating-stars" style="color: #FFA000; font-weight: 700;">
                                <i class="ri-star-fill"></i> ${p.rating}
                            </div>
                            <span style="color: #666;">${p.reviews} reviews</span>
                        </div>
                    </div>
                </a>`;
            };

            // Initial load for default top 10 products
            const topProducts = [...window.reloopProducts].sort((a, b) => b.aiScore - a.aiScore).slice(0, 10);
            defaultGrid.innerHTML = topProducts.map(renderProductCard).join('');

            // AI Search Logic
            const performAISearch = (query) => {
                if (!query.trim()) return;
                
                searchInput.value = query;
                defaultSection.style.display = 'none';
                resultsSection.style.display = 'none';
                loadingIndicator.style.display = 'flex';

                // Simulate AI thinking delay
                setTimeout(() => {
                    loadingIndicator.style.display = 'none';
                    resultsSection.style.display = 'block';

                    const q = query.toLowerCase();
                    
                    // Filter based on query
                    let matched = window.reloopProducts.filter(p => {
                        return p.name.toLowerCase().includes(q) || 
                               p.category.toLowerCase().includes(q) || 
                               p.description.toLowerCase().includes(q) ||
                               p.pros.some(pro => pro.toLowerCase().includes(q));
                    });

                    // Sort by AI Score
                    matched.sort((a, b) => b.aiScore - a.aiScore);

                    if (matched.length > 0) {
                        resultsTitle.innerHTML = `Rekomendasi untuk "<strong>${query}</strong>"`;
                        resultsCount.textContent = `Ditemukan ${matched.length} produk`;
                        resultsGrid.innerHTML = matched.map(renderProductCard).join('');
                    } else {
                        resultsTitle.innerHTML = `Tidak menemukan produk untuk "<strong>${query}</strong>"`;
                        resultsCount.textContent = `Coba gunakan kata kunci lain`;
                        resultsGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">Maaf, AI kami tidak dapat menemukan produk yang sesuai dengan pencarian Anda.</div>`;
                    }
                }, 1500);
            };

            // Event Listeners
            searchBtn.addEventListener('click', () => performAISearch(searchInput.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performAISearch(searchInput.value);
            });
            
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    performAISearch(chip.textContent);
                });
            });
        });
    </script>
"@

# Replace everything from <main> to just before footer
$content = $content -replace '(?s)<main\s*.*?>.*?</main>', $newMain

# Wait, we need to make sure we don't accidentally remove the footer or script.
# My replacement targets <main> to </main>. The footer is after it.
# We also need to remove the old <script> at the bottom that generated the cards previously if it exists.
# The old one had: `const sampleData = [` etc.
$content = $content -replace '(?s)<script>\s*document\.addEventListener\(''DOMContentLoaded'', \(\) => \{\s*const sampleData = \[.*?<\/script>', ''

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Updated top-products.html"
