@echo off
chcp 65001 >nul
title BỆNH VIỆN VĨNH PHÚC VPI — KHỞI CHẠY SỔ TAY ĐIỆN TỬ CĐHA (vudat.cdha)
cls

echo ===============================================================================
echo        BỆNH VIỆN VĨNH PHÚC VPI — KHOA CHẨN ĐOÁN HÌNH ẢNH
echo               HỆ THỐNG SỔ TAY ĐIỆN TỬ CĐHA CHUẨN HÓA
echo ===============================================================================
echo.
echo [*] Đang kiểm tra cổng mạng và khởi động máy chủ Web nội bộ...
echo [*] Địa chỉ truy cập: http://vudat.cdha/ hoặc http://localhost:8080/
echo.
echo -------------------------------------------------------------------------------
echo [MẸO NHANH] Để truy cập bằng đúng tên miền http://vudat.cdha:
echo   1. Mở Notepad bằng quyền Administrator
echo   2. Mở file: C:\Windows\System32\drivers\etc\hosts
echo   3. Thêm dòng: 127.0.0.1   vudat.cdha
echo   4. Lưu lại và mở trình duyệt gõ: http://vudat.cdha:8080/ (hoặc port 80)
echo -------------------------------------------------------------------------------
echo.
echo [*] Đang mở trình duyệt web...
start "" "http://localhost:8080/"

REM Kiểm tra Python có sẵn không
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [*] Đang chạy Web Server bằng Python trên cổng 8080...
    echo [*] Nhấn Ctrl + C để dừng máy chủ khi kết thúc ca làm việc.
    echo.
    python -m http.server 8080
    goto end
)

REM Nếu không có Python, kiểm tra PowerShell Web Server
echo [*] Khởi chạy Web Server bằng PowerShell...
powershell -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://*:8080/'); $listener.Start(); Write-Host 'Server running at http://localhost:8080/'; while ($listener.IsListening) { $context = $listener.GetContext(); $req = $context.Request; $res = $context.Response; $path = '.' + $req.Url.LocalPath; if ($path -eq './') { $path = './index.html' }; if (Test-Path $path) { $bytes = [System.IO.File]::ReadAllBytes($path); $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length) } else { $res.StatusCode = 404 }; $res.OutputStream.Close() }"

:end
pause
