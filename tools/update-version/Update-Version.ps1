Param
(
  [Parameter( Mandatory = $True)][System.IO.FileInfo]$Changelog
  , [Parameter( Mandatory = $True)][string]$Branch
  , [Parameter( Mandatory = $True)][string]$URL
  , [Parameter( Mandatory = $True)][string]$AuthorName
  , [Parameter( Mandatory = $True)][string]$AuthorEmail
  , [Parameter( Mandatory = $True)][string]$PathVersion
  , [Parameter( Mandatory = $True)][string]$Stage
  , [Parameter( Mandatory = $True)][ValidateSet("npm", "dotnet", "gradle", "ionic","maven")][string]$Type
  , [Parameter( Mandatory = $False)][string]$BuildNumber
)

$ErrorActionPreference = "Stop" # Exits on error

# Import dependencies
. $PSScriptRoot\Get-VersionNumber.ps1
. $PSScriptRoot\Get-ProjectVersion.ps1
. $PSScriptRoot\Update-ProjectVersion.ps1
. $PSScriptRoot\Update-Changelog.ps1

$Config = Get-Content "${PSScriptRoot}/config.json" | ConvertFrom-Json

# Get the branch config from the configuration file
$BranchConfig = $Config.Branches | Where-Object { $Branch -Match $_.Name }
$StageConfig = $Config.Stages | Where-Object { $Stage -Match $_.Name }
If (-Not $BranchConfig ) {
  Write-Host -F Yellow "Branch ${Branch} is not configured"
  Write-Host -F Yellow "Skipping..."
  return
}
If ($BranchConfig.Skip) {
  Write-Host -F Yellow "Skipping..."
  return
}

Write-Host -F CYAN "Running Update Version"

# Get project file and current version
$CurrentVersion = Get-ProjectVersion -Type $Type -Path $PathVersion -BuildNumber $BuildNumber
Write-Host -F Magenta "Current version is '$(Get-VersionNumber $CurrentVersion)'"

$CommitMessage = $(git log -1 --pretty=%B)

# Determine the next version
$NextVersion = $CurrentVersion
$NextVersion.Prefix = $Config.VersionPrefix

$VersionKeywords = $Config.Keywords.Versions
switch -Regex ( $CommitMessage | Out-String -NoNewline ) {
  "\[$($VersionKeywords.Major)\]" {
    $NextVersion.Major++
    $NextVersion.Minor = 0
    $NextVersion.Patch = 0
    $NextVersion.Number = 0
  }
  "\[$($VersionKeywords.Minor)\]" {
    $NextVersion.Minor++
    $NextVersion.Patch = 0
    $NextVersion.Number = 0
  }
  "\[$($VersionKeywords.Patch)\]" {
    $NextVersion.Patch++
    $NextVersion.Number = 0
  }
  Default {
    If ($Stage -eq "dev") {
      $NextVersion.Patch++
      $NextVersion.Number = 0
    }
  }
}

If ($StageConfig.IsStable) {
  $NextVersion.Sufix = ''
}
Else {
  If ($CurrentVersion.Sufix) {
    If (($CurrentVersion.Sufix -Eq $StageConfig.Sufix) -And ($NextVersion.Number -Ne 0)) {
      $NextVersion.Number++
    }
    Else {
      $NextVersion.Sufix = $StageConfig.Sufix
      $NextVersion.Number = 1
    }
  }
  Else {
      $NextVersion.Sufix = $StageConfig.Sufix
      $NextVersion.Number = 1
  }
}

$NextVersionText = $(Get-VersionNumber $NextVersion)
$NewTag = "$($Config.VersionPrefix)${NextVersionText}"

If ($Stage -eq "dev") {
  Update-ProjectVersion -Type $Type -Version $NextVersionText -Files $NextVersion.File | Out-Null
}
Update-Changelog -Version $NewTag -Path $Changelog -CommitMessage $CommitMessage -URL $URL

git fetch

# Prepare git
git checkout $Branch
git config user.email $AuthorEmail
git config user.name $AuthorName

# Commit changes
git add *
git commit -m "ci: Version updated to '$NewTag' [skip ci]"
git push origin HEAD

# Tag new version
git tag -f $NewTag
git push origin ":$NewTag"

git tag -f $Config.LatestTagName
git push origin ":$($Config.LatestTagName)"

if ($StageConfig.IsStable) {
  git tag -f $Config.StableTagName
  git push origin ":$($Config.StableTagName)"
}
git push origin --tags

Write-Host -F Magenta "Version updated to '$NextVersionText'"
Write-Host "##vso[task.setvariable variable=outputVersion;isOutput=true]$NextVersionText"

If ($Stage -eq "dev") {
  Write-Host "##vso[build.updatebuildnumber]$NextVersionText"  
}