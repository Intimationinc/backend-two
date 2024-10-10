#!/bin/bash

echo "Date: $(date)"

if /usr/bin/curl -s -I -X GET http://www.google.com | grep "200 OK" > /dev/null; then 
    echo "success"
else 
   echo "fail"

fi


