$files = Get-ChildItem -Path "RE-LOOP" -Filter "*.html"

$newNav = @"
            <nav class="nav-menu" id="navMenu">
                <a href="index.html" class="nav-link">Home</a>
                <a href="shop.html" class="nav-link" id="shopNavLink">Shop</a>
                <div class="nav-dropdown">
                    <a href="category.html" class="nav-link">Categories</a>
                </div>
                <a href="top-products.html" class="nav-link nav-ai-link">
                    <i class="ri-sparkles-fill ai-sparkle-icon"></i> AI Rekomendasi
                </a>
                <a href="index.html#campaign" class="nav-link">About</a>
                <a href="index.html#footer" class="nav-link">Contact</a>
            </nav>
"@

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Replace the nav-menu block
    # We use regex to match from <nav class="nav-menu" id="navMenu"> to </nav>
    $pattern = '(?s)<nav class="nav-menu" id="navMenu">.*?</nav>'
    
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $newNav
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated nav links in $($file.Name)"
    }
}
