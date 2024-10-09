#!/bin/bash

# Sample ping output (replace this with an actual ping command if needed)
ping_output=$(ping -c 10 remote.intimationinc.com)

# Extract the host
host=$(echo "$ping_output" | grep -oP "PING \K[\w.]+")
# Extract packets transmitted
packets_transmitted=$(echo "$ping_output" | grep -oP "\d+( packets transmitted)")
# Extract packets received
packets_received=$(echo "$ping_output" | grep -oP "\d+(?= received)")
# Extract packet loss
packet_loss=$(echo "$ping_output" | grep -oP "\d+(?=% packet loss)")
# Extract time
time=$(echo "$ping_output" | grep -oP "(?<=time )\d+(?=ms)")

# Output the extracted values
echo "Host: $host"
echo "Packets Transmitted: $packets_transmitted"
echo "Packets Received: $packets_received"
echo "Packet Loss: $packet_loss%"
echo "Time: $time ms"
