echo "Hello World"

# go to home directory
cd ~

# go to root directory
cd /

# In users home directory create a new folder and move inside the folder
cd ~
mkdir newFolder
cd newFolder

# Create a new text file inside new directory
touch test.txt

# Go to previous directory
cd ..

# Remove the directory
rm -r newFolder

# Create a .sh file and write echo “hello world” inside it with shebang syntax
touch test.sh

echo "#!/bin/bash" >>test.sh
echo "echo 'Hello World'" >>test.sh

# Set permission to executable to the file
chmod +x test.sh
# Run the .sh file
./tesh.sh

# Set an environment variable namely age with value 30 and in the .sh file access the variable and echo it
age=30
echo "echo \"$age\" " >>test.sh
./tesh.sh

# Now set global environment variable namely experience with value 4 and echo it from the .sh file
echo "echo experience=4" >>~.zshrc
echo "echo \"$experience\" " >>test.sh
./tesh.sh

# Generate a ssh keypair with keygen
ssh-keygen -t rsa -b 1024 -C "niloy"
