#!/bin/bash

curl -s --head www.google.com > /dev/null

if [ $? -eq 0 ]; then
  echo "success"
else
  echo "fail"
fi