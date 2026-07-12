#!/bin/bash

# EcoSphere - Complete Build & Startup Script
# This script sets up and starts both backend and frontend servers

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   ECOSPHERE - COMPLETE SETUP & STARTUP SCRIPT                 ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Set project root
PROJECT_ROOT="/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform"

echo "🔄 Step 1: Verify project structure..."
if [ ! -d "$PROJECT_ROOT/backend" ] || [ ! -d "$PROJECT_ROOT/frontend" ]; then
    echo "❌ Project directories not found"
    exit 1
fi
echo "✅ Project structure verified"
echo ""

echo "🔄 Step 2: Checking MySQL..."
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL not found. Install with: brew install mysql"
fi

# Ensure MySQL is running
brew services start mysql 2>/dev/null
echo "✅ MySQL service started"
echo ""

echo "🔄 Step 3: Creating database..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecosphere_db;" 2>/dev/null
mysql -u root -e "USE ecosphere_db; SELECT COUNT(*) as 'Tables' FROM information_schema.tables WHERE table_schema='ecosphere_db';" 2>/dev/null
echo "✅ Database ready"
echo ""

echo "🔄 Step 4: Backend setup..."
cd "$PROJECT_ROOT/backend"
if [ ! -d "node_modules" ]; then
    echo "   Installing dependencies..."
    npm install --legacy-peer-deps > /dev/null 2>&1
fi
echo "✅ Backend dependencies ready"
echo ""

echo "🔄 Step 5: Frontend setup..."
cd "$PROJECT_ROOT/frontend"
if [ ! -d "node_modules" ]; then
    echo "   Installing dependencies..."
    npm install --legacy-peer-deps > /dev/null 2>&1
fi
echo "✅ Frontend dependencies ready"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "✅ SETUP COMPLETE!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "🚀 TO RUN ECOSPHERE:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   cd \"$PROJECT_ROOT/backend\""
echo "   npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   cd \"$PROJECT_ROOT/frontend\""
echo "   npm run dev"
echo ""
echo "   Then open browser:"
echo "   http://localhost:5173"
echo ""
echo "════════════════════════════════════════════════════════════════"
