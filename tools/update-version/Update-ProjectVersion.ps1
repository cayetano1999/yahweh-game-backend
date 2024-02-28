Function Update-ProjectVersion {
  [cmdletbinding()]
  Param
  (
    [Parameter( Mandatory = $True)][ValidateSet('npm', 'dotnet', 'gradle', 'maven')][string]$Type,
    [Parameter( Mandatory = $True)]$Version,
    [Parameter( Mandatory = $False)][System.IO.FileInfo[]]$Files
  )
  BEGIN { }

  PROCESS {
    Switch ($Type) {
      Npm {
        $V = (npm version --no-git-tag-version --allow-same-version $Version)
        return $v
      }
      dotnet {
        ForEach ($File in $Files) {
          [xml]$ProjectConfigXml = Get-Content $File
          $ProjectConfigXml.Project.PropertyGroup.Version = $Version
          $ProjectConfigXml.OuterXml | Out-File $File
          & "$PSScriptRoot\Format-XML.ps1" -File $File -Indent 2
          return $Version
        }
      }
      default {
        Write-Error "Type '$Type' not implemented" -ErrorAction Stop
      }
    }
  }
  END { }
}