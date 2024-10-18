#!/bin/bash

# System Health Monitoring Script

echo "----------------------------------------"
echo "        SYSTEM HEALTH MONITORING        "
echo "----------------------------------------"

# 1. CPU Usage
echo "Checking CPU Usage..."
CPU=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1"%"}')
echo "CPU Usage: $CPU"

# 2. Memory Usage
echo "Checking Memory Usage..."
MEM=$(free -m | awk 'NR==2{printf "Memory Usage: %s/%sMB (%.2f%%)\n", $3,$2,$3*100/$2 }')
echo "$MEM"

# 3. Disk Space Usage
echo "Checking Disk Space..."
DISK=$(df -h | awk '$NF=="/"{printf "Disk Usage: %d/%dGB (%s)\n", $3,$2,$5}')
echo "$DISK"

# 4. Network Statistics
echo "Checking Network Traffic (eth0)..."
RX=$(cat /sys/class/net/eth0/statistics/rx_bytes)
TX=$(cat /sys/class/net/eth0/statistics/tx_bytes)
echo "Received: $((RX / 1024 / 1024)) MB"
echo "Transmitted: $((TX / 1024 / 1024)) MB"

echo "----------------------------------------"
echo "        MONITORING COMPLETED            "
echo "----------------------------------------"

