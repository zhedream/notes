

reg query "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" /s | findstr /i "cursor"
```bash
PS C:\Users\l1951> reg query "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" /s | findstr /i "cursor"
    DisplayName    REG_SZ    Cursor 0.45.14
    UninstallString    REG_SZ    "C:\Users\l1951\AppData\Local\Programs\cursor\Uninstall Cursor.exe" /currentuser
    QuietUninstallString    REG_SZ    "C:\Users\l1951\AppData\Local\Programs\cursor\Uninstall Cursor.exe" /currentuser /S
    DisplayIcon    REG_SZ    C:\Users\l1951\AppData\Local\Programs\cursor\Cursor.exe,0
    Publisher    REG_SZ    Cursor AI, Inc.
    Inno Setup: App Path    REG_SZ    C:\Users\l1951\AppData\Local\Programs\cursor
    InstallLocation    REG_SZ    C:\Users\l1951\AppData\Local\Programs\cursor\
    Inno Setup: Icon Group    REG_SZ    Cursor
    DisplayName    REG_SZ    Cursor (User)
    DisplayIcon    REG_SZ    C:\Users\l1951\AppData\Local\Programs\cursor\Cursor.exe
    UninstallString    REG_SZ    "C:\Users\l1951\AppData\Local\Programs\cursor\unins000.exe"
    QuietUninstallString    REG_SZ    "C:\Users\l1951\AppData\Local\Programs\cursor\unins000.exe" /SILENT
    URLInfoAbout    REG_SZ    https://www.cursor.com/downloads/
    HelpLink    REG_SZ    https://forum.cursor.com/
    URLUpdateInfo    REG_SZ    https://www.cursor.com/downloads/


[math]::Round(0x112b66 / 1024 / 1024, 2)

```

reg query "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" /s /f "Cursor 0.45.14" /d

```bash
PS C:\Users\l1951> reg query "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" /s /f "Cursor 0.45.14" /d

HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\62625861-8486-5be9-9e46-1da50df5f8ff
    DisplayName    REG_SZ    Cursor 0.45.14

搜索结束: 找到 1 匹配。
```

```bash
reg delete "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\62625861-8486-5be9-9e46-1da50df5f8ff" /f
```

