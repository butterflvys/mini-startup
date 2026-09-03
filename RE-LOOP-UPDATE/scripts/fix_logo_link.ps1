$file = "RE-LOOP/index.html"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Fix logo link in index.html
$content = $content -replace '<a href="#" class="logo">', '<a href="index.html" class="logo">'

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Updated logo link in index.html"
