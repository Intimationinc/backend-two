#!/bin/bash

echo "Script executed at: $(date)" >> /home/rony/cron_output.log

if /usr/bin/curl -s --head http://www.google.com | grep "200 OK" > /dev/null; then

    echo "success"
else
    echo "fail"
fi
