#!/bin/bash
echo "hello world"
echo "Age is: $age"

# fetch google with curl
response=$(curl -o /dev/null -s -w "%{http_code}" www.google.com)

# check if the response 
if [ "$response" -eq 200 ]; then
    echo "success"
else
    echo "fail"
fi


# BASIC DATA BACKUP PROJECT
# TOOK HELP FROM CHATGPT 

# Configuration
SOURCE_DIR="/path/to/source"     # Replace with your source directory
DEST_DIR="/path/to/destination"  # Replace with your destination directory
LOG_FILE="../logs/backup.log"    # Path to the log file

# Create logs directory if it doesn't exist
mkdir -p ../logs

# Timestamp for logs
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

# Create a log entry for the backup start
echo "[$TIMESTAMP] Starting backup from $SOURCE_DIR to $DEST_DIR" >> "$LOG_FILE"

# Perform the backup using rsync (you can also use cp if rsync is not installed)
rsync -avh --delete "$SOURCE_DIR" "$DEST_DIR" >> "$LOG_FILE" 2>&1

# Check if the backup was successful
if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] Backup completed successfully." >> "$LOG_FILE"
else
    echo "[$TIMESTAMP] Backup failed!" >> "$LOG_FILE"
fi
