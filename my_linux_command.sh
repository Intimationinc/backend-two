# Move a File
mv source_file.txt /path/to/destination/

# Create a File
touch newfile.txt

# Remove a File
rm file.txt

# Copy a File
cp file.txt /path/to/destination/

# Create a Directory
mkdir new_directory

# Remove an Empty Directory
rmdir directory

# Remove a directory and its contents
rm -r directory

# Copy a Directory
cp -r directory /path/to/destination/

# Change Directory
cd /path/to/directory/

# List Files and Directories
ls

# List Files and Directories with Details (showing permissions like -rwxr-xr--).
ls -l 

# List All Files and Directories
ls -a

# List Files and Directories with Details and Hidden Files
ls -la

# Set Permissions
chmod 755 file.txt

# Display the Current Directory
pwd

# Display the Contents of a File
cat file.txt

# Display the Contents of a File with Line Numbers
cat -n file.txt

# grep - Search for a Pattern in a File
grep "pattern" file.txt

# grep - Search for a Pattern in a File (Case Insensitive)
grep -i "pattern" file.txt

# grep - regex search: This finds all lines in file.txt that start with a capital letter (since ^ represents the start of a line and [A-Z] means "any uppercase letter").
grep "^[A-Z]" file.txt

# Find Files by Name
find /path/to/directory/ -name "filename.txt"

# Public-Private Key Generation (SSH Key Pair)
ssh-keygen -t rsa

# SSH Access
ssh username@hostname

# make sure SSH service is running
sudo systemctl start ssh
sudo systemctl enable ssh

# SCP - Securely Copy Files Between Remote Hosts
scp file.txt username@hostname:/path/to/destination/

# SCP - Securely Copy Files Between Remote Hosts (with Port)
scp -P 2222 file.txt username@hostname:/path/to/destination/

# SCP - Securely Copy Files Between Remote Hosts (with Port and Key)
scp -P 2222 -i /path/to/key.pem file.txt username@hostname:/path/to/destination/

# Scheduling Tasks with Cron
crontab -e

# List Cron Jobs
crontab -l

# Cron Job Syntax
# * * * * * command
# - - - - -
# | | | | |
# | | | | +----- Day of the Week (0 - 7) (Sunday is 0 or 7)
# | | | +------- Month (1 - 12)

# This schedules the script script.sh to run at 5 AM every day
0 5 * * * /path/to/script.sh

# Cron Job Examples
# Run a Script Every Minute
* * * * * /path/to/script.sh

# Run a Script Every Hour
0 * * * * /path/to/script.sh

# Run a Script Every Day at Midnight
0 0 * * * /path/to/script.sh

# Run a Script Every Week
0 0 * * 0 /path/to/script.sh

# Run a Script Every Month
0 0 1 * * /path/to/script.sh

# Environment Variables
export MY_VARIABLE=value

# Display Environment Variables
echo $MY_VARIABLE

# Global Variable (persistent across sessions, usually set in .bashrc or /etc/environment):
echo 'export VAR_NAME=value' >> ~/.bashrc
source ~/.bashrc

# List Running Processes
ps

# List Running Processes with Details
ps aux

# Kill a Process
kill PID

# Kill a Process by Name
pkill process_name

# Create a group
sudo groupadd groupname

# Add a user to a group
sudo usermod -aG groupname username

# Remove a user from a group
sudo gpasswd -d username groupname

# Set permissions for a group
chown :groupname project_folder
chmod 770 project_folder

# Change the owner of a file
sudo chown username:groupname file.txt

#curl - download a file
curl -O https://example.com/file.txt

# curl - retrieving data from a URL
curl https://example.com

# curl - sending data to a URL
curl -X POST -d "data" https://example.com

# curl - sending data to a URL with a header
curl -H "Content-Type: application/json" -X POST -d '{"key":"value"}' https://example.com

# curl - sending data to a URL with basic authentication
curl -u username:password https://example.com

# wget
wget https://example.com/file.txt

# tar
tar -xvf file.tar.gz

# nano
nano file.txt

# nano basic commands
Ctrl + O - Save file
Ctrl + X - Exit nano
Ctrl + G - Get help
Ctrl + K - Cut text
Ctrl + U - Paste text
Ctrl + W - Search for text