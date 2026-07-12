#!/bin/bash

# EcoSphere Application - Quick Start Guide

echo "================================"
echo "🚀 EcoSphere - ESG Management Platform"
echo "================================"
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    echo "   macOS: brew install mysql"
    echo "   Then: brew services start mysql"
    exit 1
fi

echo "✅ MySQL is installed"
echo ""

# Create database
echo "📦 Setting up Database..."
mysql -u root -p$DB_PASSWORD -e "CREATE DATABASE IF NOT EXISTS ecosphere_db;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database created successfully"
else
    echo "⚠️  Database might already exist or password is incorrect"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Starting Application:"
echo "================================"
echo ""
echo "Terminal 1 - Backend Server:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend Server:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "================================"
echo "🌐 Access the application:"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:5000/api/v1"
echo ""
echo "================================"
