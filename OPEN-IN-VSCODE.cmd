@echo off
setlocal
where code >nul 2>nul
if errorlevel 1 (
  echo Open VS Code, select File then Open Folder, and select this folder:
  echo "%~dp0."
  pause
  exit /b 1
)
call code "%~dp0."
endlocal
