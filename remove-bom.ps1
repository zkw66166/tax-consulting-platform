# Script to remove BOM (Byte Order Mark) from all JS and JSX files
Write-Host "Removing BOM from source files..." -ForegroundColor Green

$files = Get-ChildItem -Path "src" -Include *.js,*.jsx -Recurse -File

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Check if file starts with BOM
    if ($content.Length -gt 0 -and [int][char]$content[0] -eq 0xFEFF) {
        Write-Host "Removing BOM from: $($file.FullName)" -ForegroundColor Yellow
        
        # Remove BOM and save file
        $content = $content.Substring(1)
        [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding $false))
        $count++
    }
}

Write-Host "`nProcessed $count files" -ForegroundColor Green
Write-Host "BOM removal complete!" -ForegroundColor Green
