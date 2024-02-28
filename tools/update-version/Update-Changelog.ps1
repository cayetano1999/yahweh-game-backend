Function Update-Changelog {
  Param
  (
    [Parameter(Mandatory = $True)]$Version,
    [Parameter(Mandatory = $True)]$CommitMessage,
    [Parameter(Mandatory = $False)]$Path,
    [Parameter(Mandatory = $False)]$URL
  )
  BEGIN {
    $Config = Get-Content "${PSScriptRoot}/config.json" | ConvertFrom-Json
    $Keywords = $Config.Keywords.Changelog
    If (-Not(Test-Path $Path)) {
      New-Item $Path -Value "# Changelog`n`n$($Keywords.Placeholder)`n" | Out-Null
    }
    $File = Get-Item $Path
    $ChangelogContent = Get-Content $File -Raw
    If (-Not($ChangelogContent.Contains($Keywords.Placeholder))) {
      Write-Error 'Changelog format is not supported' -ErrorAction Stop
    }
    $Added = New-Object System.Collections.Generic.List[string]
    $Changed = New-Object System.Collections.Generic.List[string]
    $Removed = New-Object System.Collections.Generic.List[string]
    $Fixed = New-Object System.Collections.Generic.List[string]
    $Deprecated = New-Object System.Collections.Generic.List[string]
    $Security = New-Object System.Collections.Generic.List[string]
  }

  PROCESS {
    $CommitMessage -Split "`n" | ForEach-Object {
      switch -Regex ($_) {
        \[$($Keywords.Added)\]* {
          $Added.Add( (IReplace $_  "[$($Keywords.Added)]" '- ') )
        }
        \[$($Keywords.Changed)\]* {
          $Changed.Add( (IReplace $_  "[$($Keywords.Changed)]" '- ') )
        }
        \[$($Keywords.Removed)\]* {
          $Removed.Add( (IReplace $_  "[$($Keywords.Removed)]" '- ') )
        }
        \[$($Keywords.Fixed)\]* {
          $Fixed.Add( (IReplace $_  "[$($Keywords.Fixed)]" '- ') )
        }
        \[$($Keywords.Deprecated)\]* {
          $Deprecated.Add( (IReplace $_  "[$($Keywords.Deprecated)]" '- ') )
        }
        \[$($Keywords.Security)\]* {
          $Security.Add( (IReplace $_  "[$($Keywords.Security)]" '- ') )
        }
      }
    }

    # Cleanup repo URI
    # If ($URL) {
    # }

    # Generate a new changelog entry
    $Entry = "## [$Version](${URL}?version=GT$Version) - $(Get-Date -Format 'yyyy-MM-dd')`n`n"
    If ($Added.Count -Gt 0) {
      $Entry += "### Added`n$($Added -Join "`n")`n`n"
    }
    If ($Changed.Count -Gt 0) {
      $Entry += "### Changed`n$($Changed -Join "`n")`n`n"
    }
    If ($Deprecated.Count -Gt 0) {
      $Entry += "### Deprecated`n$($Deprecated -Join "`n")`n`n"
    }
    If ($Removed.Count -Gt 0) {
      $Entry += "### Removed`n$($Removed -Join "`n")`n`n"
    }
    If ($Fixed.Count -Gt 0) {
      $Entry += "### Fixed`n$($Fixed -Join "`n")`n`n"
    }
    If ($Security.Count -Gt 0) {
      $Entry += "### Security`n$($Security -Join "`n")`n`n"
    }

    # Add entry to changelog
    $NewChangelog = Get-Content $File -Raw
    $NewChangelog.Replace($Keywords.Placeholder, "$($Keywords.Placeholder)`n`n$Entry") | Out-File $File -NoNewline
  }
  END {    }
}

Function IReplace {
  param(
    [string]$text,
    [string]$strOldChar,
    [string]$strNewChar
  )
  return [Regex]::Replace($text, [regex]::Escape($strOldChar), $strNewChar, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
}