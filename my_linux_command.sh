#!/bin/bash
# Go to users home directory
cd ~

# Go to root directory
cd /

# In users home directory create a new folder and move inside the folder
mkdir my_folder
cd my_folder

# Create a new text file inside new directory
touch my_file.txt

# Go to previous directory
cd ..

# Remove the directory
rm -rf my_folder

# Create the shell script file named my_linux_command.sh
nano my_linux_command.sh

# Inside my_linux_command.sh, write: hello world
echo "hello world"

# Save and exit the editor
# Make the script executable
chmod +x my_linux_command.sh

# Run the script
./my_linux_command.sh

# Set an environment variable namely age with value 30 and in the .sh file access the variable and echo it
export age=30
echo "Age is: $age"

# Now set global environment variable namely experience with value 4 and echo it from the .sh file
nano ~/.bashrc
export experience=4
source ~/.bashrc
echo "Experience is: $experience"

# Generate a ssh keypair with keygen
ssh-keygen -t rsa -b 4096 -C "abdurrakib961@gmail.com"

# Send a GET request to www.google.com using curl
response=$(curl -o /dev/null -s -w "%{http_code}" https://www.google.com)

if [ $response -eq 200 ]; then
   echo "Success"
else
   echo "Fail"
fi

# Using cron set a job so that every 1 minute the .sh script is run and you can check if google.com is really working
# cronjob list
crontab -l
# edit crontab
crontab -e
# add cronjob to the crontab which will run every 1 minute and log it in cron_output.log
* * * * * /home/rakib/Desktop/exercise/backend-two/my_linux_command.sh >> /home/rakib/Desktop/exercise/backend-two/cron_output.log 2>&1
