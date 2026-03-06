@echo off
setlocal
cd /d "%~dp0"

set HOST=127.0.0.1
set PORT=3000
echo Starting local server at http://%HOST%:%PORT% ...
"C:\Program Files\nodejs\node.exe" dev-server.js

if errorlevel 1 (
  echo.
  echo Server failed to start. Check Node install and dependencies.
  pause
)

endlocal
