@echo off
cd /d %~dp0
setlocal enabledelayedexpansion

:: 目标目录（请确保路径正确）
REM set "target_dir=可以填入绝对路径或相对路径，若访问受限请自行提权"

:: 使用 PowerShell 获取标准化日期，可以参照命令标准自行修改
for /f "delims=" %%d in ('powershell -command "Get-Date -Format 'yyyy.M.d'"') do set "datefolder=%%d"

:: 创建日期文件夹
if not exist "%datefolder%" (
    mkdir "%datefolder%"
    echo 已创建文件夹: "%datefolder%"
) else (
    echo 文件夹已存在: "%datefolder%"
)

:: 移动当前目录的JPG文件到日期文件夹
echo.
echo 正在移动JPG文件...
move "*.jpg" "%datefolder%\" >nul 2>&1
if %errorlevel% equ 0 (
    echo 已移动JPG文件到 "%datefolder%\"
) else (
    echo 没有找到JPG文件可移动
)

:: 转换MP4和FLV文件到日期文件夹
echo.
echo 正在转换视频文件...
for %%F in (*.mp4 *.flv) do (
    echo 正在处理: "%%F"
    ffmpeg -i "%%F" -c copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
)

:: 移动日期文件夹到目标目录
echo.
@REM echo 正在移动文件夹 "%datefolder%" 到目标目录...
@REM if not exist "%target_dir%\" (
@REM     echo 创建目标目录: "%target_dir%"
@REM     mkdir "%target_dir%"
@REM )
@REM 
@REM move /Y "%datefolder%" "%target_dir%\" >nul
@REM if %errorlevel% equ 0 (
@REM     echo 成功移动文件夹到 "%target_dir%\%datefolder%"
@REM ) else (
@REM     echo 移动文件夹失败！请检查目标路径和权限。
@REM )

echo.
echo 所有操作已完成！结果保存在 "%target_dir%\%datefolder%\" 文件夹中
endlocal
exit