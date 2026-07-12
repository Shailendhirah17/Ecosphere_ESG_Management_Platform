#!/bin/bash

echo "🚀 Installing EcoSphere Application"
echo "===================================="

# Install Backend Dependencies
echo -e "\n📦 Installing Backend Dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Install Frontend Dependencies
echo -e "\n📦 Installing Frontend Dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

echo -e "\n✅ All dependencies installed successfully!"
echo -e "\n📝 To start the application:"
echo "   1. Backend:  cd backend && npm run dev"
echo "   2. Frontend: cd frontend && npm run dev"
