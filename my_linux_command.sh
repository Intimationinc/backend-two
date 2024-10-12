#Go to the user's home directory
cd ~

#Go to the root directory
cd /

#In the user's home directory, create a new folder and move inside the folder
cd ~
mkdir new_folder
cd new_folder

#Create a new text file inside the new directory
touch new_file.txt

#Go to the previous directory
cd ..

#Remove the directory
rm -r new_folder

#Create a .sh file and write echo "hello world" inside it with shebang syntax
echo -e '#!/bin/bash\n\n echo "hello world"' > hello_world.sh

#Set permission to executable for the file
chmod +x hello_world.sh

#Run the .sh file
./hello_world.sh

#Set an environment variable namely age with value 30 and echo it in the .sh file
echo -e '#!/bin/bash\n\nage=30\n echo "Age: $age"' > hello_world.sh

#Set a global environment variable namely experience with value 4 and echo it from the .sh file
echo -e '#!/bin/bash\n\nage=30\nexperience=4\nexport experience\necho "Age: $age"\necho "Experience: $experience"' > hello_world.sh

#Generate an SSH keypair with ssh-keygen
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# See the list of processes currently running and write down the first 3 process IDs
ps -e | head -n 4

# Create another .sh file/shell script to fetch data from www.google.com using curl
echo -e '#!/bin/bash\n\ncurl -s --head http://www.google.com | head -n 1 | grep "200 OK" > /dev/null\nif [ $? -eq 0 ]; then\n  echo "success"\nelse\n  echo "fail"\nfi' > check_google.sh

#Using cron, set a job so that every 1 minute the .sh script is run
crontab -e
