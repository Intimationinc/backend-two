#!/bin/bash
echo "Hello World!"
echo $age
echo $EXPERIENCE
#Process Id
#----------
#3756
#99488
#107054
url="https://www.google.com"
status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
if [ "$status" -ge 200 ] && [ "$status" -lt 300 ];
then
echo "Success - ${status}" >> ~/google_status.log
else
 echo "Failed - ${status}" >> ~/google_status.log
fi