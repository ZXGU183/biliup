@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"
color CF
setlocal enabledelayedexpansion

echo.
echo ��ѡ�� .flv �ļ���ɾ����Χ:
echo   [ֱ�Ӱ��س�] - ��ɾ����ǰĿ¼ (%~dp0) �µ� .flv �ļ�
echo   [  ���� a  ] - ɾ����ǰĿ¼����������Ŀ¼�µ� .flv �ļ�
echo.
set /p "scopeChoice=����������ѡ�� (ֱ�Ӱ��س���ʾ����ǰĿ¼, ���� 'a' ��ʾ��ǰĿ¼��������Ŀ¼): "

set "searchDescription="

if /i "%scopeChoice%"=="a" (
    set "searchDescription=��ǰĿ¼ (%~dp0) ����������Ŀ¼"
    echo ��ѡ����ɾ�� %searchDescription% �µ� .flv �ļ���
) else (
    set "searchDescription=����ǰĿ¼ (%~dp0)"
    echo ��ѡ����ɾ�� %searchDescription% �µ� .flv �ļ���
)

echo.
echo �����г����� %searchDescription% ɾ���� .flv �ļ�:
echo.

set "fileCount=0"
if /i "%scopeChoice%"=="a" (
    for /r %%F in (*.flv) do (
        echo ����ɾ�����ļ�: "%%F"
        set /a fileCount+=1
    )
) else (
    for %%F in (*.flv) do (
        echo ����ɾ�����ļ�: "%%F"
        set /a fileCount+=1
    )
)

if %fileCount%==0 (
    echo.
    echo ��ѡ����Χ��û���ҵ� .flv �ļ���
    goto End
)

echo.
echo �ܹ���ɾ�� !fileCount! �� .flv �ļ���
echo �밴�س�������ɾ����������رմ˴�����ȡ����
pause

echo.
echo ����ɾ�� .flv �ļ�...
if /i "%scopeChoice%"=="a" (
    for /r %%F in (*.flv) do (
        echo ����ɾ���ļ�: "%%F"
        del "%%F" /q /f
    )
) else (
    for %%F in (*.flv) do (
        echo ����ɾ���ļ�: "%%F"
        del "%%F" /q /f
    )
)

color BF
echo.
echo ɾ����ɣ�
:End
ping 127.0.0.1 -n 3 >nul
exit