# !/bin/bash

# Script: my_linux_command.sh
# Description: Custom Linux executable for system monitoring and file backup

# Display Current Date and Time
echo "Current Date and Time"
date
echo "----------------------"

# Display System Uptime
echo "System Uptime"
uptime
echo "----------------------"

# List All Running Process
echo "Running Process"
ps aux --sort=-%mem | head -5 # Top 5 Process by memory usage
echo "-----------------------"

# Show Disk Usage
echo "Disk Usage:"
df -h
echo "-----------------------"

# Network Information
echo "Network Configuration:"
ifconfig
echo "-----------------------------"

# End of Script
echo "Script executed successfully."