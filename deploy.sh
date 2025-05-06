#!/bin/bash

# Build the project
bun run build

# Navigate into the build output directory
cd dist

# Initialize git if not already initialized
git init

# Add all files
git add -A

# Commit the changes
git commit -m 'deploy'

# Force push to GitHub Pages
git push -f https://github.com/danexcode/javascript-quiz.git main:gh-pages

cd -
