$productsFile = "RE-LOOP/products.js"
$productsContent = [System.IO.File]::ReadAllText($productsFile, [System.Text.Encoding]::UTF8)

$productsContent = $productsContent -replace '(?s)(name:\s*"Classic Denim Jacket",.*?image:\s*")[^"]+(")', "`${1}assets/denim_jacket.jpg`$2"
$productsContent = $productsContent -replace '(?s)(name:\s*"Leather Oxford Shoes",.*?image:\s*")[^"]+(")', "`${1}assets/oxford_shoes.jpg`$2"
$productsContent = $productsContent -replace '(?s)(name:\s*"Logitech MX Master 3S",.*?image:\s*")[^"]+(")', "`${1}assets/logitech_mouse.jpg`$2"

[System.IO.File]::WriteAllText($productsFile, $productsContent, [System.Text.Encoding]::UTF8)
Write-Host "Updated products.js with local images"
