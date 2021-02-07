@echo off
set /p message="Enter commit message: "
git add .
git commit -am "%message%"
git push origin master
git push heroku master