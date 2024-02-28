$hooksPath = "$PSScriptRoot\installation"
$destinationPath = "$PSScriptRoot\..\..\.git\hooks"
$files = Get-ChildItem -Path $hooksPath -Name
$copies = 0;

try {

    foreach ($file in $files) {
        $exists = Get-ChildItem -Path $destinationPath -Filter $file -Name

        if ($null -ne $exists) {
            Write-Host "${file} was skipped." 
            continue
        }

        Copy-Item -Path "${hooksPath}\${file}" -Destination "${destinationPath}\${file}"

        $exists = Get-ChildItem -Path $destinationPath -Filter $file -Name

        if ($null -ne $exists) {
            $copies += 1
            Write-Host "${file} was successfully copied." 
        
            continue
        }
        else {
            Write-Host "An error occurred while copying the file ${file}." -ForegroundColor Red
        }
    }

    if ($copies -gt 0) {
        Write-Host "Hooks successfully installed!" -ForegroundColor Green
    }
    else {
        Write-Host "Hooks already are up to date!" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "An error occurred while copying the files." -ForegroundColor Red 
}
