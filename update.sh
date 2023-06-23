#!/bin/bash

# Set default values for app name and branch
DEFAULT_APP_NAME="index.js"
DEFAULT_BRANCH="master"

# Use default values if no arguments are provided
APP_NAME="${1:-$DEFAULT_APP_NAME}"
BRANCH="${2:-$DEFAULT_BRANCH}"

# Pull the latest changes from the specified Git branch
GIT_PULL_OUTPUT=$(git pull origin "$BRANCH")

# Check if there were any errors during git pull
if [[ "$GIT_PULL_OUTPUT" == *"error:"* ]]; then
    echo "Error: Unable to pull updates"
    exit 1
fi

# Check if the repo was already up-to-date or updated
if [[ "$GIT_PULL_OUTPUT" == *"Already up-to-date."* ]]; then
    echo "No changes found in Git branch '$BRANCH', skipping..."
    exit 0
elif [[ "$GIT_PULL_OUTPUT" == Updating* ]]; then
    echo "Successfully updated"
else
    echo "Error: Unable to pull updates"
    exit 1
fi

# Check if there were any changes after the git pull
if [[ ! -n $(git diff --name-only HEAD@{1} HEAD) ]]; then
    echo "No changes found in Git branch '$BRANCH', skipping..."
    exit 0
fi

# Stop the app using PM2
pm2 stop "$APP_NAME"
if [ $? -ne 0 ]; then
    echo "Error: failed to stop app '$APP_NAME' using PM2."
    exit 1
fi

# Install node modules
npm install

# Start the app using PM2
pm2 start "$APP_NAME" -i 3

echo "App successfully updated and restarted"
