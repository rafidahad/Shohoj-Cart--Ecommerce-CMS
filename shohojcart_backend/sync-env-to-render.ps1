# PowerShell script to sync environment variables from .env to render.yaml
# Usage: .\sync-env-to-render.ps1

$envFile = ".env"
$renderFile = "render.yaml"

if (!(Test-Path $envFile)) {
    Write-Error "Error: .env file not found!"
    exit 1
}

Write-Host "Syncing environment variables from $envFile to $renderFile..." -ForegroundColor Green

# Read .env file
$envContent = Get-Content $envFile

foreach ($line in $envContent) {
    # Skip empty lines and comments
    if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith("#")) {
        continue
    }
    
    # Split key=value
    $parts = $line.Split("=", 2)
    if ($parts.Length -eq 2) {
        $key = $parts[0].Trim()
        $value = $parts[1].Trim()
        
        # Remove quotes if present
        $value = $value.Trim('"')
        
        Write-Host "Found: $key=$value" -ForegroundColor Yellow
    }
}

Write-Host "`nEnvironment sync completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Note: Remember to update production-specific values in render.yaml:" -ForegroundColor Cyan
Write-Host "- APP_ENV should be 'production'" -ForegroundColor Cyan
Write-Host "- APP_DEBUG should be 'false'" -ForegroundColor Cyan
Write-Host "- FRONTEND_URL should be your actual frontend domain" -ForegroundColor Cyan
Write-Host "- SANCTUM_STATEFUL_DOMAINS should be your frontend domain" -ForegroundColor Cyan
Write-Host "- SESSION_DOMAIN should be your backend domain" -ForegroundColor Cyan
Write-Host "- SESSION_SECURE_COOKIE should be 'true' for HTTPS" -ForegroundColor Cyan