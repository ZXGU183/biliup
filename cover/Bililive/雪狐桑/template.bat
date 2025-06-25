@echo off
cd /d "%~dp0"
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

:: 移动当前目录的JPG和XML文件到日期文件夹
echo.
echo 正在移动JPG文件...
move "*.jpg" "%datefolder%\" >nul 2>&1
if %errorlevel% equ 0 (
    echo 已移动到 "%datefolder%\"
) else (
    echo 没有找到JPG文件可移动
)
echo 正在移动XML文件...
move "*.xml" "%datefolder%\" >nul 2>&1
if %errorlevel% equ 0 (
    echo 已移动到 "%datefolder%\"
) else (
    echo 没有找到XML文件可移动
)

:: 转换MP4和FLV文件到日期文件夹
echo.
echo 正在转换视频文件...
for %%F in (*.mp4 *.flv) do (
    echo 正在处理: "%%F"
    ffmpeg -i "%%F" -c copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
::NVIDIA
@REM    ffmpeg -i "%%F" -map 0:v -map 0:a -c:v hevc_nvenc -preset fast -profile:v main -tier main -rc vbr -cq:v 28 -b:v 0 -vf "mpdecimate=hi=64*30:lo=64*10:frac=0.33" -c:a copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
@REM    ffmpeg -i "%%F" -map 0:v -map 0:a -c:v hevc_nvenc -preset fast -profile:v main -tier main -rc vbr -cq:v 28 -b:v 0 -maxrate 6000k -bufsize 12000k -vf "mpdecimate=hi=64*30:lo=64*10:frac=0.33" -spatial-aq 1 -temporal-aq 1 -init_qpP 26 -init_qpB 28 -init_qpI 24 -c:a copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
::Intel gen8+（QSV）
@REM    ffmpeg -i "%%F" -map 0:v -map 0:a -c:v hevc_qsv -preset faster -profile:v main -rc vbr -global_quality 28 -b:v 0 -vf "mpdecimate=hi=64*30:lo=64*10:frac=0.33" -c:a copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
@REM    ffmpeg -i "%%F" -map 0:v -map 0:a -c:v hevc_qsv -preset faster -profile:v main -rc vbr -global_quality 28 -b:v 0 -maxrate 6000k -bufsize 12000k -vf "mpdecimate=hi=64*30:lo=64*10:frac=0.33" -extbrc 1 -b_strategy 1 -adaptive_i 1 -adaptive_b 1 -c:a copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
)

:: 移动日期文件夹到目标目录
@REM echo.
@REM echo 正在移动文件夹 "%datefolder%" 到目标目录...
@REM if not exist "%target_dir%\%datefolder%" (
@REM     echo 创建目标目录: "%target_dir%\%datefolder%"
@REM     mkdir "%target_dir%\%datefolder%"
@REM )
@REM 
@REM move /Y "%datefolder%\*" "%target_dir%\%datefolder%" >nul
@REM if %errorlevel% equ 0 (
@REM     rd /s /q %datefolder% && echo 成功移动文件夹到 "%target_dir%\%datefolder%"
@REM ) else (
@REM     echo 移动文件夹失败！请检查目标路径和权限。
@REM )

:: 移动原始 .flv 文件到上级目录
echo.
echo 正在将原始 .flv 文件移动到上级目录 (%~dp0..\)...
if exist "*.flv" (
    move "*.flv" "%~dp0..\"
) else (
    echo 当前目录没有找到原始 .flv 文件可移动到上级目录。
)
if exist "%~dp0..\*.flv" ( echo 原始 .flv 文件已移动到 "%~dp0..\" )

echo.
echo 所有操作已完成！
endlocal
exit