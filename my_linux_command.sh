#!/bin/bash

echo "Creating a directory 'linux_practice_dir'"
mkdir linux_practice_dir
cd linux_practice_dir

echo "Creating files..."
touch file1.txt file2.txt file3.log

echo "Listing files in the current directory"
ls -la

echo "Changing permissions of 'file1.txt' to be executable by the owner"
chmod u+x file1.txt
ls -l file1.txt

echo "Changing permissions of 'file2.txt' to read-only for everyone"
chmod 444 file2.txt
ls -l file2.txt

echo "Adding text to file2.txt using echo"
echo "Hello, this is a practice file." > file2.txt
cat file2.txt

echo "Starting a sleep process in the background"
sleep 60 &
echo "Listing active processes:"
ps aux | grep sleep

echo "Killing the sleep process"
kill %1

echo "Pinging google.com to test network connectivity"
ping -c 3 google.com

echo "Creating a simple script inside the directory..."
echo -e '#!/bin/bash\necho "This is a test script!"' > test_script.sh
chmod +x test_script.sh
./test_script.sh

echo "Setting and displaying environment variables"
export MY_VAR="PracticeValue"
echo "Environment Variable MY_VAR = $MY_VAR"

echo "Displaying disk space usage:"
df -h

echo "Displaying system information:"
uname -a

echo "Searching for 'Hello' in file2.txt"
grep 'Hello' file2.txt

echo "Counting words in file2.txt"
wc -w file2.txt

echo "Creating a new group"
# sudo groupadd practicegroup

echo "Adding current user to the new group"
# sudo usermod -aG practicegroup $USER

echo "Starting another sleep process in the background"
sleep 120 &
PID=$!
echo "Listing details of the sleep process with PID $PID:"
ps -p $PID -o pid,cmd,%cpu,%mem,etime

echo "Killing the sleep process."
kill $PID

echo "Displaying network interfaces"
ipconfig

echo "Monitoring system with 'top' command"
top -b -n 1 | head -n 15

echo "Checking for available package updates "
# sudo apt update

echo "Installing the curl package"
# sudo apt install curl

echo "Checking the system logs"
# sudo tail /var/log/syslog

echo "Listing disk partitions..."
lsblk
