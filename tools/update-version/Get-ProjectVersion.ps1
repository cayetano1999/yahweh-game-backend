Function Get-ProjectVersion {
  Param
  (
    [Parameter( Mandatory = $True)][System.IO.DirectoryInfo]$Path,
    [Parameter( Mandatory = $True)][ValidateSet('npm', 'dotnet', 'gradle', 'maven')][string]$Type,
    [Parameter( Mandatory = $False)][string]$BuildNumber
  )
  BEGIN {
    If (-Not(Test-Path $Path)) {
      Write-Error "Invalid path '$Path'" -ErrorAction Stop
    }
    [string]$ProjectVersion = '0.0.0'
    $ProjectFile = $null
  }

  PROCESS {
    Switch ($Type) {
      npm {
        $ProjectPath = "$($Path.FullName)\package.json";
        If (Test-Path $ProjectPath) {
          $ProjectFile = Get-Item $ProjectPath
          $ProjectVersion = (Get-Content $ProjectFile | ConvertFrom-Json).Version
        }
        Else {
          Write-Error 'package.json not found' -ErrorAction Stop
        }
      }
      dotnet {
        If (-Not $Path) {
          Write-Error 'Path not defined' -ErrorAction Stop
        }
        $ProjectPath = (Get-ChildItem -Recurse $Path | Where-Object { $_ -Like '*.csproj' })
        If($ProjectPath){
          [xml]$ProjectConfigXml = Get-Content $ProjectPath[0].FullName
          $ProjectVersion = $ProjectConfigXml.Project.PropertyGroup.Version
        }
        Else{
          Write-Error "Project file not found" -ErrorAction Stop
        }
      }
      default {
        Write-Error "Type '$Type' not implemented" -ErrorAction Stop
      }
    }
    If ($Stage -ne "dev") {
      $ProjectVersion = $BuildNumber
    }
    [string[]]$ProjectVersionSplit = $ProjectVersion.Split('.')
    Try {
      [int]$Major = $ProjectVersionSplit[0]
      [int]$Minor = $ProjectVersionSplit[1]
      [int]$Patch = $ProjectVersionSplit[2].Split('-')[0]
      [string]$Sufix = $ProjectVersionSplit[2].Split('-')[1]
      [int]$Number = $ProjectVersionSplit[-1]
    }
    Catch {
      Write-Error "Current version is invalid '$ProjectVersion'" -ErrorAction Stop
    }
    $Version = @{
      Major  = $Major
      Minor  = $Minor
      Patch  = $Patch
      Sufix  = If ($Sufix) { "-${Sufix}." } Else { '' }
      Number = If ($Sufix) { $Number } Else { 0 }
      Full   = $ProjectVersion
      File   = $ProjectPath
    }
    return $Version
  }
  END { }
}
