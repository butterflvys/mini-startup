$file = "RE-LOOP/category.html"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$newMain = @"
    <main>
        <section class="shop-hero">
            <div class="shop-hero-container">
                <div class="shop-hero-image">
                    <img src="assets/boy.png" alt="Category Banner">
                </div>
                <div class="shop-hero-content">
                    <div class="shop-hero-badge">
                        <i class="ri-sparkling-fill"></i> Browse by Category
                    </div>
                    <h1 class="shop-hero-title">ALL CATEGORIES</h1>
                    <p class="shop-hero-desc">
                        Explore our wide range of product categories. From fashion to technology, find exactly what you're looking for with ease.
                    </p>
                </div>
            </div>
        </section>

        <section class="container">
            <div class="category-hub-grid">
                <!-- Men's Fashion -->
                <a href="mens-fashion.html" class="hub-category-card">
                    <img src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80" alt="Men's Fashion" class="hub-category-card-image">
                    <div class="hub-category-card-overlay">
                        <h3 class="hub-category-card-title">Men's Fashion</h3>
                        <span class="hub-category-card-btn">Shop Now <i class="ri-arrow-right-line"></i></span>
                    </div>
                </a>
                
                <!-- Women's Fashion -->
                <a href="womens-fashion.html" class="hub-category-card">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" alt="Women's Fashion" class="hub-category-card-image">
                    <div class="hub-category-card-overlay">
                        <h3 class="hub-category-card-title">Women's Fashion</h3>
                        <span class="hub-category-card-btn">Shop Now <i class="ri-arrow-right-line"></i></span>
                    </div>
                </a>

                <!-- Technology -->
                <a href="technology.html" class="hub-category-card">
                    <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80" alt="Technology" class="hub-category-card-image">
                    <div class="hub-category-card-overlay">
                        <h3 class="hub-category-card-title">Technology</h3>
                        <span class="hub-category-card-btn">Shop Now <i class="ri-arrow-right-line"></i></span>
                    </div>
                </a>

                <!-- Shoes -->
                <a href="shoes.html" class="hub-category-card">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" alt="Shoes" class="hub-category-card-image">
                    <div class="hub-category-card-overlay">
                        <h3 class="hub-category-card-title">Shoes</h3>
                        <span class="hub-category-card-btn">Shop Now <i class="ri-arrow-right-line"></i></span>
                    </div>
                </a>

                <!-- Beauty -->
                <a href="beauty.html" class="hub-category-card">
                    <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80" alt="Beauty" class="hub-category-card-image">
                    <div class="hub-category-card-overlay">
                        <h3 class="hub-category-card-title">Beauty & Makeup</h3>
                        <span class="hub-category-card-btn">Shop Now <i class="ri-arrow-right-line"></i></span>
                    </div>
                </a>

                <!-- Health -->
                <a href="health.html" class="hub-category-card">
                    <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80" alt="Health" class="hub-category-card-image">
                    <div class="hub-category-card-overlay">
                        <h3 class="hub-category-card-title">Health & Wellness</h3>
                        <span class="hub-category-card-btn">Shop Now <i class="ri-arrow-right-line"></i></span>
                    </div>
                </a>

                <!-- Sports -->
                <a href="sports.html" class="hub-category-card">
                    <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80" alt="Sports" class="hub-category-card-image">
                    <div class="hub-category-card-overlay">
                        <h3 class="hub-category-card-title">Sports & Outdoors</h3>
                        <span class="hub-category-card-btn">Shop Now <i class="ri-arrow-right-line"></i></span>
                    </div>
                </a>

                <!-- Automotive -->
                <a href="automotive.html" class="hub-category-card">
                    <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80" alt="Automotive" class="hub-category-card-image">
                    <div class="hub-category-card-overlay">
                        <h3 class="hub-category-card-title">Automotive</h3>
                        <span class="hub-category-card-btn">Shop Now <i class="ri-arrow-right-line"></i></span>
                    </div>
                </a>

                <!-- Musical Instruments -->
                <a href="musical-instruments.html" class="hub-category-card">
                    <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80" alt="Musical Instruments" class="hub-category-card-image">
                    <div class="hub-category-card-overlay">
                        <h3 class="hub-category-card-title">Musical Instruments</h3>
                        <span class="hub-category-card-btn">Shop Now <i class="ri-arrow-right-line"></i></span>
                    </div>
                </a>
            </div>
        </section>
    </main>
"@

$content = $content -replace '(?s)<main>.*?</main>', $newMain

# Also remove the specific script block for dummy products at the bottom of category.html
$content = $content -replace '(?s)<script>\s*document\.addEventListener\(''DOMContentLoaded'', \(\) => \{\s*if \(typeof syncNavbarAuthState.*?<\/script>', ''

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Updated category.html"
