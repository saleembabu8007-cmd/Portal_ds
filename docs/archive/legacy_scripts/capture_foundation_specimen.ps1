$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$repoScreenshots = "C:\Users\salee\Downloads\Portal_ds\docs\evidence\screenshots"
$artifactDir = "C:\Users\salee\.gemini\antigravity\brain\54b8aedc-dd01-4226-9a0a-224ea04249be"
$artifactScreenshots = "$artifactDir\screenshots"

if (!(Test-Path $artifactScreenshots)) {
    New-Item -ItemType Directory -Force -Path $artifactScreenshots
}

$targets = @(
    @{ Name = "foundations_specimen_desktop_1440px.png"; Url = "http://localhost:5173/tokens-specimen"; Width = 1440; Height = 900 },
    @{ Name = "foundations_specimen_mobile_390px.png";   Url = "http://localhost:5173/tokens-specimen"; Width = 390;  Height = 844 },
    @{ Name = "stage1_adoption_proof_desktop_1440px.png"; Url = "http://localhost:5173/stage1-foundation"; Width = 1440; Height = 900 },
    @{ Name = "stage1_adoption_proof_mobile_390px.png";   Url = "http://localhost:5173/stage1-foundation"; Width = 390;  Height = 844 }
)

foreach ($t in $targets) {
    $outPath = Join-Path $repoScreenshots $t.Name
    $tempProfile = "C:\Users\salee\AppData\Local\Temp\chrome-fnd-$([guid]::NewGuid().ToString())"
    Write-Host "Capturing $($t.Name)..."
    Start-Process -FilePath $chrome -ArgumentList "--headless=new", "--disable-gpu", "--no-sandbox", "--run-all-compositor-stages-before-draw", "--virtual-time-budget=6000", "--user-data-dir=$tempProfile", "--screenshot=$outPath", "--window-size=$($t.Width),$($t.Height)", $t.Url -Wait
    
    # Copy to artifact paths
    Copy-Item -Path $outPath -Destination (Join-Path $artifactScreenshots $t.Name) -Force
    Copy-Item -Path $outPath -Destination (Join-Path $artifactDir $t.Name) -Force
    Write-Host "Saved $($t.Name)"
    Remove-Item -Path $tempProfile -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "All 4 foundation screenshots captured successfully."

