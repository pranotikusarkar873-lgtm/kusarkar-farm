Add-Type -AssemblyName System.Drawing

$src = "c:\Users\hp\Downloads\kusarkar app\public\hero_mockup.png"
$dest1 = "c:\Users\hp\Downloads\kusarkar app\public\hero_mockup.png"
$dest2 = "c:\Users\hp\Downloads\kusarkar app\hero_mockup.png"

$img = [System.Drawing.Image]::FromFile($src)
$w = $img.Width
$h = $img.Height

$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)

# Draw full image
$g.DrawImage($img, 0, 0, $w, $h)

# The blurry card is at the bottom right corner (y = 70% to 100%, x = 10% to 95%)
$patchStartY = [int]($h * 0.70)
$patchHeight = [int]($h * 0.30)
$sampleStartY = [int]($h * 0.42)

# Copy clean vineyard section from sampleStartY to patchStartY to cover the blurry card
$sampleRect = New-Object System.Drawing.Rectangle(0, $sampleStartY, $w, $patchHeight)
$patchRect = New-Object System.Drawing.Rectangle(0, $patchStartY, $w, $patchHeight)
$g.DrawImage($bmp, $patchRect, $sampleRect, [System.Drawing.GraphicsUnit]::Pixel)

$img.Dispose()
$bmp.Save($dest1, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($dest2, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()

Write-Host "Cleaned background image without blurry card saved!"
