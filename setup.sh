#!/bin/bash

echo "🚀 Setting up Prem Kashyap Portfolio..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Copy environment variables if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating environment variables file..."
    cp .env.example .env.local
    echo "✅ Created .env.local - please update with your values"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo "1. Update your data in src/data/ files"
echo "2. Add your assets to public/assets/"
echo "3. Run: npm run dev"
echo "4. Deploy: npm run deploy"
