@echo off
cd /d "%~dp0"
setlocal enabledelayedexpansion

:: Ŀ��Ŀ¼����ȷ��·����ȷ��
REM set "target_dir=�����������·�������·����������������������Ȩ"

:: ʹ�� PowerShell ��ȡ��׼�����ڣ����Բ��������׼�����޸�
for /f "delims=" %%d in ('powershell -command "Get-Date -Format 'yyyy.M.d'"') do set "datefolder=%%d"

:: ���������ļ���
if not exist "%datefolder%" (
    mkdir "%datefolder%"
    echo �Ѵ����ļ���: "%datefolder%"
) else (
    echo �ļ����Ѵ���: "%datefolder%"
)

:: �ƶ���ǰĿ¼��JPG��XML�ļ��������ļ���
echo.
echo �����ƶ�JPG�ļ�...
move "*.jpg" "%datefolder%\" >nul 2>&1
if %errorlevel% equ 0 (
    echo ���ƶ��� "%datefolder%\"
) else (
    echo û���ҵ�JPG�ļ����ƶ�
)
echo �����ƶ�XML�ļ�...
move "*.xml" "%datefolder%\" >nul 2>&1
if %errorlevel% equ 0 (
    echo ���ƶ��� "%datefolder%\"
) else (
    echo û���ҵ�XML�ļ����ƶ�
)

:: ת��MP4��FLV�ļ��������ļ���
echo.
echo ����ת����Ƶ�ļ�...
for %%F in (*.mp4 *.flv) do (
    echo ���ڴ���: "%%F"
    ffmpeg -i "%%F" -c copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
::NVIDIA
@REM    ffmpeg -i "%%F" -map 0:v -map 0:a -c:v hevc_nvenc -preset fast -profile:v main -tier main -rc vbr -cq:v 28 -b:v 0 -vf "mpdecimate=hi=64*30:lo=64*10:frac=0.33" -c:a copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
@REM    ffmpeg -i "%%F" -map 0:v -map 0:a -c:v hevc_nvenc -preset fast -profile:v main -tier main -rc vbr -cq:v 28 -b:v 0 -maxrate 6000k -bufsize 12000k -vf "mpdecimate=hi=64*30:lo=64*10:frac=0.33" -spatial-aq 1 -temporal-aq 1 -init_qpP 26 -init_qpB 28 -init_qpI 24 -c:a copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
::Intel gen8+��QSV��
@REM    ffmpeg -i "%%F" -map 0:v -map 0:a -c:v hevc_qsv -preset faster -profile:v main -rc vbr -global_quality 28 -b:v 0 -vf "mpdecimate=hi=64*30:lo=64*10:frac=0.33" -c:a copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
@REM    ffmpeg -i "%%F" -map 0:v -map 0:a -c:v hevc_qsv -preset faster -profile:v main -rc vbr -global_quality 28 -b:v 0 -maxrate 6000k -bufsize 12000k -vf "mpdecimate=hi=64*30:lo=64*10:frac=0.33" -extbrc 1 -b_strategy 1 -adaptive_i 1 -adaptive_b 1 -c:a copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
)

:: �ƶ������ļ��е�Ŀ��Ŀ¼
@REM echo.
@REM echo �����ƶ��ļ��� "%datefolder%" ��Ŀ��Ŀ¼...
@REM if not exist "%target_dir%\%datefolder%" (
@REM     echo ����Ŀ��Ŀ¼: "%target_dir%\%datefolder%"
@REM     mkdir "%target_dir%\%datefolder%"
@REM )
@REM 
@REM move /Y "%datefolder%\*" "%target_dir%\%datefolder%" >nul
@REM if %errorlevel% equ 0 (
@REM     rd /s /q %datefolder% && echo �ɹ��ƶ��ļ��е� "%target_dir%\%datefolder%"
@REM ) else (
@REM     echo �ƶ��ļ���ʧ�ܣ�����Ŀ��·����Ȩ�ޡ�
@REM )

:: �ƶ�ԭʼ .flv �ļ����ϼ�Ŀ¼
echo.
echo ���ڽ�ԭʼ .flv �ļ��ƶ����ϼ�Ŀ¼ (%~dp0..\)...
if exist "*.flv" (
    move "*.flv" "%~dp0..\"
) else (
    echo ��ǰĿ¼û���ҵ�ԭʼ .flv �ļ����ƶ����ϼ�Ŀ¼��
)
if exist "%~dp0..\*.flv" ( echo ԭʼ .flv �ļ����ƶ��� "%~dp0..\" )

echo.
echo ���в�������ɣ�
endlocal
exit