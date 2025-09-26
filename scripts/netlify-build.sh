#!/bin/bash

# Netlify build script with dependency fixes
echo "Starting Netlify build script..."

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Install dependencies with clean slate
echo "Installing dependencies..."
rm -rf node_modules package-lock.json
npm install

# Verify React installation
echo "Verifying React installation..."
if [ ! -d "node_modules/react" ]; then
    echo "React not found, installing explicitly..."
    npm install react react-dom
fi

# Run the build
echo "Running Next.js build..."
npm run build

echo "Build script completed."