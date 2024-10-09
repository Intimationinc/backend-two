#!/bin/bash

# input & output
echo "What is you name?"

read entered_name

echo -e "\nWelcome to learning bash" $entered_name

# reading from a file
while read line
do
    echo $line
done < fruits.txt

# command line arguments
echo "Hi, $1!"

# writing to a file
echo $(date) >> date.txt
echo $(date)

# conditional statement
echo "Please enter a number: "
read num

if [ $num -gt 0 ]; then
  echo "$num is positive"
elif [ $num -lt 0 ]; then
  echo "$num is negative"
else
  echo "$num is zero"
fi

# loop => while
i=1
while [[ $i -le 10 ]]; do
    echo "$i"
    (( i+= 1 ))
done

# for loop
for i in {1..5}
do
    echo $i
done

# case statement
fruit="apple"

case $fruit in
    "apple")
        echo "This is a red fruit."
        ;;
    "banana")
        echo "This is a yellow fruit."
        ;;
    "orange")
        echo "This is an orange fruit."
        ;;
    *)
        echo "Unknown fruit."
        ;;
esac