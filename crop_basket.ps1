Add-Type -AssemblyName System.Drawing

$src = "C:\Users\hp\.gemini\antigravity-ide\brain\d4df2cf7-357a-4c70-944f-3d5ec475305a\media__1786100210497.png"
$dest1 = "c:\Users\hp\Downloads\kusarkar app\public\hero_basket.png"
$dest2 = "c:\Users\hp\Downloads\kusarkar app\hero_basket.png"

$img = [System.Drawing.Image]::FromFile($src)
$w = [int]($img.Width * 0.58)
$h = $img.Height
$startX = [int]($img.Width * 0.42)

$rect = New-Object System.Drawing.Rectangle($startX, 0, $w, $h)
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect, [System.Drawing.GraphicsUnit]::Pixel)

$bmp.Save($dest1, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($dest2, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Extracted fruit basket vineyard graphic successfully!"
