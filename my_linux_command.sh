#!/bin/bash

export age=30

url="https://www.google.com"

response=$(curl -s "$url")

if [ $? -eq 0 ]; then
  if [[ -n "$response" ]]; then
    echo "$(date) - Success! Fetched data from Google."
  else
    echo "$(date) - Success, but no data received from Google."
  fi
else
  echo "$(date) - Fail! Could not fetch data from Google."
fi
