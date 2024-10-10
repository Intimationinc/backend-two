#!/bin/bash 


# 1. home dir: cd ~ or just cd 
cd ~

cd 


# 2. root dir
cd /

# 3. New dir in users home dir and cd to it 
cd 

mkdir brand_new_dir 

cd brand_new_dir 

# 4. create new txt file in the nrw dir 

touch new_empty_file.txt

# 5. go to prev dir 

cd .. 

# 6. remove the dir 

rm -r branch_new_dir

# 7. .sh file with hello world 

echo '#!/bin/bash 
    echo "hello world"' > hello_wordl.sh 

#8. set exc permission 

chmod +x hello_world.sh


# 9. run the file 

./hello_world.sh


# 10. local var with access by script 

export age=30

echo '#!/bin/bash
echo "hello world"
echo "Age is $age"' > hello.sh

# 11. add golbal var 

echo 'export experience=4' >> ~/.bashrc
source ~/.bashrc

# 12. curl command to see the page load time 

curl -w "%{time_total}\n" -o /dev/null -s www.algocode.site




