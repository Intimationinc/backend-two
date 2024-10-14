#!/bin/bash

if curl -s --head www.google.com | grep "200 OK" > /dev/null
then
	echo "Success! Google is UP. $(date)" >> /Users/arifhossen/Backend/backend-two/cron_log.txt
else
	echo "Fail! Google is Down. $(date)" >> /Users/arifhossen/Backend/backend-two/cron_log.txt
fi
