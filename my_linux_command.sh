#!/bin/bash

response=$(curl -s https://jsonplaceholder.typicode.com/todos/1)

# Check the response status
if [ $? -eq 0 ]; then
    echo "success"
else
    echo "fail"
fi
