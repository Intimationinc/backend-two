#!/bin/zsh
source ~/.zshrc
echo "hello world of shell scripting"
echo "Local variable: Age is: $age"
echo "Global variable: Experience is: $experience"
response=$(curl -s -o /dev/null -w "%{http_code}" https://www.google.com)
if [ "$response" -eq 200 ]; then
    echo "Google Success $response"
else
    echo "Google Failed $response"
fi
echo "Cron job executed at $(date)"