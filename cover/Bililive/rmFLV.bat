@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"
color CF
setlocal enabledelayedexpansion

echo ��ɾ�� "%~dp0" ����������Ŀ¼�µ����� .flv �ļ���
echo.
echo �����г����н���ɾ���� .flv �ļ�:
echo.

set "fileCount=0"
for /r %%F in (*.flv) do (
    echo ɾ���ļ�: "%%F"
    set /a fileCount+=1
)

if %fileCount%==0 (
    echo.
    echo û���ҵ� .flv �ļ���
    goto End
)

echo.
echo �����ļ�����ɾ�����밴�س����������������˳���ر�
pause

echo.
echo ����ɾ������ .flv �ļ�...
for /r %%F in (*.flv) do (
    echo ɾ���ļ�: "%%F"
    del "%%F"
)

color BF
echo.
echo ɾ����ɣ�
:End
ping 127.0.0.1 -n 3 >nul
exit
