#!/bin/bash
url="www.google.com"
if curl -s --head --request GET $url | grep "200 OK" >/dev/null;then
    echo "success"
else
    echo "fail"
fi