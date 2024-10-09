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

echo "Hello, World!"