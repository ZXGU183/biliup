@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"
color CF
setlocal enabledelayedexpansion

echo 将删除 "%~dp0" 及其所有子目录下的所有 .flv 文件！
echo.
echo 正在列出所有将被删除的 .flv 文件:
echo.

set "fileCount=0"
for /r %%F in (*.flv) do (
    echo 删除文件: "%%F"
    set /a fileCount+=1
)

if %fileCount%==0 (
    echo.
    echo 没有找到 .flv 文件！
    goto End
)

echo.
echo 以上文件将被删除，请按回车键继续，否则请退出或关闭
pause

echo.
echo 正在删除所有 .flv 文件...
for /r %%F in (*.flv) do (
    echo 删除文件: "%%F"
    del "%%F"
)

color BF
echo.
echo 删除完成！
:End
ping 127.0.0.1 -n 3 >nul
exit
