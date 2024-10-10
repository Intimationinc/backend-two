In the user's home directory, create a new folder and move inside the folder
cd ~
mkdir linux_practice
cd linux_practice

Create new File:
touch newfile.txt

Go to prev directory:
cd ..

remove the directory:
rm -r linux_practice


create a sh file:
touch script.sh

write echo “hello world” inside it with shebang syntax
nano script.sh
#!/bin/bash
echo “hello world” 
ctrl X, Y, Enter

make it executable:
chmod +x script.sh

Run:
./script.sh

Set env variable:
export age=30
nano script.sh
#!/bin/bash
echo “hello world” 
echo "Your age is: $age"
ctrl X, Y, Enter

RUN:
 ./script.sh

Set global env variable:
nano ~/.bashrc
export experience=3
ctrl X, Y, Enter

saved it without restarting:
source ~/.bashrc

RUN:
./script.sh

ssh keygen:
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

process running on system ( 1st 3):
ps -A | head -n 4

