@echo off
setlocal
cd /d "%~dp0"

echo === Local Diagnostics ===
echo.

echo [1/5] Node version
"C:\Program Files\nodejs\node.exe" -v
if errorlevel 1 (
  echo Node is not available at C:\Program Files\nodejs\node.exe
  pause
  exit /b 1
)

echo.
echo [2/5] NPM version
"C:\Program Files\nodejs\npm.cmd" -v

echo.
echo [3/5] Port 3000 usage before start
netstat -ano | findstr :3000

echo.
echo [4/5] Starting server (10s check)...
start "insightful-hires-local" cmd /c ""C:\Program Files\nodejs\node.exe" dev-server.js"
timeout /t 10 /nobreak >nul

echo.
echo [5/5] Health check
curl -i http://127.0.0.1:3000/api/health

echo.
echo Port 3000 usage after start
netstat -ano | findstr :3000

echo.
echo If health check returned HTTP/1.1 200, open: http://127.0.0.1:3000
echo Close the "insightful-hires-local" window when done.
pause
endlocal
