cd ~
mkdir new_folder
cd new_folder
touch new_file.txt
cd ..
rm -r new_folder
echo -e '#!/bin/bash\necho "hello world"' > hello.sh
chmod +x hello.sh
./hello.sh
echo -e '#!/bin/bash\nage=30\necho "Age is $age"' > hello.sh
./hello.sh
echo -e '#!/bin/bash\nexport experience=4\necho "Experience is $experience"' > hello.sh
./hello.sh
echo -e '#!/bin/bash\nif curl -s --head --request GET http://www.google.com | grep "200 OK" > /dev/null; then\n   echo "Success"\nelse\n   echo "Fail"\nfi' > check_google.sh
chmod +x check_google.sh
(crontab -l ; echo "* * * * * $(pwd)/check_google.sh") | crontab -

