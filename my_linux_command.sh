#!/bin/bash

# Task 1: Go to users home directory
cd ~/ || exit

# Task 2: Go to root directory
cd /

# Task 3: In users home directory create a new folder and move inside the folder
cd ~/ || exit
mkdir intimationinc && cd intimationinc || exit

# Task 4: Create a new text file inside new directory
touch new_text_file.txt

# Task 5: Go to previous directory
cd ../

# Task 6: Remove the directory
rm -r intimationinc

# Task 7: Create a .sh file and write echo "hello world" inside it with shebang syntax
echo """#!/bin/bash

echo 'hello world'
""" > hello.sh

# Task 8: Set permission to executable to the file
chmod +x hello.sh

# Task 9: Run the .sh file
./hello.sh

# Task 10: Set an environment variable namely age with value 30 and in the .sh file access the variable and echo it
export age=30
echo "echo \"Age: \$age\"" >> hello.sh
./hello.sh

# Task 11: Now set global environment variable namely experience with value 4 and echo it from the .sh file
if [ -z $experience ]
then
  echo """
export experience=\"4\"
""" >> ~/.bashrc
fi
source ~/.bashrc
echo """
echo \"Experience: \$experience\"
""" >> hello.sh
./hello.sh

# Task 12: Generate a ssh keypair with keygen
ssh-keygen -b 2048 -f new_key -y

# Task 13: See list of process currently running and write down first 3 process's id
processList=($(ps -ax -o pid=))
for index in {1..10}
do
  echo "Process ID $index: ${processList[index]}"
done

# Task 14: Now create another .sh file/shell script which can fetch some data using curl from www.google.com, if the request is successful it should echo "success" otherwise "fail"
echo """#!/bin/bash

statusCode=\$(curl -s -o /dev/null -I -w \"%{http_code}\" http://www.google.com)
if [ \$statusCode == 200 ]
then
  echo success
else
  echo fail
fi
""" > google.sh
chmod +x google.sh
./google.sh

# Task 15: Using cron set a job so that every 1 minute the .sh script is run and you can check if google.com is really working
crontab -l > oldJobs
echo "*/1 * * * * ~/google.sh" >> oldJobs
crontab oldJobs
rm oldJobs
