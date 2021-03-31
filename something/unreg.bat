@echo off
set /P unregs="Укажите никнеймы ботов для анрега (можно несколько через запятую): "
node unreg.js %unregs%
pause