Write-Host "Scanning project for JSX files..."

# Read all JSX files except node_modules
$files = Get-ChildItem -Recurse -Filter *.jsx | Where-Object { $_.FullName -notmatch "node_modules" }

foreach ($file in $files) {

    Write-Host "Processing $($file.Name)..."

    # Read current file content
    $content = Get-Content $file.FullName

    # Determine directory of current file
    $currentDir = Split-Path $file.FullName

    # Find all import lines
    $updatedContent = $content | ForEach-Object {
        $line = $_

        if ($line -match "^import\s.*from\s+['""](.+)['""];") {

            $importPath = $Matches[1]

            # Ignore external imports (react, axios, lucide-react etc)
            if ($importPath.StartsWith(".") -eq $false) {
                $line
                return
            }

            # Compute absolute target path
            $absoluteTargetPath = Join-Path $currentDir $importPath

            # Normalize path (estimate)
            $absoluteTargetPath = [System.IO.Path]::GetFullPath($absoluteTargetPath)

            # Try finding the correct JSX file
            $targetFile = if (Test-Path "$absoluteTargetPath.jsx") { "$absoluteTargetPath.jsx" }
                          elseif (Test-Path "$absoluteTargetPath/index.jsx") { "$absoluteTargetPath/index.jsx" }
                          else { $null }

            # If file exists → calculate new relative path
            if ($targetFile) {
                $newRelativePath = Resolve-Path -Relative -Path $targetFile
                $newRelativePath = $newRelativePath -replace "\\", "/"
                $newRelativePath = $newRelativePath -replace "\.jsx$", ""

                $line = $line -replace $importPath, $newRelativePath
            }
        }

        $line
    }

    # Backup old file before updating
    Copy-Item $file.FullName "$($file.FullName).backup" -Force

    # Write updated content
    Set-Content $file.FullName $updatedContent -Encoding UTF8
}

Write-Host "Import fixing complete!"
