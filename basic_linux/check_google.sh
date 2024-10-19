#!/bin/bash

# Send a GET request to www.google.com
response=$(curl -s www.google.com)

# Check the HTTP status code
if [[ $? -eq 0 ]]; then
  # Success
  echo "Success"
else
  # Fail
  echo "Fail"
fi