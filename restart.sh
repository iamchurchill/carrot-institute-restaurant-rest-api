#!/bin/bash

# Set default values for app name and branch
DEFAULT_APP_NAME="index.js"

# Use default values if no arguments are provided
APP_NAME="${1:-$DEFAULT_APP_NAME}"

# Stop the app using PM2
pm2 stop "$APP_NAME"
if [ $? -ne 0 ]; then
    echo "Error: failed to stop app '$APP_NAME' using PM2."
    exit 1
fi

# Start the app using PM2
PORT_A=8888 PORT_B=8889 PORT_C=8890 pm2 start "$APP_NAME" -i 3

echo "App successfully restarted"
