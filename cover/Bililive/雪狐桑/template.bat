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
    move "*.flv" "%~dp0..\" >nul 2>&1
    if %errorlevel% equ 0 (
        echo �ѽ�ԭʼ .flv �ļ��ƶ����ϼ�Ŀ¼: "%~dp0..\"
    ) else (
        echo �ƶ�ԭʼ .flv �ļ����ϼ�Ŀ¼ʧ�ܣ��������: %errorlevel%
        echo ����Ŀ���ϼ�Ŀ¼�Ƿ�����Լ��Ƿ���д��Ȩ�ޡ�
    )
) else (
    echo ��ǰĿ¼û���ҵ�ԭʼ .flv �ļ����ƶ����ϼ�Ŀ¼��
)

echo.
echo ���в�������ɣ���������� "%target_dir%\%datefolder%\" �ļ�����
if exist "%~dp0..\*.flv" ( echo ԭʼ .flv �ļ����ƶ��� "%~dp0..\" )
endlocal
exit