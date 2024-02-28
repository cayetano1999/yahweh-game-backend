Function Get-VersionNumber {
  Param
  (
    [Parameter(Mandatory = $True)]$Version
  )
  BEGIN {
    [string]$VersionText = '0.0.0'
  }

  PROCESS {
    If ($Version.Sufix) {
      $VersionText = "$($Version.Major).$($Version.Minor).$($Version.Patch)$($Version.Sufix)$($Version.Number)"
    }
    Else {
      $VersionText = "$($Version.Major).$($Version.Minor).$($Version.Patch)"
    }
    return $VersionText
  }
  END {    }
}
