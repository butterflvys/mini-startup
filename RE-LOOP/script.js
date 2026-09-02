/**
 * RE-LOOP - Interactive JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Global Auth System & State Synchronization
    syncNavbarAuthState();
    initNotificationSystem();

    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const mobileIcon = mobileToggle ? mobileToggle.querySelector('i') : null;

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            if (mobileIcon) {
                if (navMenu.classList.contains('active')) {
                    mobileIcon.className = 'ri-close-line';
                } else {
                    mobileIcon.className = 'ri-menu-line';
                }
            }
        });

        // Close menu when clicking link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (mobileIcon) mobileIcon.className = 'ri-menu-line';
            });
        });
    }

    // 2. Category Filtering Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card, .product-card-modern, .bestseller-card, .top-product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            productCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Search Bar Interactivity
    const heroSearchInput = document.getElementById('heroSearchInput');
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    const quickSearchInput = document.getElementById('quickSearchInput');
    const quickSearchBtn = document.getElementById('quickSearchBtn');

    function performSearch(query) {
        if (!query.trim()) {
            // If empty search, show all products and scroll to them
            productCards.forEach(card => {
                card.style.display = '';
            });
            const productsSection = document.getElementById('hanya-untukmu') || document.getElementById('kategori');
            if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const term = query.toLowerCase().trim();
        let matches = 0;
        let firstMatch = null;

        productCards.forEach(card => {
            // Check title and category
            const title = (card.getAttribute('data-title') || '').toLowerCase();
            const category = (card.getAttribute('data-category') || '').toLowerCase();
            
            // Search inside inner text as a fallback (product title/desc)
            const textContent = card.innerText.toLowerCase();

            if (title.includes(term) || category.includes(term) || textContent.includes(term)) {
                card.style.display = '';
                matches++;
                if (!firstMatch) firstMatch = card;
            } else {
                card.style.display = 'none';
            }
        });

        // If we found matches, scroll to the first match's section or the product list
        if (matches > 0) {
            const container = firstMatch.closest('.product-grid, .bestseller-grid, section');
            if (container) {
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                const productsSection = document.getElementById('hanya-untukmu');
                if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // If no match, we can just show a toast (assuming global toast function exists)
            if (typeof showGlobalCartToast === 'function') {
                const existingToast = document.querySelector('.global-cart-toast');
                if (existingToast) existingToast.remove();
                
                const toast = document.createElement('div');
                toast.className = 'global-cart-toast';
                toast.innerHTML = `<i class="ri-search-line"></i> <span>Produk "${query}" tidak ditemukan.</span>`;
                document.body.appendChild(toast);
                
                // Show with animation
                setTimeout(() => {
                    toast.style.transform = 'translateX(-50%) translateY(0)';
                    toast.style.opacity = '1';
                }, 10);
                
                setTimeout(() => {
                    toast.style.transform = 'translateX(-50%) translateY(80px)';
                    toast.style.opacity = '0';
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            } else {
                alert(`Produk "${query}" tidak ditemukan.`);
            }
        }
    }

    if (heroSearchBtn && heroSearchInput) {
        heroSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch(heroSearchInput.value);
        });

        heroSearchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch(heroSearchInput.value);
            }
        });
    }

    if (quickSearchInput) {
        quickSearchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch(quickSearchInput.value);
                quickSearchInput.blur();
            }
        });
    }
    
    if (quickSearchBtn && quickSearchInput) {
        quickSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch(quickSearchInput.value);
        });
    }

    // 4. Interactive Price Comparison Modal
    const compareModal = document.getElementById('compareModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const storeList = document.getElementById('storeList');
    const quickCompareBtns = document.querySelectorAll('.quick-compare-btn');

    // Mock comparison database for products
    const mockStoreData = {
        '1': {
            title: 'Apple iPhone 13 Pro 128GB (Pink Leather Case Bundle)',
            stores: [
                { name: 'Tokopedia - Official Store', price: 'Rp 10.249.000', color: '#42B549', best: true, note: 'Bonus Case + Tempered Glass' },
                { name: 'Shopee Mall', price: 'Rp 10.499.000', color: '#EE4D2D', best: false, note: 'Voucher Disc Rp 150rb' },
                { name: 'Blibli Official', price: 'Rp 10.650.000', color: '#0095DA', best: false, note: 'Free Delivery Instant' },
                { name: 'Lazada Flagship', price: 'Rp 10.799.000', color: '#0F146D', best: false, note: 'Garansi Resmi 1 Tahun' }
            ]
        },
        '2': {
            title: 'Samsung Galaxy S24 Ultra 512GB Titanium',
            stores: [
                { name: 'Shopee Mall - Samsung Official', price: 'Rp 19.499.000', color: '#EE4D2D', best: true, note: 'Hemat Rp 1.200.000' },
                { name: 'Tokopedia - Official Store', price: 'Rp 19.899.000', color: '#42B549', best: false, note: 'Cashback Gopay Rp 500k' },
                { name: 'Blibli Official', price: 'Rp 20.199.000', color: '#0095DA', best: false, note: 'Cicilan 0% 24 Bulan' },
                { name: 'Lazada LazMall', price: 'Rp 20.499.000', color: '#0F146D', best: false, note: 'Ready Stock' }
            ]
        },
        '3': {
            title: 'MacBook Air M2 13.6-inch 256GB Starlight',
            stores: [
                { name: 'Blibli - iBox Official', price: 'Rp 15.999.000', color: '#0095DA', best: true, note: 'Diskon Spesial Kartu Kredit' },
                { name: 'Tokopedia - Digimap Store', price: 'Rp 16.299.000', color: '#42B549', best: false, note: 'Extra Cashback Rp 300k' },
                { name: 'Shopee Mall', price: 'Rp 16.499.000', color: '#EE4D2D', best: false, note: 'Free Mouse Wireless' },
                { name: 'Lazada LazMall', price: 'Rp 16.899.000', color: '#0F146D', best: false, note: 'Garansi Resmi Apple' }
            ]
        },
        '4': {
            title: 'Jaket Leather Casual Classic Soft Edition',
            stores: [
                { name: 'Lazada - Local Designer Hub', price: 'Rp 485.000', color: '#0F146D', best: true, note: 'Cashback 10% Extra' },
                { name: 'Shopee Fashion Star', price: 'Rp 510.000', color: '#EE4D2D', best: false, note: 'Gratis Ongkir XTRA' },
                { name: 'Tokopedia Power Merchant', price: 'Rp 525.000', color: '#42B549', best: false, note: 'Bisa COD' },
                { name: 'Bukalapak Store', price: 'Rp 540.000', color: '#E31F52', best: false, note: 'Stok Terbatas' }
            ]
        },
        '5': {
            title: 'Sony WH-1000XM5 Noise Canceling Headphones',
            stores: [
                { name: 'Tokopedia - Sony Audio Official', price: 'Rp 4.499.000', color: '#42B549', best: true, note: 'Bonus Hard Case Carrying' },
                { name: 'Blibli Official', price: 'Rp 4.650.000', color: '#0095DA', best: false, note: 'Garansi 2 Tahun' },
                { name: 'Shopee Mall', price: 'Rp 4.799.000', color: '#EE4D2D', best: false, note: 'Voucher Toko Rp 100k' },
                { name: 'Lazada LazMall', price: 'Rp 4.899.000', color: '#0F146D', best: false, note: 'Pengiriman 1 Hari' }
            ]
        },
        '6': {
            title: 'Nike Air Max Red Edition Running Shoes',
            stores: [
                { name: 'Shopee - Nike Official Store', price: 'Rp 1.899.000', color: '#EE4D2D', best: true, note: 'Diskon Member 15%' },
                { name: 'Tokopedia Store', price: 'Rp 1.950.000', color: '#42B549', best: false, note: 'Gratis Tukar Size' },
                { name: 'Blibli Flagship', price: 'Rp 2.050.000', color: '#0095DA', best: false, note: 'Point Rewards 2x' },
                { name: 'Lazada Official', price: 'Rp 2.100.000', color: '#0F146D', best: false, note: 'Garansi Original 100%' }
            ]
        }
    };

    function openCompareModal(productId) {
        const data = mockStoreData[productId] || mockStoreData['1'];
        if (modalProductTitle) modalProductTitle.textContent = data.title;

        if (storeList) {
            storeList.innerHTML = '';
            data.stores.forEach(store => {
                const item = document.createElement('div');
                item.className = `store-item ${store.best ? 'best-deal' : ''}`;
                item.innerHTML = `
                    <div class="store-brand">
                        <span class="store-badge" style="background-color: ${store.color}"></span>
                        <div>
                            <span>${store.name}</span>
                            <div style="font-size: 0.75rem; color: #64748B; font-weight: 500;">${store.note}</div>
                        </div>
                    </div>
                    <div class="store-price-group">
                        <span class="store-price">${store.price}</span>
                        <a href="https://google.com/search?q=${encodeURIComponent(data.title + ' ' + store.name)}" target="_blank" class="buy-link-btn">
                            Kunjungi ${store.best ? '🌟' : ''}
                        </a>
                    </div>
                `;
                storeList.appendChild(item);
            });
        }

        if (compareModal) compareModal.classList.add('active');
    }

    quickCompareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            openCompareModal(id);
        });
    });

    if (modalCloseBtn && compareModal) {
        modalCloseBtn.addEventListener('click', () => {
            compareModal.classList.remove('active');
        });

        compareModal.addEventListener('click', (e) => {
            if (e.target === compareModal) {
                compareModal.classList.remove('active');
            }
        });
    }

    // 5. Cart Counter Interactive Demonstration
    let cartCountVal = 2;
    const cartCountEl = document.querySelector('.cart-count');
    const viewCampaignBtn = document.getElementById('viewCampaignBtn');

    if (viewCampaignBtn) {
        viewCampaignBtn.addEventListener('click', () => {
            if (!requireAuth('menyimpan penawaran kampanye ini')) return;

            cartCountVal++;
            if (cartCountEl) {
                cartCountEl.textContent = cartCountVal;
                cartCountEl.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartCountEl.style.transform = 'scale(1)';
                }, 200);
            }
            alert('✨ Item kampanye RE-LOOP berhasil ditambahkan ke keranjang belanja Anda!');
        });
    }

    // 6. 10 Produk Terlaris Minggu Ini Slider & Interactive Dash Navigation
    const topProductsTrack = document.getElementById('topProductsTrack');
    const topSliderPrev = document.getElementById('topSliderPrev');
    const topSliderNext = document.getElementById('topSliderNext');
    const topDashItems = document.querySelectorAll('.top-slider-pagination .dash-item');
    const topProductCards = document.querySelectorAll('.top-product-card');

    if (topProductsTrack && topDashItems.length > 0) {
        let isProgrammaticScroll = false;
        let scrollTimeout = null;

        // Function to update active dash based on current scroll position
        function updateActiveDash() {
            if (isProgrammaticScroll) return;

            const scrollLeft = topProductsTrack.scrollLeft;
            const trackOffsetLeft = topProductsTrack.offsetLeft;
            let closestIndex = 0;
            let minDistance = Infinity;

            topProductCards.forEach((card, index) => {
                const cardLeft = card.offsetLeft - trackOffsetLeft;
                const distance = Math.abs(scrollLeft - cardLeft);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            // If scrolled close to the end, activate the last dash
            const maxScrollLeft = topProductsTrack.scrollWidth - topProductsTrack.clientWidth;
            if (scrollLeft >= maxScrollLeft - 20) {
                closestIndex = topDashItems.length - 1;
            }

            topDashItems.forEach((dash, idx) => {
                const isActive = idx === closestIndex;
                dash.classList.toggle('active', isActive);
                dash.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }

        // Scroll listener with RAF throttling
        let isTicking = false;
        topProductsTrack.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    updateActiveDash();
                    isTicking = false;
                });
                isTicking = true;
            }
        }, { passive: true });

        // Function to scroll track to specific card index
        function scrollToCardIndex(index) {
            if (index < 0) index = 0;
            if (index >= topProductCards.length) index = topProductCards.length - 1;

            const targetCard = topProductCards[index];
            if (!targetCard) return;

            isProgrammaticScroll = true;

            // Highlight target dash immediately for responsive feedback
            topDashItems.forEach((dash, idx) => {
                const isActive = idx === index;
                dash.classList.toggle('active', isActive);
                dash.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            const targetScroll = targetCard.offsetLeft - topProductsTrack.offsetLeft;
            topProductsTrack.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isProgrammaticScroll = false;
            }, 600);
        }

        // Click event on each Dash Indicator
        topDashItems.forEach((dash) => {
            dash.addEventListener('click', () => {
                const targetIndex = parseInt(dash.getAttribute('data-index'), 10);
                scrollToCardIndex(targetIndex);
            });
        });

        // Prev & Next navigation buttons
        if (topSliderPrev) {
            topSliderPrev.addEventListener('click', () => {
                const cardWidth = topProductCards[0] ? topProductCards[0].offsetWidth + 22 : 320;
                topProductsTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });
        }

        if (topSliderNext) {
            topSliderNext.addEventListener('click', () => {
                const cardWidth = topProductCards[0] ? topProductCards[0].offsetWidth + 22 : 320;
                topProductsTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });
        }

        // Mouse Drag to Scroll functionality (Desktop)
        let isMouseDown = false;
        let startX = 0;
        let startScrollLeft = 0;
        let hasDragged = false;

        topProductsTrack.addEventListener('mousedown', (e) => {
            // Only drag on main mouse button and not on interactive buttons
            if (e.button !== 0 || e.target.closest('.top-card-fav-btn')) return;
            isMouseDown = true;
            hasDragged = false;
            startX = e.pageX - topProductsTrack.offsetLeft;
            startScrollLeft = topProductsTrack.scrollLeft;
            topProductsTrack.classList.add('is-dragging');
        });

        window.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const currentX = e.pageX - topProductsTrack.offsetLeft;
            const walk = (currentX - startX) * 1.3;
            if (Math.abs(walk) > 5) {
                hasDragged = true;
            }
            topProductsTrack.scrollLeft = startScrollLeft - walk;
        });

        window.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                topProductsTrack.classList.remove('is-dragging');
                // Snap to closest position smoothly
                setTimeout(updateActiveDash, 50);
            }
        });

        // Top Product Card Interactions (Wishlist toggle & Open Product Detail Page)
        topProductCards.forEach(card => {
            const favBtn = card.querySelector('.top-card-fav-btn');
            if (favBtn) {
                favBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (!requireAuth('menyimpan produk ke Wishlist')) return;

                    favBtn.classList.toggle('active');
                    const icon = favBtn.querySelector('i');
                    if (favBtn.classList.contains('active')) {
                        icon.className = 'ri-heart-fill';
                        favBtn.style.color = '#EF4444';
                    } else {
                        icon.className = 'ri-heart-line';
                        favBtn.style.color = '';
                    }
                });
            }

            card.addEventListener('click', (e) => {
                // Ignore click if user was dragging
                if (hasDragged) return;
                if (e.target.closest('.top-card-fav-btn')) return;

                const productId = card.getAttribute('data-id') || '1';
                window.location.href = `product-detail.html?id=${encodeURIComponent(productId)}`;
            });
        });
    }

    // Bestseller Products Click Navigation to PDP & Mini Cart Auth
    const bestsellerCards = document.querySelectorAll('.bestseller-card');
    bestsellerCards.forEach(card => {
        const miniCartBtn = card.querySelector('.cart-btn-mini');
        if (miniCartBtn) {
            miniCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!requireAuth('menambahkan produk ke keranjang belanja')) return;

                const cartBadge = document.querySelector('.cart-count');
                let cur = parseInt(cartBadge?.textContent, 10) || 0;
                if (cartBadge) {
                    cartBadge.textContent = cur + 1;
                    cartBadge.style.transform = 'scale(1.4)';
                    setTimeout(() => { cartBadge.style.transform = 'scale(1)'; }, 200);
                }
                const pTitle = card.querySelector('.product-title')?.textContent || 'Produk';
                showAddToCartToast(pTitle, 1);
            });
        }

        card.addEventListener('click', (e) => {
            if (e.target.closest('.cart-btn-mini') || e.target.closest('.quick-compare-btn')) {
                return;
            }
            const btn = card.querySelector('.quick-compare-btn');
            const productId = btn ? btn.getAttribute('data-id') : '1';
            window.location.href = `product-detail.html?id=${encodeURIComponent(productId)}`;
        });
    });

    // 6b. Product Detail Page (PDP), Marketplace Comparison & Login Page Interactive Logic
    initProductDetailPage();
    initComparePage();
    initLoginPage();

    // 7. Category Slider Carousel Controls
    const categorySlider = document.getElementById('categorySlider');
    const catPrevBtn = document.getElementById('catPrevBtn');
    const catNextBtn = document.getElementById('catNextBtn');

    if (categorySlider && catPrevBtn && catNextBtn) {
        catPrevBtn.addEventListener('click', () => {
            categorySlider.scrollBy({ left: -240, behavior: 'smooth' });
        });
        catNextBtn.addEventListener('click', () => {
            categorySlider.scrollBy({ left: 240, behavior: 'smooth' });
        });
    }

    // 8. Live Countdown Timer for Special Offer
    let days = 16, hours = 10, mins = 56, secs = 54;
    const daysEl = document.getElementById('timerDays');
    const hoursEl = document.getElementById('timerHours');
    const minsEl = document.getElementById('timerMins');
    const secsEl = document.getElementById('timerSecs');

    if (daysEl && hoursEl && minsEl && secsEl) {
        setInterval(() => {
            if (secs > 0) {
                secs--;
            } else {
                secs = 59;
                if (mins > 0) {
                    mins--;
                } else {
                    mins = 59;
                    if (hours > 0) {
                        hours--;
                    } else {
                        hours = 23;
                        if (days > 0) days--;
                    }
                }
            }
            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minsEl.textContent = mins < 10 ? '0' + mins : mins;
            secsEl.textContent = secs < 10 ? '0' + secs : secs;
        }, 1000);
    }

    // 9. Profile Settings Modal Controls
    const profileModal = document.getElementById('profileModal');
    const profileBackBtn = document.getElementById('profileBackBtn');
    const accountSettingsForm = document.getElementById('accountSettingsForm');
    const currentTabBreadcrumb = document.getElementById('currentTabBreadcrumb');
    const profileTabLinks = document.querySelectorAll('.profile-tab-link');

    if (profileBackBtn && profileModal) {
        profileBackBtn.addEventListener('click', () => {
            profileModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (profileModal) {
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                profileModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    profileTabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            profileTabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const tabName = link.getAttribute('data-tab');
            if (currentTabBreadcrumb && tabName) {
                currentTabBreadcrumb.textContent = tabName.charAt(0).toUpperCase() + tabName.slice(1);
            }
        });
    });

    // 10. Smooth scroll for nav links (Shop, Home, Categories, Deals, etc.)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Highlight active nav link
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    if (this.classList.contains('nav-link')) {
                        this.classList.add('active');
                    }
                }
            }
        });
    });

    if (accountSettingsForm) {
        accountSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✨ Pengaturan akun Anda ("Christopher Davis") telah berhasil diperbarui!');
        });
    }
});

// ==========================================================================
// Authentication System & Feature Access Guard
// ==========================================================================
function isUserLoggedIn() {
    return sessionStorage.getItem('reloop_logged_in') === 'true';
}

function requireAuth(featureName = 'fitur ini', redirectUrl = null) {
    if (isUserLoggedIn()) {
        return true;
    }
    const currentUrl = redirectUrl || window.location.href;
    const proceed = confirm(`🔒 Akses Terbatas:\n\nSilakan login terlebih dahulu untuk menggunakan ${featureName}.\n\nBuka halaman login sekarang?`);
    if (proceed) {
        window.location.href = `login.html?redirect=${encodeURIComponent(currentUrl)}`;
    }
    return false;
}

function syncNavbarAuthState() {
    const userProfileBtn = document.getElementById('userProfileBtn');
    const loggedIn = isUserLoggedIn();
    const savedUser = sessionStorage.getItem('reloop_user') || 'Pengguna';

    if (userProfileBtn) {
        if (loggedIn) {
            userProfileBtn.href = 'profile.html';
            userProfileBtn.title = `Profil Akun (${savedUser})`;
            const icon = userProfileBtn.querySelector('i');
            if (icon) {
                icon.className = 'ri-user-3-fill';
                icon.style.color = '#EA580C';
            }
        } else {
            userProfileBtn.href = 'login.html';
            userProfileBtn.title = 'Masuk ke Akun (Log In)';
            const icon = userProfileBtn.querySelector('i');
            if (icon) {
                icon.className = 'ri-user-3-line';
                icon.style.color = '';
            }
        }
    }

    // Protect standalone profile page
    if (document.querySelector('.profile-page-wrapper')) {
        if (!loggedIn) {
            alert('🔒 Akses Terbatas:\n\nSilakan login terlebih dahulu untuk mengakses halaman pengaturan akun.');
            window.location.href = 'login.html';
            return;
        }

        // Attach Logout Handler on profile page
        const logoutLinks = document.querySelectorAll('a[href="login.html"]');
        logoutLinks.forEach(l => {
            if (l.textContent.includes('Log Out') || l.innerHTML.includes('ri-logout-box-r-line')) {
                l.addEventListener('click', (e) => {
                    e.preventDefault();
                    sessionStorage.removeItem('reloop_logged_in');
                    sessionStorage.removeItem('reloop_user');
                    alert('👋 Anda telah berhasil keluar dari akun.');
                    window.location.href = 'login.html';
                });
            }
        });
    }

    // Attach guard to header Wishlist and Cart buttons
    const wishlistHeaderBtn = document.querySelector('.action-icon-btn[title="Wishlist"]');
    const cartHeaderBtn = document.getElementById('cartBtn');

    if (wishlistHeaderBtn) {
        wishlistHeaderBtn.addEventListener('click', (e) => {
            if (!requireAuth('daftar Wishlist Anda')) {
                e.preventDefault();
            } else {
                alert('✨ Membuka daftar wishlist Anda...');
            }
        });
    }

    if (cartHeaderBtn) {
        cartHeaderBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
}

// ==========================================================================
// Global Cart Management (localStorage-based)
// ==========================================================================
function getCartItems() {
    try { return JSON.parse(localStorage.getItem('reloop_cart') || '[]'); } catch { return []; }
}
function saveCartItems(cart) {
    localStorage.setItem('reloop_cart', JSON.stringify(cart));
    // Update all cart badges on page
    const badges = document.querySelectorAll('.cart-count');
    const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
    badges.forEach(b => { b.textContent = total; });
}

function addToCart(product) {
    if (!isUserLoggedIn()) {
        requireAuth('menambahkan produk ke keranjang', window.location.href);
        return false;
    }
    const cart = getCartItems();
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
        existing.qty = (existing.qty || 1) + (product.qty || 1);
    } else {
        cart.push({ ...product, qty: product.qty || 1, selected: true });
    }
    saveCartItems(cart);
    showGlobalCartToast(product.name || 'Produk');
    return true;
}

function showGlobalCartToast(productName) {
    // Reuse existing toast or create inline
    let toast = document.getElementById('globalCartToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'globalCartToast';
        toast.style.cssText = `
            position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(80px);
            background: #1E293B; color: #fff; padding: 12px 22px; border-radius: 12px;
            font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 600;
            display: flex; align-items: center; gap: 10px; z-index: 9999;
            transition: transform 0.3s ease, opacity 0.3s ease; opacity: 0;
            box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        `;
        toast.innerHTML = `<i class="ri-shopping-cart-2-fill" style="color:#EA580C;font-size:1.1rem;"></i>
            <span>"${productName}" berhasil ditambahkan ke keranjang</span>
            <a href="cart.html" style="color:#EA580C;font-weight:700;margin-left:8px;text-decoration:none;">Lihat</a>`;
        document.body.appendChild(toast);
    }
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(80px)';
        toast.style.opacity = '0';
    }, 3000);
}

// ==========================================================================
// Global Notification System
// ==========================================================================

const NOTIF_STORAGE_KEY = 'reloop_notifications';

const DEFAULT_NOTIFICATIONS = [
    {
        id: 'n1',
        type: 'order',
        icon: 'ri-package-2-line',
        title: 'Pesanan Tiba',
        desc: 'Pesanan Anda #54648492039499 sudah dibuat. Terima kasih sudah memilih Re-Loop sebagai platform berbelanja.',
        time: '2 menit lalu',
        read: false
    },
    {
        id: 'n2',
        type: 'order',
        icon: 'ri-truck-line',
        title: 'Pesanan Dikirim',
        desc: 'Paket Anda sedang dalam perjalanan. Estimasi tiba 1-2 hari kerja.',
        time: '1 jam lalu',
        read: false
    },
    {
        id: 'n3',
        type: 'promo',
        icon: 'ri-coupon-3-line',
        title: 'Promo Spesial Untukmu!',
        desc: 'Gunakan kode RELOOP10 dan hemat 10% untuk pembelian berikutnya. Berlaku hingga hari ini.',
        time: '3 jam lalu',
        read: true
    },
    {
        id: 'n4',
        type: 'info',
        icon: 'ri-shield-check-line',
        title: 'Akun Terverifikasi',
        desc: 'Akun RE-LOOP Anda telah berhasil diverifikasi. Nikmati semua fitur premium tanpa batas.',
        time: '1 hari lalu',
        read: true
    },
    {
        id: 'n5',
        type: 'promo',
        icon: 'ri-price-tag-3-line',
        title: 'Flash Sale Dimulai!',
        desc: 'Jangan lewatkan Flash Sale produk elektronik refurbished hingga 40% off. Stok terbatas!',
        time: '2 hari lalu',
        read: true
    }
];

function getNotifications() {
    try {
        const stored = localStorage.getItem(NOTIF_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [...DEFAULT_NOTIFICATIONS];
    } catch { return [...DEFAULT_NOTIFICATIONS]; }
}

function saveNotifications(notifs) {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(notifs));
}

function getUnreadCount() {
    return getNotifications().filter(n => !n.read).length;
}

function initNotificationSystem() {
    // Find all notification buttons on the page
    const notifBtns = document.querySelectorAll('.action-icon-btn[title="Notifikasi"]');
    if (!notifBtns.length) return;

    notifBtns.forEach(btn => {
        // Wrap in relative wrapper if not already
        const parent = btn.parentElement;
        if (!parent.classList.contains('notif-btn-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'notif-btn-wrapper';
            parent.insertBefore(wrapper, btn);
            wrapper.appendChild(btn);
        }

        const wrapper = btn.parentElement;

        // Add red badge if unread
        updateNotifBadge(wrapper);

        // Build and inject dropdown
        const dropdown = buildNotifDropdown();
        wrapper.appendChild(dropdown);

        // Toggle on click
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');
            // Close all other dropdowns first
            document.querySelectorAll('.notif-dropdown.open').forEach(d => d.classList.remove('open'));
            if (!isOpen) {
                refreshNotifList(dropdown);
                dropdown.classList.add('open');
            }
        });

        // Read All button
        dropdown.querySelector('.notif-read-all-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const notifs = getNotifications();
            notifs.forEach(n => n.read = true);
            saveNotifications(notifs);
            refreshNotifList(dropdown);
            updateNotifBadge(wrapper);
        });
    });

    // Close on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.notif-dropdown.open').forEach(d => d.classList.remove('open'));
    });
}

function updateNotifBadge(wrapper) {
    let badge = wrapper.querySelector('.notif-badge');
    const count = getUnreadCount();
    if (count > 0) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'notif-badge';
            wrapper.querySelector('.action-icon-btn').appendChild(badge);
        }
        badge.style.display = 'block';
    } else {
        if (badge) badge.style.display = 'none';
    }
}

function buildNotifDropdown() {
    const drop = document.createElement('div');
    drop.className = 'notif-dropdown';
    drop.innerHTML = `
        <div class="notif-header">
            <span class="notif-title">Notifikasi</span>
            <button class="notif-read-all-btn">Read All</button>
        </div>
        <div class="notif-list" id="notifList"></div>
        <div class="notif-footer">
            <a href="#" class="notif-see-all-link">Lihat semua notifikasi →</a>
        </div>
    `;
    // Prevent dropdown from closing when clicking inside it
    drop.addEventListener('click', e => e.stopPropagation());
    return drop;
}

function refreshNotifList(dropdown) {
    const list = dropdown.querySelector('.notif-list') || dropdown.querySelector('#notifList');
    if (!list) return;

    const notifs = getNotifications();
    if (notifs.length === 0) {
        list.innerHTML = `<div class="notif-empty"><i class="ri-notification-off-line"></i>Tidak ada notifikasi</div>`;
        return;
    }

    list.innerHTML = notifs.map(n => `
        <div class="notif-item ${n.read ? 'read' : ''}" data-id="${n.id}">
            <div class="notif-item-icon ${n.type}">
                <i class="${n.icon}"></i>
            </div>
            <div class="notif-item-body">
                <div class="notif-item-title">${n.title}</div>
                <div class="notif-item-desc">${n.desc}</div>
                <div class="notif-item-time">${n.time}</div>
            </div>
            ${!n.read ? '<div class="notif-unread-dot"></div>' : ''}
        </div>
    `).join('');

    // Mark as read on click
    list.querySelectorAll('.notif-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = item.dataset.id;
            const notifs = getNotifications();
            const found = notifs.find(n => n.id === id);
            if (found) {
                found.read = true;
                saveNotifications(notifs);
                item.classList.add('read');
                item.querySelector('.notif-unread-dot')?.remove();
                const wrapper = dropdown.closest('.notif-btn-wrapper');
                if (wrapper) updateNotifBadge(wrapper);
            }
        });
    });
}


const productDatabase = {
    '1': {
        title: 'Apple iPhone 15 128GB Silver Titanium',
        category: 'Gadget & Smartphone',
        brand: 'Apple',
        crumb: 'iPhone 15 detail',
        variant: '128GB / Silver Titanium / Garansi Resmi TAM',
        rating: '4.9',
        reviews: '147 ulasan pembeli',
        aiScore: '92',
        aiVerdict: 'Sangat Baik',
        aiSummary: 'Skor AI agregat dari 479 ulasan di Tokopedia, Shopee & marketplace lainnya.',
        bestPrice: 'Rp 12.249.000',
        bestSource: 'di Tokopedia - Official Store',
        avgPrice: 'Rp 14.699.000',
        savings: 'Hemat Rp 2.450.000 (-20%) dari harga pasaran',
        aiBestStore: 'Tokopedia Official',
        images: [
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85'
        ],
        pros: [
            'Kualitas kamera meningkat drastis dalam kondisi minim cahaya.',
            'Daya tahan baterai kami uji capai seharian penuh.',
            'Desain port USB-C baru mempermudah mobilitas & pengisian daya.'
        ],
        cons: [
            'Suhu bodi terasa agak hangat saat pengisian daya cepat (fast charging).',
            'Kabel bawaan paket penjualan terasa agak kaku.',
            'Harga masih relatif tinggi jika tanpa voucher promo perbandingan.'
        ],
        buyTiming: 'Harga produk ini saat ini berada di <strong>titik terendah kuartal ini</strong>. Berdasarkan estimasi pola tren diskon dan algoritma Re-Loop, kami menyarankan membeli sekarang sebelum potensi kenaikan menjelang pergantian musim.',
        sentimentPercent: '92%',
        sentimentStatus: 'Sangat Positif',
        sentimentDetail: '92% dari 147 ulasan di marketplace menyatakan puas atau sangat puas.',
        posPercent: '92%',
        negPercent: '8%',
        aspects: [
            { name: 'Kualitas Kamera Utama', val: '95%' },
            { name: 'Performa & Chipset', val: '90%' },
            { name: 'Daya Tahan Baterai', val: '88%' },
            { name: 'Desain USB-C Baru', val: '78%' },
            { name: 'Kualitas Layar OLED', val: '75%' }
        ],
        stores: [
            {
                id: 'tokopedia',
                name: 'Tokopedia - Apple Official Store',
                marketplace: 'Tokopedia',
                badgeClass: 'btn-tokopedia',
                badgeColor: '#42B549',
                isOfficial: true,
                officialLabel: 'Official Store',
                rating: '4.9',
                sales: '12.4k terjual',
                city: 'Jakarta Barat',
                price: 'Rp 12.249.000',
                priceNum: 12249000,
                oldPrice: 'Rp 15.499.000',
                discount: '20% OFF',
                diffNote: '🔥 Termurah di pasar',
                isBestDeal: true,
                hasFreeShipping: true,
                hasCashback: true,
                hasInstallment: true,
                cashbackAmount: 500000,
                promos: ['Gratis Ongkir Instant', 'Cashback GoPay Rp 500rb', 'Bonus Case & Tempered Glass'],
                warranty: 'Garansi Resmi TAM / iBox 1 Thn',
                shipping: '1-2 Jam (Instant) / Gratis Reguler',
                payment: 'GoPayLater / Kartu Kredit 0% 12-24 Bln',
                link: 'https://www.tokopedia.com/search?st=product&q=Apple+iPhone+15+128GB'
            },
            {
                id: 'shopee',
                name: 'Shopee - Digimap Official Shop',
                marketplace: 'Shopee',
                badgeClass: 'btn-shopee',
                badgeColor: '#EE4D2D',
                isOfficial: true,
                officialLabel: 'Shopee Mall',
                rating: '4.9',
                sales: '9.1k terjual',
                city: 'Tangerang Selatan',
                price: 'Rp 12.499.000',
                priceNum: 12499000,
                oldPrice: 'Rp 15.499.000',
                discount: '19% OFF',
                diffNote: '+ Rp 250.000 dari termurah',
                isBestDeal: false,
                hasFreeShipping: true,
                hasCashback: true,
                hasInstallment: true,
                cashbackAmount: 200000,
                promos: ['Gratis Ongkir XTRA', 'Voucher Toko Rp 200rb', 'Cicilan SPayLater 0%'],
                warranty: 'Garansi Resmi Digimap 1 Thn',
                shipping: 'Same Day / Instant Delivery',
                payment: 'SPayLater 0% / Bebas Biaya Admin',
                link: 'https://shopee.co.id/search?keyword=Apple+iPhone+15+128GB'
            },
            {
                id: 'blibli',
                name: 'Blibli - Authorized Apple Reseller',
                marketplace: 'Blibli',
                badgeClass: 'btn-blibli',
                badgeColor: '#0095DA',
                isOfficial: true,
                officialLabel: 'Blibli Official',
                rating: '4.9',
                sales: '5.8k terjual',
                city: 'Jakarta Pusat',
                price: 'Rp 12.650.000',
                priceNum: 12650000,
                oldPrice: 'Rp 15.499.000',
                discount: '18% OFF',
                diffNote: '+ Rp 401.000 dari termurah',
                isBestDeal: false,
                hasFreeShipping: true,
                hasCashback: false,
                hasInstallment: true,
                cashbackAmount: 0,
                promos: ['Pengiriman 2 Jam Sampai', 'Diskon Kartu Kredit Rp 300rb', 'Poin Blibli 2x'],
                warranty: 'Garansi Resmi BNIB Segel 1 Thn',
                shipping: '2 Jam Sampai (Blibli Express)',
                payment: 'Cicilan 0% hingga 24 Bulan',
                link: 'https://www.blibli.com/cari/Apple%20iPhone%2015%20128GB'
            },
            {
                id: 'lazada',
                name: 'Lazada - LazMall Apple Premium Hub',
                marketplace: 'Lazada',
                badgeClass: 'btn-lazada',
                badgeColor: '#0F146D',
                isOfficial: true,
                officialLabel: 'LazMall Official',
                rating: '4.8',
                sales: '3.2k terjual',
                city: 'Jakarta Utara',
                price: 'Rp 12.799.000',
                priceNum: 12799000,
                oldPrice: 'Rp 15.499.000',
                discount: '17% OFF',
                diffNote: '+ Rp 550.000 dari termurah',
                isBestDeal: false,
                hasFreeShipping: true,
                hasCashback: true,
                hasInstallment: true,
                cashbackAmount: 150000,
                promos: ['Proteksi Gadget 1 Tahun Gratis', 'LazCoins Diskon Rp 150rb', 'Bebas Retur 30 Hari'],
                warranty: 'Garansi Resmi Apple ID 1 Thn',
                shipping: '1-2 Hari Kerja',
                payment: 'Lazada PayLater / Transfer Bank',
                link: 'https://www.lazada.co.id/catalog/?q=Apple+iPhone+15+128GB'
            },
            {
                id: 'bukalapak',
                name: 'Bukalapak - Gadget Official Store ID',
                marketplace: 'Bukalapak',
                badgeClass: 'btn-bukalapak',
                badgeColor: '#E31F52',
                isOfficial: false,
                officialLabel: 'Super Seller',
                rating: '4.8',
                sales: '1.9k terjual',
                city: 'Surabaya',
                price: 'Rp 12.950.000',
                priceNum: 12950000,
                oldPrice: 'Rp 15.499.000',
                discount: '16% OFF',
                diffNote: '+ Rp 701.000 dari termurah',
                isBestDeal: false,
                hasFreeShipping: false,
                hasCashback: false,
                hasInstallment: false,
                cashbackAmount: 0,
                promos: ['Bisa Bayar di Tempat (COD)', 'Packing Bubble Wrap Kayu Gratis'],
                warranty: 'Garansi Resmi 1 Thn + Toko 7 Hari',
                shipping: '2-3 Hari Reguler',
                payment: 'COD / BukaCicilan / DANA',
                link: 'https://www.bukalapak.com/products?search%5Bkeywords%5D=Apple+iPhone+15+128GB'
            }
        ]
    },
    '2': {
        title: 'Samsung Galaxy S24 Ultra 512GB Titanium Gray',
        category: 'Gadget & Smartphone',
        brand: 'Samsung',
        crumb: 'Galaxy S24 Ultra detail',
        variant: '512GB / Titanium Gray / Garansi Resmi SEIN',
        rating: '4.9',
        reviews: '230 ulasan pembeli',
        aiScore: '94',
        aiVerdict: 'Luar Biasa',
        aiSummary: 'Skor AI agregat dari 612 ulasan di Tokopedia, Shopee, & Blibli.',
        bestPrice: 'Rp 19.499.000',
        bestSource: 'di Shopee Mall - Samsung Official',
        avgPrice: 'Rp 21.999.000',
        savings: 'Hemat Rp 2.500.000 (-11%) dari harga rilis resmi',
        aiBestStore: 'Shopee Samsung Official',
        images: [
            'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'
        ],
        pros: [
            'Fitur Galaxy AI sangat membantu produktivitas & terjemahan langsung.',
            'Layar Dynamic AMOLED 2X anti-refleksi sangat jernih di bawah terik matahari.',
            'Zoom optik 5x & digital 100x tetap tajam dan stabil.'
        ],
        cons: [
            'Ukuran bodi cukup besar dan berbobot di saku celana.',
            'Kecepatan pengisian baterai masih tertahan di 45W.'
        ],
        buyTiming: 'Harga Galaxy S24 Ultra saat ini sudah mengalami penyesuaian pasar yang menarik dengan bonus cashback e-wallet terbesar.',
        sentimentPercent: '94%',
        sentimentStatus: 'Sangat Positif',
        sentimentDetail: '94% dari 230 ulasan di marketplace memberikan rating bintang 5.',
        posPercent: '94%',
        negPercent: '6%',
        aspects: [
            { name: 'Kualitas Kamera Zoom', val: '97%' },
            { name: 'Fitur AI Cerdas', val: '95%' },
            { name: 'Kecerahan Layar', val: '93%' },
            { name: 'Daya Tahan Baterai', val: '89%' },
            { name: 'Kualitas Material Titanium', val: '86%' }
        ],
        stores: [
            {
                id: 'shopee',
                name: 'Shopee - Samsung Official Store',
                marketplace: 'Shopee',
                badgeClass: 'btn-shopee',
                badgeColor: '#EE4D2D',
                isOfficial: true,
                officialLabel: 'Shopee Mall',
                rating: '4.9',
                sales: '8.4k terjual',
                city: 'Jakarta Pusat',
                price: 'Rp 19.499.000',
                priceNum: 19499000,
                oldPrice: 'Rp 21.999.000',
                discount: '11% OFF',
                diffNote: '🔥 Termurah di pasar',
                isBestDeal: true,
                hasFreeShipping: true,
                hasCashback: true,
                hasInstallment: true,
                cashbackAmount: 600000,
                promos: ['Cashback Rp 600.000', 'Bonus Samsung Care+ 1 Tahun', 'Gratis Ongkir XTRA'],
                warranty: 'Garansi Resmi SEIN Indonesia 1 Thn',
                shipping: '1 Hari Instant Delivery',
                payment: 'SPayLater 0% / Kartu Kredit 0%',
                link: 'https://shopee.co.id/search?keyword=Samsung+Galaxy+S24+Ultra'
            },
            {
                id: 'tokopedia',
                name: 'Tokopedia - Samsung Flagship Hub',
                marketplace: 'Tokopedia',
                badgeClass: 'btn-tokopedia',
                badgeColor: '#42B549',
                isOfficial: true,
                officialLabel: 'Official Store',
                rating: '4.9',
                sales: '6.7k terjual',
                city: 'Jakarta Selatan',
                price: 'Rp 19.799.000',
                priceNum: 19799000,
                oldPrice: 'Rp 21.999.000',
                discount: '10% OFF',
                diffNote: '+ Rp 300.000 dari termurah',
                isBestDeal: false,
                hasFreeShipping: true,
                hasCashback: true,
                hasInstallment: true,
                cashbackAmount: 400000,
                promos: ['Cashback GoPay Rp 400rb', 'Gratis Power Adapter 45W'],
                warranty: 'Garansi Resmi SEIN 1 Thn',
                shipping: 'Instant Delivery 2 Jam',
                payment: 'Cicilan 0% hingga 24 Bulan',
                link: 'https://www.tokopedia.com/search?st=product&q=Samsung+Galaxy+S24+Ultra'
            }
        ]
    },
    '3': {
        title: 'MacBook Air M2 13.6-inch 256GB Starlight',
        category: 'Komputer & Laptop',
        brand: 'Apple',
        crumb: 'MacBook Air M2 detail',
        variant: '256GB / Apple M2 / 8GB Unified Memory',
        rating: '4.9',
        reviews: '180 ulasan pembeli',
        aiScore: '95',
        aiVerdict: 'Pilihan Terbaik',
        aiSummary: 'Skor AI agregat dari 389 ulasan di marketplace teknologi Indonesia.',
        bestPrice: 'Rp 15.999.000',
        bestSource: 'di Blibli iBox Official',
        avgPrice: 'Rp 17.499.000',
        savings: 'Hemat Rp 1.500.000 (-9%) dengan promo cicilan 0%',
        aiBestStore: 'Blibli iBox Official',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=85'
        ],
        pros: [
            'Efisiensi daya chip Apple Silicon M2 luar biasa, tahan hingga 18 jam.',
            'Desain unibody super tipis tanpa kipas (100% senyap).',
            'Layar Liquid Retina cerah dengan warna P3 gamut luas.'
        ],
        cons: [
            'Port terbatas (hanya 2 Thunderbolt dan MagSafe).',
            'Upgrade memori internal tidak dapat dilakukan secara mandiri.'
        ],
        buyTiming: 'Waktu terbaik untuk membeli laptop produktivitas harian dengan garansi resmi Apple Indonesia.',
        sentimentPercent: '95%',
        sentimentStatus: 'Sangat Positif',
        sentimentDetail: '95% pembeli memuji daya tahan baterai dan portabilitasnya.',
        posPercent: '95%',
        negPercent: '5%',
        aspects: [
            { name: 'Daya Tahan Baterai', val: '98%' },
            { name: 'Portabilitas & Bobot', val: '96%' },
            { name: 'Kecepatan Prosesor M2', val: '92%' },
            { name: 'Kualitas Keyboard & Trackpad', val: '94%' },
            { name: 'Kualitas Speaker & Audio', val: '88%' }
        ]
    },
    '4': {
        title: 'Jaket Leather Casual Classic Soft Edition',
        category: 'Fashion Pria',
        brand: 'Local Brand',
        crumb: 'Jaket Lovely detail',
        variant: 'Ukuran L / Hitam Klasik / Semi Kulit Premium',
        rating: '4.8',
        reviews: '120 ulasan pembeli',
        aiScore: '90',
        aiVerdict: 'Sangat Populer',
        aiSummary: 'Skor AI agregat dari 240 ulasan pembeli fashion di Shopee & Lazada.',
        bestPrice: 'Rp 220.000',
        bestSource: 'di Lazada Mall Official',
        avgPrice: 'Rp 299.000',
        savings: 'Hemat Rp 79.000 (-26%) dibanding harga butik offline',
        aiBestStore: 'Lazada Mall Official',
        images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85'
        ],
        pros: [
            'Bahan kulit sintetis lembut, tidak kaku, dan adem dipakai.',
            'Jahitan presisi dengan ritsleting logam berkualitas tinggi.',
            'Potongan pas di badan (*slim fit aesthetic*).'
        ],
        cons: [
            'Disarankan memilih satu ukuran lebih besar jika ingin gaya oversize.',
            'Perlu perawatan khusus saat mencuci.'
        ],
        buyTiming: 'Stok sering menipis saat promo flash sale akhir pekan.',
        sentimentPercent: '90%',
        sentimentStatus: 'Sangat Positif',
        sentimentDetail: '90% ulasan menyatakan bahan nyaman dan jahitan rapi.',
        posPercent: '90%',
        negPercent: '10%',
        aspects: [
            { name: 'Kenyamanan Bahan', val: '92%' },
            { name: 'Kerapian Jahitan', val: '90%' },
            { name: 'Kesesuaian Ukuran', val: '86%' },
            { name: 'Daya Tahan Ritsleting', val: '88%' }
        ]
    },
    '5': {
        title: 'Sony WH-1000XM5 Noise Canceling Headphones',
        category: 'Audio & Headphone',
        brand: 'Sony',
        crumb: 'Sony WH-1000XM5 detail',
        variant: 'Hitam / Wireless Bluetooth / Garansi Resmi Sony Indonesia',
        rating: '4.9',
        reviews: '350 ulasan pembeli',
        aiScore: '96',
        aiVerdict: 'Peringkat #1 Audio',
        aiSummary: 'Skor AI agregat dari 820 ulasan audio di marketplace resmi.',
        bestPrice: 'Rp 4.499.000',
        bestSource: 'di Tokopedia Official Store',
        avgPrice: 'Rp 5.299.000',
        savings: 'Hemat Rp 800.000 (-15%) + Bonus Hard Case',
        aiBestStore: 'Tokopedia Official Store',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85',
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85'
        ],
        pros: [
            'Peredam kebisingan aktif (ANC) terbaik di kelasnya dengan prosesor V1 + QN1.',
            'Kualitas mikrofon 8-mic kristal jernih untuk panggilan suara.',
            'Bobot ringan dengan bantalan soft fit leather yang empuk.'
        ],
        cons: [
            'Headband tidak bisa dilipat penuh seperti seri XM4.',
            'Harga di segmen flagship premium.'
        ],
        buyTiming: 'Pilihan terbaik untuk profesional, pelajar, dan penikmat audio resolusi tinggi.',
        sentimentPercent: '96%',
        sentimentStatus: 'Sangat Positif',
        sentimentDetail: '96% menyatakan fitur Active Noise Cancelling sangat superior.',
        posPercent: '96%',
        negPercent: '4%',
        aspects: [
            { name: 'Kualitas Noise Cancelling (ANC)', val: '99%' },
            { name: 'Kualitas Suara & Bass', val: '96%' },
            { name: 'Kenyamanan Pemakaian', val: '94%' },
            { name: 'Kualitas Panggilan Mic', val: '92%' }
        ]
    }
};

function initProductDetailPage() {
    if (!document.body.classList.contains('pdp-page-body')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';
    const product = productDatabase[productId] || productDatabase['1'];

    // Update Title & Breadcrumb
    if (document.getElementById('pageTitle')) {
        document.getElementById('pageTitle').textContent = `${product.title} - Review Intelligence | RE-LOOP`;
    }
    if (document.getElementById('pdpTitle')) {
        document.getElementById('pdpTitle').textContent = product.title;
    }
    if (document.getElementById('pdpRatingVal')) {
        document.getElementById('pdpRatingVal').textContent = product.rating;
    }
    if (document.getElementById('pdpReviewCount')) {
        document.getElementById('pdpReviewCount').textContent = product.reviews;
    }

    // AI Card
    if (document.getElementById('pdpAiScoreBadge')) {
        document.getElementById('pdpAiScoreBadge').textContent = product.aiScore;
    }
    if (document.getElementById('pdpAiVerdict')) {
        document.getElementById('pdpAiVerdict').textContent = product.aiVerdict;
    }
    if (document.getElementById('pdpAiSummarySnippet')) {
        document.getElementById('pdpAiSummarySnippet').textContent = product.aiSummary;
    }

    // Best Price Card
    if (document.getElementById('pdpBestPrice')) {
        document.getElementById('pdpBestPrice').textContent = product.bestPrice;
    }
    if (document.getElementById('pdpBestSource')) {
        document.getElementById('pdpBestSource').textContent = product.bestSource;
    }
    if (document.getElementById('pdpSavingsNote')) {
        document.getElementById('pdpSavingsNote').innerHTML = `<i class="ri-arrow-down-line"></i> ${product.savings}`;
    }

    // Main Image
    const mainProductImg = document.getElementById('mainProductImg');
    if (mainProductImg && product.images && product.images[0]) {
        mainProductImg.src = product.images[0];
        mainProductImg.alt = product.title;
    }

    // Thumbnails
    const thumbnailRow = document.getElementById('pdpThumbnailRow');
    if (thumbnailRow && product.images) {
        thumbnailRow.innerHTML = '';
        product.images.forEach((imgUrl, idx) => {
            const btn = document.createElement('button');
            btn.className = `gallery-thumb ${idx === 0 ? 'active' : ''}`;
            btn.setAttribute('data-img', imgUrl);
            btn.innerHTML = `<img src="${imgUrl}" alt="Thumbnail ${idx + 1}">`;
            btn.addEventListener('click', () => {
                thumbnailRow.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
                btn.classList.add('active');
                if (mainProductImg) {
                    mainProductImg.style.opacity = '0.3';
                    setTimeout(() => {
                        mainProductImg.src = imgUrl;
                        mainProductImg.style.opacity = '1';
                    }, 140);
                }
            });
            thumbnailRow.appendChild(btn);
        });
    }

    // Pros & Cons
    const prosList = document.getElementById('pdpProsList');
    if (prosList && product.pros) {
        prosList.innerHTML = product.pros.map(p => `<li><i class="ri-checkbox-circle-fill icon-check"></i> ${p}</li>`).join('');
    }
    const consList = document.getElementById('pdpConsList');
    if (consList && product.cons) {
        consList.innerHTML = product.cons.map(c => `<li><i class="ri-close-circle-fill icon-cross"></i> ${c}</li>`).join('');
    }

    // Buy Timing
    const buyTiming = document.getElementById('pdpBuyTimingSnippet');
    if (buyTiming && product.buyTiming) {
        buyTiming.innerHTML = product.buyTiming;
    }

    // Sentiment
    if (document.getElementById('pdpSentimentPercent')) {
        document.getElementById('pdpSentimentPercent').textContent = product.sentimentPercent;
    }
    if (document.getElementById('pdpSentimentStatus')) {
        document.getElementById('pdpSentimentStatus').textContent = product.sentimentStatus;
    }
    if (document.getElementById('pdpSentimentDetail')) {
        document.getElementById('pdpSentimentDetail').textContent = product.sentimentDetail;
    }
    if (document.getElementById('pdpPosPercent')) {
        document.getElementById('pdpPosPercent').textContent = product.posPercent;
    }
    if (document.getElementById('pdpNegPercent')) {
        document.getElementById('pdpNegPercent').textContent = product.negPercent;
    }

    // Aspects
    const aspectList = document.getElementById('pdpAspectList');
    if (aspectList && product.aspects) {
        aspectList.innerHTML = product.aspects.map(a => `
            <div class="aspect-item">
                <div class="aspect-label-row">
                    <span class="aspect-name">${a.name}</span>
                    <span class="aspect-val">${a.val}</span>
                </div>
                <div class="aspect-track">
                    <div class="aspect-fill" style="width: ${a.val};"></div>
                </div>
            </div>
        `).join('');
    }

    // Quantity Selector
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyInput = document.getElementById('qtyInput');
    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });
        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val < 99) qtyInput.value = val + 1;
        });
    }

    // PDP Tabs Scroll Navigation
    const pdpTabLinks = document.querySelectorAll('.pdp-tab-link');
    pdpTabLinks.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            pdpTabLinks.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetSel = tab.getAttribute('data-target');
            const targetEl = document.querySelector(targetSel);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Wishlist Button Toggle
    const pdpWishlistBtn = document.getElementById('pdpWishlistBtn');
    if (pdpWishlistBtn) {
        pdpWishlistBtn.addEventListener('click', () => {
            if (!requireAuth('menyimpan produk ini ke Wishlist')) return;

            pdpWishlistBtn.classList.toggle('active');
            const icon = pdpWishlistBtn.querySelector('i');
            if (pdpWishlistBtn.classList.contains('active')) {
                icon.className = 'ri-heart-fill';
                pdpWishlistBtn.style.color = '#EF4444';
            } else {
                icon.className = 'ri-heart-line';
                pdpWishlistBtn.style.color = '';
            }
        });
    }

    // Add to Cart & Buy Action Handlers
    const pdpAddToCartBtn = document.getElementById('pdpAddToCartBtn') || document.getElementById('pdpCompareBtn');
    const pdpCheckAllStoresBtn = document.getElementById('pdpCheckAllStoresBtn');
    const pdpBuyBtn = document.getElementById('pdpBuyBtn');
    const cartCountBadge = document.querySelector('.cart-count');

    function handleAddToCart(isDirectBuy = false) {
        if (!requireAuth(isDirectBuy ? 'proses checkout & pembayaran' : 'memasukkan produk ke keranjang belanja')) {
            return;
        }

        const qty = parseInt(document.getElementById('qtyInput')?.value, 10) || 1;
        let currentCount = parseInt(cartCountBadge?.textContent, 10) || 0;
        const newCount = currentCount + qty;

        if (cartCountBadge) {
            cartCountBadge.textContent = newCount;
            cartCountBadge.style.transform = 'scale(1.4)';
            setTimeout(() => {
                cartCountBadge.style.transform = 'scale(1)';
            }, 250);
        }

        if (isDirectBuy) {
            const confirmed = confirm(`🛒 Checkout Instan:\n\nProduk: ${product.title}\nJumlah: ${qty} unit\nTotal: ${product.bestPrice}\n\nLanjutkan ke proses pembayaran?`);
            if (confirmed) {
                alert(`✨ Pesanan Anda untuk ${qty}x ${product.title} telah berhasil diproses! Terima kasih telah berbelanja di RE-LOOP.`);
            }
        } else {
            showAddToCartToast(product.title, qty);
        }
    }

    if (pdpAddToCartBtn) {
        pdpAddToCartBtn.addEventListener('click', () => handleAddToCart(false));
    }
    if (pdpCheckAllStoresBtn) {
        pdpCheckAllStoresBtn.addEventListener('click', () => handleAddToCart(false));
    }
    if (pdpBuyBtn) {
        pdpBuyBtn.addEventListener('click', () => handleAddToCart(true));
    }
}

function showAddToCartToast(productTitle, qty) {
    let toast = document.getElementById('reloopCartToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'reloopCartToast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #0F172A;
            color: #FFFFFF;
            padding: 16px 22px;
            border-radius: 16px;
            box-shadow: 0 12px 36px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            gap: 14px;
            z-index: 9999;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-width: 380px;
            font-size: 0.88rem;
        `;
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <div style="width: 36px; height: 36px; border-radius: 50%; background: #10B981; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;">
            <i class="ri-check-line"></i>
        </div>
        <div>
            <div style="font-weight: 700; color: #FFFFFF; margin-bottom: 2px;">Berhasil Masuk Keranjang!</div>
            <div style="font-size: 0.78rem; color: #94A3B8;">${qty}x ${productTitle}</div>
        </div>
    `;

    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
    }, 3200);
}

// ==========================================================================
// Marketplace Price Comparison Page (`compare.html`) Module
// ==========================================================================
function initComparePage() {
    if (!document.body.classList.contains('compare-page-body')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';
    const product = productDatabase[productId] || productDatabase['1'];

    // Back link to PDP
    const backLink = document.getElementById('compareBackLink');
    if (backLink) {
        backLink.href = `product-detail.html?id=${encodeURIComponent(productId)}`;
    }

    // Page title
    if (document.getElementById('comparePageTitle')) {
        document.getElementById('comparePageTitle').textContent = `Perbandingan Harga Pasar - ${product.title} | RE-LOOP`;
    }

    // Banner Details
    if (document.getElementById('compareProductImg') && product.images && product.images[0]) {
        document.getElementById('compareProductImg').src = product.images[0];
        document.getElementById('compareProductImg').alt = product.title;
    }
    if (document.getElementById('compareCategoryTag')) {
        document.getElementById('compareCategoryTag').textContent = product.category || 'Gadget & Elektronik';
    }
    if (document.getElementById('compareProductTitle')) {
        document.getElementById('compareProductTitle').textContent = product.title;
    }
    if (document.getElementById('compareRatingText')) {
        document.getElementById('compareRatingText').textContent = `${product.rating} (${product.reviews})`;
    }
    if (document.getElementById('compareAiScore')) {
        document.getElementById('compareAiScore').textContent = `${product.aiScore}/100`;
    }
    if (document.getElementById('compareVariantPill')) {
        document.getElementById('compareVariantPill').textContent = product.variant || 'Varian Resmi Terverifikasi';
    }
    if (document.getElementById('compareLowestPriceVal')) {
        document.getElementById('compareLowestPriceVal').textContent = product.bestPrice;
    }
    if (document.getElementById('compareLowestSource')) {
        document.getElementById('compareLowestSource').textContent = product.bestSource;
    }

    // 3 Key Stats
    if (document.getElementById('statLowestPrice')) {
        document.getElementById('statLowestPrice').textContent = product.bestPrice;
    }
    if (document.getElementById('statSavings')) {
        document.getElementById('statSavings').textContent = product.savings;
    }
    if (document.getElementById('statAvgPrice')) {
        document.getElementById('statAvgPrice').textContent = product.avgPrice || 'Rp 14.699.000';
    }
    if (document.getElementById('statAiBestStore')) {
        document.getElementById('statAiBestStore').textContent = product.aiBestStore || 'Tokopedia Official';
    }

    // Fallback store generator if specific product store list isn't provided
    const storesData = product.stores || [
        {
            id: 'tokopedia',
            name: `Tokopedia - ${product.brand || 'Official'} Store`,
            marketplace: 'Tokopedia',
            badgeClass: 'btn-tokopedia',
            badgeColor: '#42B549',
            isOfficial: true,
            officialLabel: 'Official Store',
            rating: '4.9',
            sales: '12.4k terjual',
            city: 'Jakarta Barat',
            price: product.bestPrice,
            priceNum: 12249000,
            oldPrice: product.avgPrice || 'Rp 15.499.000',
            discount: '20% OFF',
            diffNote: '🔥 Termurah di pasar',
            isBestDeal: true,
            hasFreeShipping: true,
            hasCashback: true,
            hasInstallment: true,
            cashbackAmount: 500000,
            promos: ['Gratis Ongkir Instant', 'Cashback GoPay Coins Rp 500rb', 'Garansi Resmi'],
            warranty: 'Garansi Resmi 1 Tahun',
            shipping: '1-2 Jam (Instant) / Gratis Reguler',
            payment: 'GoPayLater / Kartu Kredit 0%',
            link: `https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(product.title)}`
        },
        {
            id: 'shopee',
            name: `Shopee - ${product.brand || 'Brand'} Mall`,
            marketplace: 'Shopee',
            badgeClass: 'btn-shopee',
            badgeColor: '#EE4D2D',
            isOfficial: true,
            officialLabel: 'Shopee Mall',
            rating: '4.9',
            sales: '9.1k terjual',
            city: 'Tangerang',
            price: 'Rp 12.499.000',
            priceNum: 12499000,
            oldPrice: product.avgPrice || 'Rp 15.499.000',
            discount: '18% OFF',
            diffNote: '+ Rp 250.000 dari termurah',
            isBestDeal: false,
            hasFreeShipping: true,
            hasCashback: true,
            hasInstallment: true,
            cashbackAmount: 200000,
            promos: ['Gratis Ongkir XTRA', 'Voucher Toko Rp 200rb', 'Cicilan SPayLater 0%'],
            warranty: 'Garansi Resmi 1 Tahun',
            shipping: 'Same Day Delivery',
            payment: 'SPayLater 0% / Bebas Biaya Admin',
            link: `https://shopee.co.id/search?keyword=${encodeURIComponent(product.title)}`
        }
    ];

    let currentFilter = 'all';
    let currentSort = 'price-low';

    function renderDealsAndMatrix() {
        const feedContainer = document.getElementById('marketplaceDealsFeed');
        const matrixBody = document.getElementById('matrixTableBody');
        if (!feedContainer) return;

        // Filter stores
        let filtered = storesData.filter(store => {
            if (currentFilter === 'official') return store.isOfficial;
            if (currentFilter === 'free-shipping') return store.hasFreeShipping;
            if (currentFilter === 'cashback') return store.hasCashback;
            if (currentFilter === 'installment') return store.hasInstallment;
            return true;
        });

        // Sort stores
        filtered.sort((a, b) => {
            if (currentSort === 'price-low') return a.priceNum - b.priceNum;
            if (currentSort === 'price-high') return b.priceNum - a.priceNum;
            if (currentSort === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
            if (currentSort === 'cashback') return (b.cashbackAmount || 0) - (a.cashbackAmount || 0);
            return 0;
        });

        // Render Deals Feed Cards
        feedContainer.innerHTML = '';
        if (filtered.length === 0) {
            feedContainer.innerHTML = `
                <div style="background: #FFFFFF; border-radius: 18px; padding: 40px; text-align: center; border: 1px solid #E2E8F0;">
                    <i class="ri-search-eye-line" style="font-size: 2.5rem; color: #94A3B8; margin-bottom: 12px; display: inline-block;"></i>
                    <h3 style="font-size: 1.15rem; color: #0F172A; margin-bottom: 6px;">Tidak ada toko yang cocok dengan filter</h3>
                    <p style="font-size: 0.85rem; color: #64748B;">Coba pilih filter lain untuk melihat penawaran marketplace.</p>
                </div>
            `;
        } else {
            filtered.forEach(store => {
                const card = document.createElement('div');
                card.className = `marketplace-deal-card ${store.isBestDeal ? 'best-deal-card' : ''}`;
                card.innerHTML = `
                    ${store.isBestDeal ? '<div class="best-deal-ribbon"><i class="ri-star-fill"></i> HARGA TERBAIK RE-LOOP</div>' : ''}
                    
                    <div class="deal-store-column">
                        <div class="store-logo-badge" style="background-color: ${store.badgeColor};">
                            <i class="ri-store-2-fill"></i>
                        </div>
                        <div class="deal-store-details">
                            <div class="deal-store-title-row">
                                <span class="deal-store-name">${store.name}</span>
                                <span class="deal-official-tag ${store.isOfficial ? 'tag-official' : 'tag-super'}">
                                    ${store.officialLabel}
                                </span>
                            </div>
                            <div class="deal-store-sub-meta">
                                <span><i class="ri-star-fill" style="color: #F59E0B;"></i> ${store.rating} (${store.sales})</span>
                                <span>•</span>
                                <span><i class="ri-map-pin-2-line"></i> ${store.city}</span>
                                <span>•</span>
                                <span><i class="ri-shield-check-line" style="color: #059669;"></i> ${store.warranty}</span>
                            </div>
                            <div class="deal-promo-tags-row">
                                ${store.promos.map(p => `<span class="promo-tag-pill tag-green"><i class="ri-checkbox-circle-fill"></i> ${p}</span>`).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="deal-price-column">
                        <div class="deal-current-price">${store.price}</div>
                        <div class="deal-strikethrough-row">
                            <span class="deal-old-price">${store.oldPrice}</span>
                            <span class="deal-disc-badge">${store.discount}</span>
                        </div>
                        <span class="deal-savings-diff">${store.diffNote}</span>
                    </div>

                    <div class="deal-action-column">
                        <a href="${store.link}" target="_blank" rel="noopener noreferrer" class="btn-visit-store ${store.badgeClass}">
                            Kunjungi Toko <i class="ri-external-link-line"></i>
                        </a>
                        <span class="deal-security-badge">
                            <i class="ri-lock-2-line"></i> Transaksi Aman Terverifikasi
                        </span>
                    </div>
                `;
                feedContainer.appendChild(card);
            });
        }

        // Render Matrix Table
        if (matrixBody) {
            matrixBody.innerHTML = '';
            storesData.forEach(store => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div class="table-store-cell">
                            <span class="table-dot" style="background-color: ${store.badgeColor}"></span>
                            <div>
                                <div>${store.name}</div>
                                <div style="font-size: 0.75rem; color: #64748B;">${store.officialLabel} • ${store.city}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="table-price-bold">${store.price}</div>
                        <div style="font-size: 0.72rem; color: #EF4444;">${store.discount}</div>
                    </td>
                    <td>
                        <span class="deal-official-tag ${store.isOfficial ? 'tag-official' : 'tag-super'}">
                            ${store.officialLabel}
                        </span>
                    </td>
                    <td>${store.warranty}</td>
                    <td>${store.shipping}</td>
                    <td>${store.payment}</td>
                    <td>
                        <a href="${store.link}" target="_blank" rel="noopener noreferrer" class="table-btn-link">
                            Lihat Toko <i class="ri-arrow-right-up-line"></i>
                        </a>
                    </td>
                `;
                matrixBody.appendChild(tr);
            });
        }
    }

    // Filter Chips Event Handlers
    const filterChips = document.querySelectorAll('#compareFilterChips .filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.getAttribute('data-filter');
            renderDealsAndMatrix();
        });
    });

    // Sort Dropdown Event Handler
    const sortSelect = document.getElementById('compareSortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderDealsAndMatrix();
        });
    }

    // Price Alert Form Submit
    const priceAlertForm = document.getElementById('priceAlertForm');
    if (priceAlertForm) {
        priceAlertForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const targetVal = document.getElementById('targetPriceInput')?.value;
            const emailVal = document.getElementById('alertEmailInput')?.value;
            alert(`🔔 Alarm Turun Harga Berhasil Diaktifkan!\n\nKami akan mengirimkan notifikasi ke "${emailVal}" begitu harga ${product.title} mencapai target Rp ${Number(targetVal).toLocaleString('id-ID')} atau lebih rendah.`);
            priceAlertForm.reset();
        });
    }

    // Initial render
    renderDealsAndMatrix();
}

// ==========================================================================
// Login Page (`login.html`) Module
// ==========================================================================
function initLoginPage() {
    if (!document.body.classList.contains('login-page-body')) return;

    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const loginPassword = document.getElementById('loginPassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const loginForm = document.getElementById('loginForm');
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const forgotPassLink = document.getElementById('forgotPassLink');
    const signupLink = document.getElementById('signupLink');

    // 1. Password Visibility Toggle
    if (togglePasswordBtn && loginPassword && eyeIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = loginPassword.getAttribute('type') === 'password';
            loginPassword.setAttribute('type', isPassword ? 'text' : 'password');
            eyeIcon.className = isPassword ? 'ri-eye-line' : 'ri-eye-close-line';
            eyeIcon.style.color = isPassword ? '#EA580C' : '#94A3B8';
        });
    }

    // 2. Login Form Submission Handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('loginIdentifier')?.value.trim();
            const password = loginPassword?.value;

            if (!identifier || !password) {
                alert('Silakan isi nomor handphone/username/email dan kata sandi Anda.');
                return;
            }

            if (loginSubmitBtn) {
                loginSubmitBtn.disabled = true;
                loginSubmitBtn.innerHTML = `
                    <i class="ri-loader-4-line ri-spin"></i>
                    <span>Memproses Masuk...</span>
                `;
                loginSubmitBtn.style.opacity = '0.9';
            }

            // Simulate authentication & smoothly redirect
            setTimeout(() => {
                sessionStorage.setItem('reloop_logged_in', 'true');
                sessionStorage.setItem('reloop_user', identifier);
                const redirectParam = new URLSearchParams(window.location.search).get('redirect');
                const onboardingDone = sessionStorage.getItem('reloop_onboarding_done');

                if (redirectParam && (redirectParam.includes('.html') || redirectParam.startsWith('http'))) {
                    // Came from a protected feature — show onboarding first then continue
                    if (!onboardingDone) {
                        window.location.href = `onboarding.html?redirect=${encodeURIComponent(redirectParam)}`;
                    } else {
                        window.location.href = redirectParam;
                    }
                } else {
                    // Normal login — show onboarding then go home
                    if (!onboardingDone) {
                        window.location.href = 'onboarding.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }
            }, 600);
        });
    }

    // 3. Forgot Password Handler
    if (forgotPassLink) {
        forgotPassLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = prompt('Masukkan email atau nomor HP Anda untuk menerima kode reset kata sandi:');
            if (email) {
                alert(`✨ Tautan pemulihan kata sandi telah dikirimkan ke "${email}". Silakan periksa inbox/SMS Anda.`);
            }
        });
    }

    // 4. Sign Up Link Handler
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            const choice = confirm('Pendaftaran akun baru RE-LOOP gratis dengan bonus voucher selamat datang!\n\nLanjutkan dengan mengisi data di formulir?');
            if (choice) {
                const idInput = document.getElementById('loginIdentifier');
                if (idInput) {
                    idInput.focus();
                    idInput.placeholder = 'Ketik email / No. HP baru untuk daftar';
                }
            }
        });
    }
}

// Keyframe animation injection for smooth fade-in
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);
