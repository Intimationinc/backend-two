#!/bin/bash

1. # Go to the user's home directory
cd ~

2. # Go to the root directory
cd /

3. # In user's home directory, create a new folder and move inside it
cd ~
mkdir my_practice_folder
cd my_practice_folder

4. # Create a new text file inside the new directory
touch my_file.txt

5. # Go to the previous directory
cd ..

6. # Remove the directory
rm -r my_practice_folder

7. # Create a .sh file and write "Hello World" inside it with shebang syntax
nano hello_world.sh

#!/bin/bash
echo "Hello World"

8. # Set permission to executable for the file
chmod +x hello_world.sh

9. # Run the .sh file
./hello_world.sh

10. # Set and environment variable age with value 30 and access it in the .sh file
export age=30
nano hello_world.sh

11. # Update the script with age
#!/bin/bash

echo "Hello World"
echo "Age is: $age"

12. # Run the file for getting result of the file
./hello_world.sh

# The result is
Hello World
Age is: 30

13. # Set a global environment variable experience with value 4 and access it
sudo nano /etc/environment

experience=4

# to load the variable
source/etc/environment


14. # Update the hello_world.sh file
#!/bin/bash

echo "Hello World"
echo "Age is: $age"
echo "Experience is: $experience"

15. # Generate an ssh keypair with ssh-keygen
ssh-keygen -t rsa -b 4096 -C "ronybarua.ethical18@gmail.com"

16. # See list of currently running processes and write down first 3 process ids
ps-aux

PID- 1,2,7

17. # Create Another .sh File That Fetches Data Using curl from www.google.com
nano check_google.sh

#!/bin/bash
if curl -s --head http://www.google.com | grep "200 OK" > /dev/null; then

    echo "success"
else
    echo "fail"
fi

18. # make the file executable and run it
chmod +x check_google.sh

./check_google.sh

19. # Display full path 
pwd

20. # Display file contents
cat check_google.sh

21. # using cron, set a job to run the .sh script every 1 minute

crontab -e

* * * * * /mnt/d/Essentials/Intimationinc/check_google.sh >> /home/rony/cron_output.log 2>&1


22. # To see the cron status
sudo service cron status

23. # To restart the cron job
sudo service cron restart

24. # To see the full path in crontab entry
crontab -l
