$files = Get-ChildItem -Path "RE-LOOP" -Filter "*.html"

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    if ($content -match "RELOOP70") {
        $content = $content -replace "overflow:\s*hidden;\s*height:\s*200px;", "overflow: hidden; height: 260px;"
        
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated banner height in $($file.Name)"
    }
}
