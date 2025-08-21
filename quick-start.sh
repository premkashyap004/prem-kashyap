#!/bin/bash

# Prem Kashyap Portfolio - Quick Start Script
echo "🚀 Setting up Prem Kashyap Portfolio..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Copy environment variables
if [ ! -f .env.local ]; then
    echo "📝 Creating environment variables file..."
    cp .env.example .env.local
    echo "✅ Created .env.local - please update with your values"
else
    echo "✅ Environment variables file already exists"
fi

# Start development server
echo "🔥 Starting development server..."
echo "📍 Open http://localhost:3000 in your browser"
echo "🛑 Press Ctrl+C to stop the server"
npm run dev
