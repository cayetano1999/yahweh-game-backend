Param
(
  [Parameter(ValueFromPipeline = $True, Mandatory = $True)][string]$File,
  [Parameter( Mandatory = $False)][string]$Indent = 2
)


$xmldoc = New-Object -TypeName System.Xml.XmlDocument
$xmlContent = Get-Content $File
$xmldoc.LoadXml($xmlcontent)

$StringWriter = New-Object System.IO.StringWriter
$XmlWriter = New-Object System.XMl.XmlTextWriter $StringWriter
$xmlWriter.Formatting = [System.XML.Formatting]::Indented
$xmlWriter.Indentation = $Indent

$xmldoc.WriteContentTo($xmlWriter)

$XmlWriter.Flush()
$StringWriter.Flush()

$StringWriter.ToString() | Out-File $File