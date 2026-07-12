# 🚀 ECOSPHERE - FIXED CONNECTION SETUP

## ✅ Issues Fixed

- ✅ Frontend API URL mismatch (was pointing to wrong port)
- ✅ Database host changed to 127.0.0.1 (more reliable)
- ✅ Database configuration with fallback defaults
- ✅ Better error messages and troubleshooting
- ✅ Improved server startup logging

## 🌐 NEW LOCALHOST URLS

```
Frontend:  http://localhost:3000
Backend:   http://localhost:8000/api/v1
Health:    http://localhost:8000/health
```

## 📋 STEP-BY-STEP SETUP

### Step 1: Start MySQL (IMPORTANT!)

```bash
# Check if MySQL is running
mysql --version

# Start MySQL on macOS
brew services start mysql

# Verify MySQL is running
mysql -u root -p
# (Enter: password123)
# Type: exit
```

### Step 2: Create Database

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS ecosphere_db;"
# Enter password: password123
```

### Step 3: Start Backend (Terminal 1)

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

### Step 4: Start Frontend (Terminal 2)

```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform/frontend"
npm run dev
```

**Expected Output:**
```
➜  Local:   http://localhost:3000
```

### Step 5: Open Application

```
http://localhost:3000
```

## 🔧 TROUBLESHOOTING

### ❌ Error: "Access denied for user 'root'@'localhost'"

**Solutions:**
1. MySQL is not running - Start it:
   ```bash
   brew services start mysql
   ```

2. Wrong password - Update in `.env`:
   ```
   DB_PASSWORD=your_actual_password
   ```

3. Database doesn't exist - Create it:
   ```bash
   mysql -u root -p -e "CREATE DATABASE ecosphere_db;"
   ```

### ❌ Error: "connect ECONNREFUSED"

MySQL is not running. Fix:
```bash
brew services start mysql
mysql.server start  # Alternative
```

### ❌ Error: "Port 3000 already in use"

Change frontend port in `frontend/vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to 3001
  strictPort: true,
}
```

### ❌ Error: "Port 8000 already in use"

Change backend port in `backend/.env`:
```
PORT=8001
```

Also update `frontend/.env.local`:
```
VITE_API_URL=http://localhost:8001/api/v1
```

### ❌ Frontend shows "Cannot reach backend"

1. Verify backend is running on port 8000
2. Check `frontend/.env.local` has correct URL
3. Clear browser cache: Ctrl+Shift+Delete

## 🧪 TEST API CONNECTION

Once servers are running, test the connection:

```bash
# Test backend health
curl http://localhost:8000/health

# Expected response:
# {"status":"Server is running","timestamp":"2024-01-15T10:30:00.000Z","environment":"development"}
```

## 📁 FILES MODIFIED

- `backend/.env` - Updated port to 8000, database host to 127.0.0.1
- `backend/config/database.js` - Added fallback defaults
- `backend/server.js` - Improved error handling and logging
- `frontend/vite.config.js` - Port set to 3000
- `frontend/src/api/axiosInstance.js` - Dynamic API URL from env
- `frontend/.env.local` - Created with correct backend URL

## ✨ FEATURES READY

✅ User Authentication (Login/Register)
✅ Dashboard with Real-time Metrics
✅ Environmental Tracking
✅ Gamification & Challenges
✅ Leaderboard Rankings
✅ Role-Based Access Control
✅ Data Visualization Charts

---

**Now your application is properly connected and ready to use!** 🚀
