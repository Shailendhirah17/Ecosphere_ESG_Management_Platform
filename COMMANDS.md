# 🎯 EcoSphere - Copy-Paste Setup Commands

## ⚡ Quick Setup (macOS)

### Step 1: Install Prerequisites
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and npm
brew install node

# Install MySQL
brew install mysql

# Start MySQL
brew services start mysql
```

### Step 2: Navigate to Project
```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform"
```

### Step 3: Create Database
```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS ecosphere_db;"
# (Press Enter if prompted for password, or enter: password123)
```

### Step 4: Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (from project root)
cd ../frontend
npm install
```

---

## 🚀 Run the Application

### Option A: Two Terminal Tabs (Recommended)

**Terminal Tab 1 - Backend:**
```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform/backend"
npm run dev
```

**Terminal Tab 2 - Frontend:**
```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform/frontend"
npm run dev
```

### Option B: Single Terminal (Sequential)

**First, start backend:**
```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform/backend"
npm run dev
```

**Then in another terminal, start frontend:**
```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform/frontend"
npm run dev
```

---

## ✅ Verify It's Working

### Check Backend:
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

### Check Frontend:
Open in browser: http://localhost:5173

---

## 📊 Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| API | http://localhost:5000/api/v1 |

---

## 🧪 Test API (Copy These Commands)

### Create Test Department:
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "department_id": 1,
    "role": "Employee"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get All Departments:
```bash
# Replace YOUR_TOKEN with actual token from login
curl -X GET http://localhost:5000/api/v1/departments \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🐛 Troubleshooting Commands

### Check if MySQL is running:
```bash
brew services list
```

### Start MySQL if not running:
```bash
brew services start mysql
```

### Check if port 5000 is in use:
```bash
lsof -i :5000
```

### Kill process on port 5000:
```bash
# Get the PID from lsof command above, then:
kill -9 <PID>

# Or use this to find and kill automatically:
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Check if port 5173 is in use:
```bash
lsof -i :5173
```

### Verify Node and npm versions:
```bash
node --version
npm --version
```

### Clear npm cache:
```bash
npm cache clean --force
```

### Reinstall dependencies (if having issues):
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Using Postman to Test API

1. Download Postman: https://www.postman.com/downloads/
2. Create new Request
3. Set to POST
4. Enter URL: http://localhost:5000/api/v1/auth/login
5. Go to Body tab → Select "raw" → Select "JSON"
6. Paste:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
7. Click Send
8. Copy the token from response
9. For authenticated requests, go to Headers tab
10. Add: `Authorization: Bearer YOUR_TOKEN`

---

## 🔐 Environment Setup (if needed)

### Create backend .env file:
```bash
cat > /Users/shailendhirah/Downloads/EcoSphere\ -\ ESG\ Management\ Platform/backend/.env << EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password123
DB_NAME=ecosphere_db
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=ecosphere_jwt_secret_key_development
JWT_EXPIRY=7d
EMAIL_USER=test@gmail.com
EMAIL_PASSWORD=testpassword
EMAIL_FROM=noreply@ecosphere.com
EOF
```

---

## 📋 Complete Checklist

- [ ] Install Node.js: `node --version`
- [ ] Install MySQL: `mysql --version`
- [ ] MySQL running: `brew services list`
- [ ] Create database: `mysql -u root -p` then `CREATE DATABASE ecosphere_db;`
- [ ] Backend npm install: `cd backend && npm install`
- [ ] Frontend npm install: `cd frontend && npm install`
- [ ] Start Backend: `npm run dev` (from backend folder)
- [ ] Start Frontend: `npm run dev` (from frontend folder)
- [ ] Access Frontend: http://localhost:5173
- [ ] Check Backend: http://localhost:5000/health
- [ ] Create test account: Register page
- [ ] Login and explore dashboard

---

## 🎯 Quick Reference

**Project Root:**
```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform"
```

**Backend Dir:**
```bash
cd backend
```

**Frontend Dir:**
```bash
cd frontend
```

**Start Backend:**
```bash
npm run dev
```

**Start Frontend:**
```bash
npm run dev
```

**Frontend URL:**
```
http://localhost:5173
```

**Backend URL:**
```
http://localhost:5000
```

---

## 💡 Pro Tips

1. **Use VS Code** for editing code
2. **Open 2 Terminal Tabs** (one for each server)
3. **Use Postman** for API testing
4. **Check DevTools** (F12) for frontend errors
5. **Check Terminal** for backend errors
6. **Keep .env file** safe and secret

---

## 🎉 You're Ready!

All setup is complete. Now you can:
- ✅ Access frontend at http://localhost:5173
- ✅ Call APIs at http://localhost:5000/api/v1
- ✅ Test the application locally
- ✅ Develop new features

**Happy coding!** 🚀

---

*EcoSphere - ESG Management Platform | Complete Setup Guide*
