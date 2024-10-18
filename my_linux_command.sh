cd ~
mkdir fld
mkdir my_new_folder
cd fld
ls -la
echo -e '#!/bin/bash\necho "hello world"' > hello.sh
chmod +x hello.sh
./hello.sh
echo -e '#!/bin/bash\necho "Hello, world!"\necho "Age: $age"\necho "Experience: $experience"' > hello.sh
export experience=4
./hello.sh
ssh-keygen -t rsa -b 2048
echo -e '#!/bin/bash\nif curl -s --head http://www.google.com | grep "200 OK"; then\n echo "success"\nelse\n echo "fail"\nfi' > check_google.sh
chmod +x check_google.sh
crontab -e
