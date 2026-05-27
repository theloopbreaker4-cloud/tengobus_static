param(
  [Parameter(Mandatory = $true)]
  [string]$SourceDir,

  [Parameter(Mandatory = $false)]
  [string]$OutputDir = "media/photos",

  [Parameter(Mandatory = $false)]
  [int]$MaxWidth = 1400,

  [Parameter(Mandatory = $false)]
  [ValidateRange(1, 100)]
  [int]$Quality = 82
)

Add-Type -AssemblyName System.Drawing

$resolvedSource = Resolve-Path -LiteralPath $SourceDir
$resolvedOutput = Join-Path -Path (Get-Location) -ChildPath $OutputDir

if (-not (Test-Path -LiteralPath $resolvedOutput)) {
  New-Item -ItemType Directory -Path $resolvedOutput | Out-Null
}

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq "image/jpeg" } |
  Select-Object -First 1

$encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encoderParameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
  [System.Drawing.Imaging.Encoder]::Quality,
  [long]$Quality
)

Get-ChildItem -LiteralPath $resolvedSource -File |
  Where-Object { $_.Extension -match "^\.(jpg|jpeg|png)$" } |
  ForEach-Object {
    $sourcePath = $_.FullName
    $targetName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name) + ".jpg"
    $targetPath = Join-Path -Path $resolvedOutput -ChildPath $targetName
    $image = [System.Drawing.Image]::FromFile($sourcePath)

    try {
      $scale = [Math]::Min(1, $MaxWidth / $image.Width)
      $targetWidth = [int][Math]::Round($image.Width * $scale)
      $targetHeight = [int][Math]::Round($image.Height * $scale)
      $bitmap = [System.Drawing.Bitmap]::new($targetWidth, $targetHeight)

      try {
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($image, 0, 0, $targetWidth, $targetHeight)
        $bitmap.Save($targetPath, $encoder, $encoderParameters)
        Write-Host "Saved $targetPath"
      } finally {
        if ($graphics) {
          $graphics.Dispose()
        }
        $bitmap.Dispose()
      }
    } finally {
      $image.Dispose()
    }
  }
