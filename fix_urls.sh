#!/bin/bash

# Find and replace incorrect URLs
find /Users/sasankaduri/WebGauntlet -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" \) -print0 | xargs -0 sed -i '' 's|http://localhost:3005|http://localhost:3005|g'
