@echo off
REM Onusshar Bengali Keyboard - Windows Installer Build Script
REM Requires: CMake, Visual Studio 2019+, Inno Setup 6

setlocal EnableDelayedExpansion

set VERSION=0.3.1
set SCRIPT_DIR=%~dp0
set BUILD_DIR=%SCRIPT_DIR%build
set DIST_DIR=%SCRIPT_DIR%dist

echo ==========================================
echo Building Onusshar Windows Installer v%VERSION%
echo ==========================================
echo.

REM Check for CMake
where cmake >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] CMake not found. Please install CMake.
    exit /b 1
)

REM Check for Inno Setup
set INNO_SETUP="C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
if not exist %INNO_SETUP% (
    echo [ERROR] Inno Setup not found at %INNO_SETUP%
    echo Please install Inno Setup 6 from https://jrsoftware.org/isdl.php
    exit /b 1
)

REM Clean previous builds
echo Cleaning previous builds...
if exist "%BUILD_DIR%" rmdir /s /q "%BUILD_DIR%"
if exist "%DIST_DIR%" rmdir /s /q "%DIST_DIR%"
mkdir "%BUILD_DIR%"
mkdir "%DIST_DIR%"
echo [OK] Cleaned build directories
echo.

REM Step 1: Configure with CMake
echo Step 1: Configuring CMake project...
cd "%SCRIPT_DIR%"
cmake -B "%BUILD_DIR%" -S . -G "Visual Studio 16 2019" -A x64
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] CMake configuration failed
    exit /b 1
)
echo [OK] CMake configured successfully
echo.

REM Step 2: Build the project
echo Step 2: Building project with MSBuild...
cmake --build "%BUILD_DIR%" --config Release
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed
    exit /b 1
)
echo [OK] Build completed successfully
echo.

REM Check if DLL was built
if not exist "%BUILD_DIR%\Release\OnussharIME.dll" (
    echo [ERROR] OnussharIME.dll not found in build\Release\
    exit /b 1
)
echo [OK] Found OnussharIME.dll

REM Step 3: Create assets directory if not exists
if not exist "%SCRIPT_DIR%assets" mkdir "%SCRIPT_DIR%assets"
if not exist "%SCRIPT_DIR%assets\icon.ico" (
    echo [WARNING] assets\icon.ico not found. Creating placeholder...
    REM You should replace this with actual icon creation
    echo. > "%SCRIPT_DIR%assets\icon.ico"
)

REM Step 4: Build installer with Inno Setup
echo.
echo Step 3: Building installer with Inno Setup...
%INNO_SETUP% "%SCRIPT_DIR%installer.iss" /Q
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Inno Setup failed
    exit /b 1
)
echo [OK] Installer created successfully
echo.

REM Get installer size
for %%F in ("%DIST_DIR%\OnussharSetup-%VERSION%-win64.exe") do set SIZE=%%~zF
set /a SIZE_MB=!SIZE! / 1024 / 1024

echo ==========================================
echo [SUCCESS] Build Complete!
echo ==========================================
echo.
echo Installer: %DIST_DIR%\OnussharSetup-%VERSION%-win64.exe
echo Size: !SIZE_MB! MB
echo.
echo To test:
echo   1. Run OnussharSetup-%VERSION%-win64.exe as Administrator
echo   2. Follow the installation wizard
echo   3. Open Settings ^> Language ^> Add keyboard
echo   4. Select Onusshar under Bengali
echo   5. Press Win+Space to switch keyboards
echo.
echo To distribute:
echo   1. Test on a clean Windows 10/11 system
echo   2. Upload to GitHub Releases
echo.

endlocal
