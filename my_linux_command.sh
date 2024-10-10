#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" www.google.com)

if [ "$response" -eq 200 ]; then
    echo "success"
else
    echo "fail"
fi

# to add cronjob into crontab
* * * * * /users/shahriarahmmed/curl_res.sh >> output.txt

