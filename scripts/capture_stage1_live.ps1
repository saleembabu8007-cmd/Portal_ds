$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$repoScreenshots = "C:\Users\salee\Downloads\Portal_ds\docs\evidence\screenshots"
$artifactDir = "C:\Users\salee\.gemini\antigravity\brain\54b8aedc-dd01-4226-9a0a-224ea04249be"
$artifactScreenshots = "$artifactDir\screenshots"

if (!(Test-Path $artifactScreenshots)) {
    New-Item -ItemType Directory -Force -Path $artifactScreenshots
}

$targets = @(
    @{ Name = "stage1_live_desktop_1440px.png"; Url = "http://localhost:5173/buy/coverage"; Width = 1440; Height = 900 },
    @{ Name = "stage1_live_tablet_768px.png";  Url = "http://localhost:5173/buy/coverage"; Width = 768;  Height = 1024 },
    @{ Name = "stage1_live_mobile_390px.png";   Url = "http://localhost:5173/buy/coverage"; Width = 390;  Height = 844 }
)

foreach ($t in $targets) {
    $outPath = Join-Path $repoScreenshots $t.Name
    $tempProfile = "C:\Users\salee\AppData\Local\Temp\chrome-stage1-$([guid]::NewGuid().ToString())"
    Write-Host "Capturing $($t.Name)..."
    
    Start-Process -FilePath $chrome -ArgumentList "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars", "--run-all-compositor-stages-before-draw", "--virtual-time-budget=6000", "--user-data-dir=$tempProfile", "--screenshot=$outPath", "--window-size=$($t.Width),$($t.Height)", $t.Url -Wait
    
    Start-Sleep -Milliseconds 500
    if (Test-Path $outPath) {
        Copy-Item -Path $outPath -Destination (Join-Path $artifactScreenshots $t.Name) -Force
        Copy-Item -Path $outPath -Destination (Join-Path $artifactDir $t.Name) -Force
        Write-Host "Saved $($t.Name) [Size: $((Get-Item $outPath).Length) bytes]"
    } else {
        Write-Warning "Failed to capture $($t.Name)"
    }
    Remove-Item -Path $tempProfile -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "All live Stage 1 screenshots captured successfully."
