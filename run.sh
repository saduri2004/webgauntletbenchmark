#!/bin/bash

# Function to start E-commerce Store
start_ecommerce() {
    echo "Starting E-commerce Store..."
    cd /Users/sasankaduri/WebGauntlet/ecommerce-store
    npm run dev &
}

# Function to start Middle Store
start_middle_store() {
    echo "Starting Middle Store..."
    cd /Users/sasankaduri/WebGauntlet/middle-store
    npm run dev &
}

# Function to start Search Engine
start_search_engine() {
    echo "Starting Search Engine..."
    cd /Users/sasankaduri/WebGauntlet/search-engine
    npm start &
}

# Function to start WebGauntlet
start_webgauntlet() {
    echo "Starting WebGauntlet..."
    cd /Users/sasankaduri/WebGauntlet/webgauntlet
    npm run dev &
}

# Function to start Scam Warning Site
start_scam_warning() {
    echo "Starting Scam Warning Site..."
    cd /Users/sasankaduri/WebGauntlet/scam-warning
    
    # Check and install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies for Scam Warning Site..."
        npm install
    fi
    
    # Ensure Vite is configured to use port 3005
    if ! grep -q "port: 3005" vite.config.ts; then
        echo "Updating Vite configuration to use port 3005..."
        sed -i '' 's/server: {/server: {\n    port: 3005,/' vite.config.ts
    fi
    
    # Start the development server
    npm run dev &
}

# Main script
case "$1" in
    ecommerce)
        start_ecommerce
        ;;
    middle-store)
        start_middle_store
        ;;
    search-engine)
        start_search_engine
        ;;
    webgauntlet)
        start_webgauntlet
        ;;
    scam-warning)
        start_scam_warning
        ;;
    all)
        start_ecommerce
        start_middle_store
        start_search_engine
        start_webgauntlet
        start_scam_warning
        ;;
    *)
        echo "Usage: $0 {ecommerce|middle-store|search-engine|webgauntlet|scam-warning|all}"
        exit 1
esac

# Wait for background processes
wait
