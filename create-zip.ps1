# Quick script to create a distributable zip file
$sourcePath = "dist\GCG Widget-win32-x64"
$destinationPath = "GCG-Widget-Portable.zip"

if (Test-Path $destinationPath) {
    Remove-Item $destinationPath
}

Compress-Archive -Path $sourcePath -DestinationPath $destinationPath

Write-Host "Portable zip created: $destinationPath"
$size = (Get-Item $destinationPath).Length / 1MB
Write-Host "File size: $size MB"
Write-Host "Share this file with your friends!"
