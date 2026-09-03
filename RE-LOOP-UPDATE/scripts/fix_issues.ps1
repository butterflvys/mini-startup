# Fix broken images in products.js
$productsFile = "RE-LOOP/products.js"
$productsContent = [System.IO.File]::ReadAllText($productsFile, [System.Text.Encoding]::UTF8)

# Replace Classic Denim Jacket image
$productsContent = $productsContent -replace '(?s)(name:\s*"Classic Denim Jacket",.*?image:\s*")[^"]+(")', "`${1}https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80`$2"

# Replace Leather Oxford Shoes image
$productsContent = $productsContent -replace '(?s)(name:\s*"Leather Oxford Shoes",.*?image:\s*")[^"]+(")', "`${1}https://images.unsplash.com/photo-1614252339460-e1713c726354?auto=format&fit=crop&w=600&q=80`$2"

# Replace Logitech MX Master 3S image
$productsContent = $productsContent -replace '(?s)(name:\s*"Logitech MX Master 3S",.*?image:\s*")[^"]+(")', "`${1}https://images.unsplash.com/photo-1527814050087-15100d07eeaf?auto=format&fit=crop&w=600&q=80`$2"

[System.IO.File]::WriteAllText($productsFile, $productsContent, [System.Text.Encoding]::UTF8)
Write-Host "Updated products.js"

# Fix banner height in all html files
$files = Get-ChildItem -Path "RE-LOOP" -Filter "*.html"

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Check if file has the banner
    if ($content -match "Mega Sale up to 70%") {
        # The container has: height: 200px;
        # We replace it with height: 300px;
        # Since it's inline style, we look for height: 200px; near overflow: hidden;
        $content = $content -replace "overflow:\s*hidden;\s*height:\s*200px;", "overflow: hidden; height: 300px;"
        
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated banner height in $($file.Name)"
    }
}
