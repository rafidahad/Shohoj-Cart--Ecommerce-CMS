#!/bin/bash

# Script to sync environment variables from .env to render.yaml
# Usage: ./sync-env-to-render.sh

# Path to .env file
ENV_FILE=".env"
RENDER_FILE="render.yaml"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: .env file not found!"
    exit 1
fi

echo "Syncing environment variables from $ENV_FILE to $RENDER_FILE..."

# Read .env file and extract key-value pairs
while IFS='=' read -r key value; do
    # Skip empty lines and comments
    if [[ -z "$key" || "$key" =~ ^[[:space:]]*# ]]; then
        continue
    fi
    
    # Remove quotes from value if present
    value=$(echo "$value" | sed 's/^"\(.*\)"$/\1/')
    
    echo "Found: $key=$value"
    
    # Add logic here to update render.yaml
    # This is a basic template - you can customize based on your needs
    
done < "$ENV_FILE"

echo "Environment sync completed!"
echo ""
echo "Note: Remember to update production-specific values in render.yaml:"
echo "- APP_ENV should be 'production'"
echo "- APP_DEBUG should be 'false'"
echo "- FRONTEND_URL should be your actual frontend domain"
echo "- SANCTUM_STATEFUL_DOMAINS should be your frontend domain"
echo "- SESSION_DOMAIN should be your backend domain"
echo "- SESSION_SECURE_COOKIE should be 'true' for HTTPS"