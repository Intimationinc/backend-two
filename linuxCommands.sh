#!/bin/bash
echo "hello world"
export age=27
export os="Ubuntu"
echo "age = $age"
echo "os = $os"

echo "request to google.com: "
res=$(curl -s -o /dev/null -w "%{http_code}" https://www.google.com)

if [ "$res" -eq 200 ]; then
	echo "success"
else 
	echo "failed"
fi
