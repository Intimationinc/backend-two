#!/bin/bash
#echo "hello world"

#export age=30
#echo "Are you $age years old?"

#echo "The global environment variable is: $experience"

#Following command has been used to generate and store the ssh key pairs
#ssh-keygen -b 4096

#Listing first three process ids
#ps aux | head -n 4

URL="http://www.google.com/"
response=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

if [ $response -eq 200 ]
then
        echo "success" >> google_check.log
else
        echo "fail" >> google_check.log
fi