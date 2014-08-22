@echo off

ECHO SET PATH DEFAULT
SET PATH=C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\Windows System Resource Manager\bin;C:\Program Files (x86)\EasyPHP-DevServer-13.1VC11\binaries\php\php_runningversion;


rem Ensure this Node.js and npm are first in the PATH
REM set PATH=%APPDATA%\npm;%~dp0;%PATH%
ECHO SET PATH NODEJS NPM
SET PATH=C:\Program Files\nodejs\Roaming\npm\;C:\Program Files\nodejs\;%PATH%

setlocal enabledelayedexpansion
pushd "%~dp0"

rem Figure out the node version.
set print_version=.\node.exe -p -e "process.versions.node + ' (' + process.arch + ')'"
for /F "usebackq delims=" %%v in (`%print_version%`) do set version=%%v

rem Print message.
if exist npm.cmd (
  echo Your environment has been set up for using Node.js !version! and npm.
) else (
  echo Your environment has been set up for using Node.js !version!.
)

popd
endlocal

rem If we're in the node.js directory, change to the user's home dir.
if "%CD%\"=="%~dp0" cd /d "%HOMEDRIVE%%HOMEPATH%"

ECHO set path for Ruby e Sencha
set PATH=C:\Ruby187\bin;D:\tmp001\SENCHA\CMD\bin\Sencha\Cmd\4.0.2.67;%PATH%

ECHO settings path for PHONEGAP
set PATH=C:\Program Files\nodejs\Roaming\npm\;%PATH%
echo %PATH%

ECHO settings path for JAVA JDK
set PATH=C:\Program Files\Java\jdk1.7.0_51\bin\;%PATH%
echo %PATH%

ECHO settings path for ANT
set PATH=D:\apache-ant-1.9.3\bin\;%PATH%
echo %PATH%

ECHO settings path and ANDROID_HOME for ANDROID SDK
set PATH=d:\adt-bundle-windows-x86_64-20131030\sdk\tools\;d:\adt-bundle-windows-x86_64-20131030\sdk\platform-tools\;%PATH% 
set ANDROID_HOME=d:\adt-bundle-windows-x86_64-20131030\sdk\tools
echo %PATH%

ECHO settings path for GIT
set PATH=C:\Program Files (x86)\Git\cmd\;%PATH%
echo %PATH%


cd d:\TMP001\SENCHA
ECHO sencha app build testing
ECHO sencha -sdk ..touch generate app TestApp TestApp
ECHO sencha cordova init
ECHO sencha phonegap init
ECHO sencha app build -run native

REM Variable: ANDROID_HOME Value: C:\Development\adt-bundle\sdk
REM Variable: ANT_HOME Value: C:\Development\apache-ant-1.9.2
REM Variable: JAVA_HOME Value: C:\Program Files\Java\jdk1.6.0_45


REM d:\adt-bundle-windows-x86_64-20131030\sdk\tools\;
REM d:\adt-bundle-windows-x86_64-20131030\sdk\platform-tools\;
REM D:\apache-ant-1.9.3\bin\;
REM C:\Program Files\Java\jdk1.7.0_51\bin\;

REM C:\Program Files\nodejs\Roaming\npm\;
REM C:\Program Files\nodejs\;
REM C:\Ruby187\bin
REM D:\tmp001\SENCHA\CMD\bin\Sencha\Cmd\4.0.2.67;

REM C:\Windows\system32;
REM C:\Windows;
REM C:\Windows\System32\Wbem;
REM C:\Windows\System32\WindowsPowerShell\v1.0\;
REM C:\Windows\System32\Windows System Resource Manager\bin;
REM C:\Program Files (x86)\EasyPHP-DevServer-13.1VC11\binaries\php\php_runningversion;



