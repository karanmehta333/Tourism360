$destImages = [ordered]@{
    "nainital.jpg" = "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    "pithoragarh.jpg" = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
    "bhimtal.jpg" = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
    "almora.jpg" = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
    "mukteshwar.jpg" = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    "bageshwar.jpg" = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    "dharchula.jpg" = "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=80"
    "munsiyari.jpg" = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
}

foreach ($key in $destImages.Keys) {
    $filename = $key
    $url = $destImages[$key]
    $outPath = "assets/images/$filename"
    Write-Host "Downloading $filename..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing
        $size = (Get-Item $outPath).Length
        Write-Host "Success $filename ($size bytes)"
    } catch {
        Write-Host "Error on $filename"
    }
}
