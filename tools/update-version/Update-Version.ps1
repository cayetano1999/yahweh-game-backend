Param
(
  [Parameter( Mandatory = $True)][System.IO.FileInfo]$Changelog
  , [Parameter( Mandatory = $True)][string]$Branch
  , [Parameter( Mandatory = $True)][string]$URL
  , [Parameter( Mandatory = $True)][string]$AuthorName
  , [Parameter( Mandatory = $True)][string]$AuthorEmail
  , [Parameter( Mandatory = $True)][string]$PathPackageJson
  , [Parameter( Mandatory = $True)][string]$BuildNumber
  , [Parameter( Mandatory = $True)][string]$Stage
  , [Parameter( Mandatory = $False)][ValidateSet("npm", "dotnet", "gradle", "maven")][string]$Type
)

$ErrorActionPreference = "Stop" # Exits on error
# Clear-Host

# Import dependencies
. $PSScriptRoot\Get-VersionNumber.ps1
. $PSScriptRoot\Get-ProjectVersion.ps1
. $PSScriptRoot\Update-ProjectVersion.ps1
. $PSScriptRoot\Update-Changelog.ps1

$Config = Get-Content "${PSScriptRoot}/config.json" | ConvertFrom-Json

# Get the branch config from the configuration file
$BranchConfig = $Config.Branches | Where-Object { $Stage -Match $_.Name }
If (-Not $BranchConfig ) {
  Write-Host -F Yellow "Branch ${Stage} is not configured"
  Write-Host -F Yellow "Skipping..."
  return
}
If ($BranchConfig.Skip) {
  Write-Host -F Yellow "Skipping..."
  return
}

Write-Host -F CYAN "Running Update Version"

# Get project file and current version
$CurrentVersion = Get-ProjectVersion -Type $Type -Path $PathPackageJson
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
}

If ($BranchConfig.IsStable) {
  $NextVersion.Sufix = ''
}
Else {
  If ($CurrentVersion.Sufix) {
    If (($CurrentVersion.Sufix -Eq $BranchConfig.Sufix) -And ($NextVersion.Number -Ne 0)) {
      $NextVersion.Number++
    }
    Else {
      $NextVersion.Sufix = $BranchConfig.Sufix
      $NextVersion.Number = 1
    }
  }
  Else {
    $NextVersion.Sufix = $BranchConfig.Sufix
    $NextVersion.Number = 1
  }
}

$NextVersionText = $(Get-VersionNumber $NextVersion)
$NewTag = "$($Config.VersionPrefix)${NextVersionText}"

Update-ProjectVersion -Type $Type -Version $NextVersionText -Files $NextVersion.File | Out-Null
Update-Changelog -Version $NewTag -Path $Changelog -CommitMessage $CommitMessage -URL $URL

# Prepare git
Write-Host "checkout a la rama $Branch"
git checkout $Branch
git config user.email $AuthorEmail
git config user.name $AuthorName

# Commit changes
Write-Host "subiendo subiendo cambios del nuevo tag"
git add *
git commit -m "ci: Version updated to '$NewTag' [skip ci]"
git push origin HEAD

# Tag new version
Write-Host "subiendo nueva version del tag"
git tag -f $NewTag
git push origin ":${NewTag}"

Write-Host "subiendo version latest del tag"
git tag -f $Config.LatestTagName
git push origin ":$($Config.LatestTagName)"

if ($BranchConfig.IsStable) {
  git tag -f $Config.StableTagName
  git push origin ":$($Config.StableTagName)"
}
Write-Host "actualizando tags"
git push origin --tags

Write-Host -F Magenta "Version updated to '$NextVersionText'"
Write-Host "##vso[task.setvariable variable=outputVersion;isOutput=true]$NextVersionText"

If ($Stage -eq "develop") {
  $MyBuildnumber = -join($NextVersionText,"_","$BuildNumber")
  Write-Host "##vso[build.updatebuildnumber]$MyBuildnumber"  
}