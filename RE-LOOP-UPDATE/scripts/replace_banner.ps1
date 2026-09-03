$files = Get-ChildItem -Path "RE-LOOP" -Filter "*.html"

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Replace the banner image URL
    $newContent = $content -replace "https://images\.unsplash\.com/photo-1607082349566-187342175e2f\?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
    
    if ($content -ne $newContent) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Updated banner image in $($file.Name)"
    }
}
