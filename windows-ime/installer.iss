; Onusshar Bengali Keyboard - Windows Installer Script
; Requires Inno Setup 6.0 or later

#define MyAppName "Onusshar Bengali Keyboard"
#define MyAppVersion "0.3.1"
#define MyAppPublisher "Onusshar Team"
#define MyAppURL "https://github.com/onusshar/onusshar"
#define MyAppExeName "OnussharIME.dll"

[Setup]
; App information
AppId={{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}/issues
AppUpdatesURL={#MyAppURL}/releases
DefaultDirName={autopf}\Onusshar
DisableProgramGroupPage=yes
LicenseFile=..\LICENSE
PrivilegesRequired=admin
OutputDir=dist
OutputBaseFilename=OnussharSetup-{#MyAppVersion}-win64
; SetupIconFile=assets\icon.ico
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=modern
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64
; UninstallDisplayIcon={app}\assets\icon.ico
UninstallDisplayName={#MyAppName}

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "bengali"; MessagesFile: "compiler:Languages\Unofficial\Bengali.isl"

[Files]
; Main IME DLL
Source: "build\Release\OnussharIME.dll"; DestDir: "{app}"; Flags: ignoreversion regserver
; Dependencies
Source: "build\Release\*.dll"; DestDir: "{app}"; Flags: ignoreversion skipifsourcedoesntexist
; Assets (optional)
Source: "assets\*"; DestDir: "{app}\assets"; Flags: ignoreversion recursesubdirs createallsubdirs skipifsourcedoesntexist
; Documentation
Source: "..\README.md"; DestDir: "{app}"; Flags: ignoreversion isreadme
Source: "..\LICENSE"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "control.exe"; Parameters: "input.dll"; Comment: "Configure Onusshar Bengali Keyboard"
Name: "{autoprograms}\Uninstall {#MyAppName}"; Filename: "{uninstallexe}"

[Registry]
; Register as Windows IME
Root: HKLM; Subkey: "SOFTWARE\Microsoft\CTF\TIP\{{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}"; Flags: uninsdeletekey
Root: HKLM; Subkey: "SOFTWARE\Microsoft\CTF\TIP\{{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}\LanguageProfile\0x00000445\{{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}"; ValueType: string; ValueName: "Description"; ValueData: "{#MyAppName}"; Flags: uninsdeletekey
; Root: HKLM; Subkey: "SOFTWARE\Microsoft\CTF\TIP\{{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}\LanguageProfile\0x00000445\{{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}"; ValueType: string; ValueName: "IconFile"; ValueData: "{app}\assets\icon.ico"; Flags: uninsdeletekey
; Root: HKLM; Subkey: "SOFTWARE\Microsoft\CTF\TIP\{{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}\LanguageProfile\0x00000445\{{8B9F6A3C-4D2E-4F1A-9B3C-7E5D8A2F1C9B}"; ValueType: dword; ValueName: "IconIndex"; ValueData: "0"; Flags: uninsdeletekey

[Run]
; Open Language Settings after installation
Filename: "ms-settings:regionlanguage"; Description: "Open Language Settings to add Onusshar keyboard"; Flags: postinstall shellexec skipifsilent nowait

[Code]
function InitializeSetup(): Boolean;
var
  Version: TWindowsVersion;
begin
  Result := True;
  GetWindowsVersionEx(Version);

  // Check if Windows 10 1809 or later
  if (Version.Major < 10) or ((Version.Major = 10) and (Version.Build < 17763)) then
  begin
    MsgBox('Onusshar requires Windows 10 version 1809 or later.' + #13#10 +
           'Your Windows version is not supported.', mbError, MB_OK);
    Result := False;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    // Register the IME DLL
    Exec(ExpandConstant('{sys}\regsvr32.exe'),
         ExpandConstant('/s "{app}\OnussharIME.dll"'),
         '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
var
  ResultCode: Integer;
begin
  if CurUninstallStep = usUninstall then
  begin
    // Unregister the IME DLL
    Exec(ExpandConstant('{sys}\regsvr32.exe'),
         ExpandConstant('/u /s "{app}\OnussharIME.dll"'),
         '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;
end;

[Messages]
WelcomeLabel1=Welcome to [name] Setup
WelcomeLabel2=This will install Onusshar Bengali Phonetic Keyboard on your computer.%n%nOnusshar provides a fast, modern way to type Bengali using phonetic (Roman) letters. Type "ami bangla likchi" and get "আমি বাঙলা লিকছি" instantly.%n%nAfter installation, you'll be able to add Onusshar as an input method in Windows Language Settings.%n%nClick Next to continue.
FinishedLabel=Onusshar has been successfully installed!%n%nTo start using Onusshar:%n1. Open Language Settings (click the link below)%n2. Click "Add a keyboard" under Bengali%n3. Select "Onusshar"%n4. Press Win+Space to switch between keyboards%n%nType "ami" to see "আমি" appear!
