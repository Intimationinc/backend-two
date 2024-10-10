
Fetch data from google:

echo '#!/bin/bash' > check_google.sh
echo 'if curl -s --head http://www.google.com | grep "200 OK" > /dev/null; then' >> check_google.sh
echo '    echo "success"' >> check_google.sh
echo 'else' >> check_google.sh
echo '    echo "fail"' >> check_google.sh
echo 'fi' >> check_google.sh
chmod +x check_google.sh

crontab -e
* * * * * /Users/anik/check_google.sh


Ref:https://www.linkedin.com/pulse/learn-bash-day-11-create-script-scrape-data-from-google-hasan-mahmud/