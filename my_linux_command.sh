#!/bin/bash
## Go to users home directory
# cd ~

## Go to users home directory
# cd ~

## In users home directory create a new folder and move inside the folder
# mkdir my_folder
# cd my_folder

## Create a new text file inside new directory
# touch my_file.txt

## Go to previous directory
# cd ..

## Remove the directory
# rm -rf my_folder

## Create the shell script file named my_linux_command.sh
# nano my_linux_command.sh

# Inside my_linux_command.sh, write: hello world
#!/bin/bash
echo "hello world"

## Save and exit the editor
## Make the script executable
## chmod +x my_linux_command.sh

## Run the script
# ./my_linux_command.sh

# Set an environment variable namely age with value 30 and in the .sh file access the variable and echo it
#!/bin/bash
export age=30
echo "Age is: $age"
