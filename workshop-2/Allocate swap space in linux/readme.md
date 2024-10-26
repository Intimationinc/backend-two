# Swap Setup Guide

Using swap space provides a buffer against out-of-memory errors. Tuning swap settings improves performance, but for optimal results, consider upgrading your server’s RAM or optimizing applications.

This guide provides steps to configure and optimize swap space on a Linux system. Swap acts as overflow storage on the hard drive when RAM is full, allowing temporary data storage but at slower speeds than RAM.

## Steps

### 1. Check for Existing Swap Space

To see if swap is already configured:

```bash
sudo swapon --show
free -h
```

If no swap space is shown, proceed to create one.

### 2. Check Available Disk Space

Ensure there is enough space for a swap file:

```bash
df -h
```

3. Create a Swap File
   1 GB is a common size but adjust based on your system needs.

```bash
sudo fallocate -l 1G /swapfile
ls -lh /swapfile
```

### 4. Secure and Enable the Swap File

Set permissions and enable the swap:

```bash
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Verify with:

```bash
sudo swapon --show
free -h
```

### 5. Make Swap Permanent

Add the swap file to /etc/fstab:

```bash
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 6. Tune Swap Settings

Adjust system performance with swappiness and vfs_cache_pressure values.

Swappiness (default: 60): Lower values reduce swap usage.

```bash
sudo sysctl vm.swappiness=10
echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf
```

Cache Pressure (default: 100): Lower values improve filesystem cache retention.

```bash
sudo sysctl vm.vfs_cache_pressure=50
echo "vm.vfs_cache_pressure=50" | sudo tee -a /etc/sysctl.conf
```
