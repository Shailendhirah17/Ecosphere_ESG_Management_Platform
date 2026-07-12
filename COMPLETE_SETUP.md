# ✅ ECOSPHERE - COMPLETE SETUP GUIDE (FIXED & WORKING)

## 🎉 STATUS: ALL SYSTEMS GO!

✅ **Backend Server**: Running on Port 8000
✅ **Frontend Server**: Running on Port 3000  
✅ **Database**: Connected and Ready
✅ **API**: http://localhost:8000/api/v1

---

## 🌐 LOCALHOST ACCESS URLS

```
┌─────────────────────────────────────────────────────┐
│                YOUR APPLICATION URLs               │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 🎨 FRONTEND (React App):                           │
│    http://localhost:3000                           │
│                                                     │
│ 🔌 BACKEND API:                                    │
│    http://localhost:8000/api/v1                    │
│                                                     │
│ ✅ HEALTH CHECK:                                   │
│    http://localhost:8000/health                    │
│                                                     │
│ 📊 DATABASE:                                       │
│    localhost:3306                                  │
│    Database: ecosphere_db                          │
│    User: root (no password)                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## ⚡ QUICK START (3 Simple Steps)

### Step 1: Make sure MySQL is running
```bash
brew services start mysql
```

### Step 2: Start Backend (Terminal 1)
```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform/backend"
npm run dev
```

**Expected Output:**
```
═══════════════════════════════════════════════════
       🌍 ECOSPHERE SERVER IS RUNNING 🌍
═══════════════════════════════════════════════════
✅ Server listening on PORT: 8000
✅ API Base URL: http://localhost:8000/api/v1
✅ Health Check: http://localhost:8000/health
═══════════════════════════════════════════════════
```

### Step 3: Start Frontend (Terminal 2)
```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform/frontend"
npm run dev
```

**Expected Output:**
```
VITE v8.1.4  ready in 527 ms

  ➜  Local:   http://localhost:3000/
```

### Step 4: Open in Browser
```
http://localhost:3000
```

---

## 🔑 DEFAULT CREDENTIALS

You can create a new account or test login:

| Field | Value |
|-------|-------|
| Email | test@ecosphere.com |
| Password | Any password |

(First user will be created as admin)

---

## ✨ FEATURES AVAILABLE

✅ User Authentication & Authorization
✅ Real-time Dashboard with Charts
✅ Environmental Impact Tracking
✅ Carbon Footprint Management
✅ Gamification & Challenges
✅ Employee Leaderboard
✅ Department Management
✅ ESG Compliance
✅ Badge & Reward System
✅ Social Activities Tracking

---

## 🔧 WHAT WAS FIXED

### 1. **Database Connection**
   - ✅ Changed password from `password123` to empty (no password)
   - ✅ Updated database config to handle empty passwords
   - ✅ Created `ecosphere_db` database automatically
   - ✅ Database connection now working

### 2. **Backend Configuration**
   - ✅ Port changed from 5000 to 8000
   - ✅ Database host set to 127.0.0.1
   - ✅ Improved error messages with troubleshooting
   - ✅ Better startup logging

### 3. **Frontend Configuration**
   - ✅ Port set to 3000
   - ✅ API URL updated to http://localhost:8000/api/v1
   - ✅ Environment variable configuration
   - ✅ Axios interceptors properly configured

### 4. **Environment Files**
   - ✅ `.env` (Backend) - Updated with correct credentials
   - ✅ `.env.local` (Frontend) - Created with correct API URL

---

## 🚨 TROUBLESHOOTING

### ❌ "Port 3000 already in use"

**Solution:** Change frontend port:
```bash
# Edit: frontend/vite.config.js
server: {
  port: 3001,  # Change to 3001
  strictPort: true,
}
```

### ❌ "Port 8000 already in use"

**Solution:** Change backend port:
```bash
# Edit: backend/.env
PORT=8001
```

Also update `frontend/.env.local`:
```
VITE_API_URL=http://localhost:8001/api/v1
```

### ❌ "Cannot reach backend"

**Solution:**
1. Make sure backend is running on port 8000
2. Check the API URL in `frontend/.env.local`
3. Clear browser cache: `Cmd + Shift + Delete`
4. Restart frontend: `npm run dev`

### ❌ "Database connection refused"

**Solution:**
```bash
# Start MySQL
brew services start mysql

# Create database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecosphere_db;"

# Verify
mysql -u root -e "SHOW DATABASES LIKE 'ecosphere_db';"
```

### ❌ "Cannot login"

**Solution:**
1. Create a new account (click Register)
2. First user becomes admin
3. Use that account to login

---

## 🧪 TEST API CONNECTION

Once both servers are running:

```bash
# Test backend health
curl http://localhost:8000/health

# Expected response:
# {"status":"Server is running","timestamp":"2024-01-15T10:30:00.000Z","environment":"development"}
```

---

## 📁 KEY FILES MODIFIED

- `backend/.env` - Database credentials
- `backend/config/database.js` - Database configuration
- `backend/server.js` - Server startup logic
- `frontend/vite.config.js` - Frontend port (3000)
- `frontend/src/api/axiosInstance.js` - API URL
- `frontend/.env.local` - Frontend environment variables

---

## 🎯 NEXT STEPS

1. ✅ Both servers are running
2. ✅ Database is connected
3. Go to `http://localhost:3000`
4. Create an account or login
5. Start exploring the platform!

---

## 📞 SUPPORT

If you encounter any issues:

1. Check that MySQL is running: `brew services list | grep mysql`
2. Verify database exists: `mysql -u root -e "SHOW DATABASES;"`
3. Check backend logs for errors
4. Clear browser cache and refresh
5. Restart both servers

---

**🚀 Your EcoSphere application is ready to use!**

