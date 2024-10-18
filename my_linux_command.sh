#!/bin/bash

# Export an environment variable
export experience=4

# Simple echo statement
echo "hello world"

# Set an environment variable 'age' and access it
age=40 

# Echo the 'age' variable
echo "Your age is $age"

# Access the global environment variable 'experience' and echo it
echo "Your working experience is $experience years"

# Generate an SSH keypair using ssh-keygen
ssh-keygen -t rsa -b 4096

# See the list of processes currently running and get the first 3 process IDs
ps aux | head -n 4

# Use curl to fetch data from www.google.com and print success if response code is 200
response=$(curl -s -o /dev/null -w "%{http_code}" www.google.com)

if [ "$response" -eq 200 ]; then
    echo "success"
else
    echo "fail"
fi
