@echo off
set /P nickname="Укажите свой никнейм (на который придут звезды): "
set /P tries="Укажите, сколько игр сыграют боты (например, 2): "
node app.js %nickname% %tries%
pause