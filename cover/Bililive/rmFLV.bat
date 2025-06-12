@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"
color CF
setlocal enabledelayedexpansion

echo.
echo 请选择 .flv 文件的删除范围:
echo   [直接按回车] - 仅删除当前目录 (%~dp0) 下的 .flv 文件
echo   [  输入 a  ] - 删除当前目录及其所有子目录下的 .flv 文件
echo.
set /p "scopeChoice=请输入您的选择 (直接按回车表示仅当前目录, 输入 'a' 表示当前目录及所有子目录): "

set "searchDescription="

if /i "%scopeChoice%"=="a" (
    set "searchDescription=当前目录 (%~dp0) 及其所有子目录"
    echo 您选择了删除 %searchDescription% 下的 .flv 文件。
) else (
    set "searchDescription=仅当前目录 (%~dp0)"
    echo 您选择了删除 %searchDescription% 下的 .flv 文件。
)

echo.
echo 正在列出将从 %searchDescription% 删除的 .flv 文件:
echo.

set "fileCount=0"
if /i "%scopeChoice%"=="a" (
    for /r %%F in (*.flv) do (
        echo 将被删除的文件: "%%F"
        set /a fileCount+=1
    )
) else (
    for %%F in (*.flv) do (
        echo 将被删除的文件: "%%F"
        set /a fileCount+=1
    )
)

if %fileCount%==0 (
    echo.
    echo 在选定范围内没有找到 .flv 文件！
    goto End
)

echo.
echo 总共将删除 !fileCount! 个 .flv 文件。
echo 请按回车键继续删除，否则请关闭此窗口以取消。
pause

echo.
echo 正在删除 .flv 文件...
if /i "%scopeChoice%"=="a" (
    for /r %%F in (*.flv) do (
        echo 正在删除文件: "%%F"
        del "%%F" /q /f
    )
) else (
    for %%F in (*.flv) do (
        echo 正在删除文件: "%%F"
        del "%%F" /q /f
    )
)

color BF
echo.
echo 删除完成！
:End
ping 127.0.0.1 -n 3 >nul
exit