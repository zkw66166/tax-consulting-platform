# Remove Unused Imports Script
# This script removes common unused imports from files

Write-Host "Cleaning up unused imports..." -ForegroundColor Green

# Define files with their unused imports to remove
$cleanupTasks = @{
    "src\components\modals\calculator\VATCalculator.jsx" = @('Plus', 'Minus')
    "src\pages\CompanySelection.jsx"                     = @('Database', 'Users', 'PieChart', 'Zap', 'Target')
    "src\pages\Dashboard.jsx"                            = @('Building', 'AlertTriangle', 'DollarSign')
    "src\pages\Profile.jsx"                              = @('Database', 'Briefcase')
    "src\pages\RiskDetection.jsx"                        = @('Calendar', 'Filter', 'ChevronDown', 'ChevronRight', 'Info')
    "src\pages\Settings.jsx"                             = @('XCircle', 'Clock', 'UserX', 'MoreHorizontal')
}

$count = 0
foreach ($file in $cleanupTasks.Keys) {
    $fullPath = Join-Path (Get-Location) $file
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        $imports = $cleanupTasks[$file]
        
        foreach ($import in $imports) {
            # Remove the import from import lists
            $pattern = ",\s*$import"
            if ($content -match $pattern) {
                $content = $content -replace $pattern, ''
                Write-Host "  Removed '$import' from $file" -ForegroundColor Yellow
            }
            
            # Also try removing with leading comma
            $pattern2 = "$import,\s*"
            if ($content -match $pattern2) {
                $content = $content -replace $pattern2, ''
                Write-Host "  Removed '$import' from $file" -ForegroundColor Yellow
            }
        }
        
        Set-Content -Path $fullPath -Value $content -NoNewline
        $count++
    }
}

Write-Host "`nProcessed $count files" -ForegroundColor Green
Write-Host "Cleanup complete!" -ForegroundColor Green
