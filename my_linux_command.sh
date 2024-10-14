#!/bin/bash

# Fetch data from google.com using curl
response=$(curl -o /dev/null -s -w "%{http_code}" https://www.google.com)

if [ $response -eq 200 ]; then
   echo "Success"
else
   echo "Fail"
fi
