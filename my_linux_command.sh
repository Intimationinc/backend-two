#!/bin/bash
# Now create another .sh file/shell script which can fetch some data using curl from www.google.com , If the request is successful it should echo “success” otherwise “fail”
# Fetch data from Google
response=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" https://www.google.com)

# Check if the request was successful
if [ "$response" -eq 200 ]; then
echo "$(date) : success" >> /home/alamgir/special/logfile.log
else
echo "$(date) : fail" >> /home/alamgir/special/logfile.log
fi

# Set an environment variable namely age with value 30 and in the .sh file access the variable and echo it
myAge=30
echo $myAge
# Now set global environment variable namely experience with value 4 and echo it from the .sh file
export myEnv=pop
echo $myEnv

# See list of process currently running and write down first 3 process’s id
 ps
 ps -e -o pid= | head -n 3