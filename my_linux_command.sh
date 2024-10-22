#!/bin/bash

echo "Hello World!"
echo "Hello World!" >> hello.txt
echo $(whoami)
echo $HOME
echo $(pwd)

curl ifconfig.me
ifconfig wlp2s0 | grep "inet " | awk {'print $2'}

[ $HOSTNAME=='fedora' ] && echo "Hello from Fedora" || echo "Hello from $HOSTNAME"

echo '#!/bin/bash\n\necho "Hello World!"' >> hello.sh
chmod u+x hello.sh

ps | awk {'print $1}' | head -n 4

