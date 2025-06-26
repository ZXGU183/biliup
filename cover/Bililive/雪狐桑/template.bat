@echo off
cd /d %~dp0
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

:: �ƶ���ǰĿ¼��JPG�ļ��������ļ���
echo.
echo �����ƶ�JPG�ļ�...
move "*.jpg" "%datefolder%\" >nul 2>&1
if %errorlevel% equ 0 (
    echo ���ƶ�JPG�ļ��� "%datefolder%\"
) else (
    echo û���ҵ�JPG�ļ����ƶ�
)

:: ת��MP4��FLV�ļ��������ļ���
echo.
echo ����ת����Ƶ�ļ�...
for %%F in (*.mp4 *.flv) do (
    echo ���ڴ���: "%%F"
    ffmpeg -i "%%F" -c copy -movflags +faststart -fps_mode vfr "%datefolder%\%%~nF.mov"
)

:: �ƶ������ļ��е�Ŀ��Ŀ¼
echo.
@REM echo �����ƶ��ļ��� "%datefolder%" ��Ŀ��Ŀ¼...
@REM if not exist "%target_dir%\" (
@REM     echo ����Ŀ��Ŀ¼: "%target_dir%"
@REM     mkdir "%target_dir%"
@REM )
@REM 
@REM move /Y "%datefolder%" "%target_dir%\" >nul
@REM if %errorlevel% equ 0 (
@REM     echo �ɹ��ƶ��ļ��е� "%target_dir%\%datefolder%"
@REM ) else (
@REM     echo �ƶ��ļ���ʧ�ܣ�����Ŀ��·����Ȩ�ޡ�
@REM )

echo.
echo ���в�������ɣ���������� "%target_dir%\%datefolder%\" �ļ�����
endlocal
exit