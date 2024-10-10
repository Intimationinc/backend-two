#!/bin/bash

#Setting environment variables 
echo "Hello World, my age is $age with $exprience years of experience"

#Using curl to get response
status_code=$(curl -o /dev/null -s -w "%{http_code}\n" https://www.google.com)
if [[ $status_code -eq 200 ]]; then
  echo "success"
else
  echo "fail"
fi









