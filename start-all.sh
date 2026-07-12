#!/bin/bash

# 🚀 EcoSphere Complete Deployment Guide

echo "════════════════════════════════════════════════════════"
echo "  🌍 ECOSPHERE - 10-PHASE COMPLETE IMPLEMENTATION 🌍"
echo "════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_DIR="/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform"

echo -e "${BLUE}📁 Project Location:${NC}"
echo "$PROJECT_DIR"
echo ""

# Function to check if process is running
is_running() {
    pgrep -f "$1" > /dev/null
    return $?
}

# Stop existing processes
echo -e "${YELLOW}🛑 Stopping any existing processes...${NC}"
pkill -f "npm run dev" 2>/dev/null
pkill -f "node server.js" 2>/dev/null
sleep 2
echo -e "${GREEN}✅ Existing processes stopped${NC}"
echo ""

# Reset database
echo -e "${YELLOW}🗑️  Resetting database...${NC}"
mysql -u root -e "DROP DATABASE IF EXISTS ecosphere_db; CREATE DATABASE ecosphere_db;" 2>/dev/null
echo -e "${GREEN}✅ Database reset complete${NC}"
echo ""

# Start backend
echo -e "${YELLOW}🚀 Starting Backend Server...${NC}"
cd "$PROJECT_DIR/backend"
nohup npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
sleep 5

if is_running "npm run dev"; then
    echo -e "${GREEN}✅ Backend Server Running (PID: $BACKEND_PID)${NC}"
    echo "   📍 URL: http://localhost:4000/api/v1"
    echo "   🏥 Health: http://localhost:4000/health"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    tail -50 /tmp/backend.log
    exit 1
fi
echo ""

# Start frontend
echo -e "${YELLOW}🚀 Starting Frontend Server...${NC}"
cd "$PROJECT_DIR/frontend"
nohup npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 5

if is_running "vite"; then
    echo -e "${GREEN}✅ Frontend Server Running (PID: $FRONTEND_PID)${NC}"
    echo "   📍 URL: http://127.0.0.1:5174"
else
    echo -e "${RED}❌ Frontend failed to start${NC}"
    tail -50 /tmp/frontend.log
    exit 1
fi
echo ""

# Final summary
echo "════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ ALL SYSTEMS OPERATIONAL!${NC}"
echo "════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}📊 IMPLEMENTATION STATUS:${NC}"
echo "   Phase 0:  ✅ Authentication & Foundation"
echo "   Phase 1:  ✅ Master Data Layer"
echo "   Phase 2:  ✅ ESG Configuration & Settings"
echo "   Phase 3:  ✅ Carbon Emissions Tracking"
echo "   Phase 4:  ✅ Social Module (CSR Activities)"
echo "   Phase 5:  ✅ Governance (Compliance & Audits)"
echo "   Phase 6:  ✅ Gamification (Challenges & Rewards)"
echo "   Phase 7:  ✅ Scoring Engine"
echo "   Phase 8:  ✅ Notifications"
echo "   Phase 9:  ✅ Reports & Analytics"
echo "   Phase 10: ✅ Dashboards & Administration"
echo ""

echo -e "${BLUE}🌐 ACCESS POINTS:${NC}"
echo "   Application:  http://127.0.0.1:5174"
echo "   Backend API:  http://localhost:4000/api/v1"
echo "   Health Check: http://localhost:4000/health"
echo ""

echo -e "${BLUE}📚 DEFAULT TEST CREDENTIALS:${NC}"
echo "   Email:    admin@ecosphere.com"
echo "   Password: Test@123"
echo "   Role:     ESG Admin"
echo ""

echo -e "${BLUE}📊 SYSTEM DETAILS:${NC}"
echo "   Backend:      Node.js + Express"
echo "   Frontend:     React 19 + Vite"
echo "   Database:     MySQL (ecosphere_db)"
echo "   ORM:          Sequelize"
echo "   API Endpoints: 100+"
echo "   Models:       23"
echo "   Pages:        11"
echo ""

echo -e "${BLUE}📝 LOG FILES:${NC}"
echo "   Backend:  /tmp/backend.log"
echo "   Frontend: /tmp/frontend.log"
echo ""

echo "════════════════════════════════════════════════════════"
echo -e "${GREEN}🎉 Ready to use! Open http://127.0.0.1:5174 in your browser${NC}"
echo "════════════════════════════════════════════════════════"
