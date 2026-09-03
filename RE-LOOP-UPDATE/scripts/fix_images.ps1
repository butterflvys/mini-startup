$files = Get-ChildItem -Path "RE-LOOP" -Filter "*.html"

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    $modified = $false

    # Update shop-card-image-wrap to use a fixed height
    if ($content -match "\.shop-card-image-wrap\s*\{[^\}]*aspect-ratio:\s*1[^\}]*\}") {
        $content = $content -replace "(?s)(\.shop-card-image-wrap\s*\{[^\}]*)aspect-ratio:\s*1;([^\}]*\})", "`$1height: 220px;`$2"
        $modified = $true
    }

    # Also update top-card-image-wrapper just in case (styles.css)
    # But wait, styles.css is separate. We'll handle it.

    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($file.Name)"
    }
}

# Now for styles.css
$cssFile = "RE-LOOP/styles.css"
$cssContent = [System.IO.File]::ReadAllText($cssFile, [System.Text.Encoding]::UTF8)

# Make sure top-card-img has object-fit cover
if ($cssContent -match "\.top-card-img\s*\{") {
    $cssContent = $cssContent -replace "(?s)(\.top-card-image-wrapper\s*\{[^\}]*)height:\s*\d+px;([^\}]*\})", "`$1height: 220px;`$2"
    $cssContent = $cssContent -replace "(?s)(\.top-card-img\s*\{[^\}]*)object-fit:\s*\w+;([^\}]*\})", "`$1object-fit: cover;`$2"
    [System.IO.File]::WriteAllText($cssFile, $cssContent, [System.Text.Encoding]::UTF8)
    Write-Host "Updated styles.css"
}
