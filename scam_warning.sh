#!/bin/bash

# Function to start Scam Warning Site
start_scam_warning() {
    echo "Starting Scam Warning Site..."
    cd /Users/sasankaduri/WebGauntlet/scam-warning
    
    # Ensure dependencies are installed
    npm install
    
    # Start the development server
    npm run dev
}

# Start the scam warning site
start_scam_warning
