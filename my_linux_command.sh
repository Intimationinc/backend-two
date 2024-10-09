#!/bin/bash
#$Revision: 001$
#$Tuesday, October 8, 2024 10:31:30 PM$
# This is a comprose big file to achive

#Variables

BASE=/home/nayem/development
DAYS=5
DEPTH=1
RUN=0

# Check if the directory is present or not
if [ ! -d $BASE ]
then
        echo "directory does not exist: $BASE"
        exit 1
fi

#Create 'archive' folder if not exist
if [ ! -d " $BASE/archive" ]
then
        mkdir "$BASE/archive"
fi

#Find the list of files largest then 5MB
for i in $(find "$BASE" -maxdepth $DEPTH -type f -size +5M)
do
        if [ $RUN -eq 0 ]
        then
                echo "[$(date "+%Y-%m-%d %H:%M:%S")] archiving $i ==> $BASE/archive"
                gzip "$i" || exit 1
                mv "$i.gz" "$BASE/archive" || exit 1
        fi
done