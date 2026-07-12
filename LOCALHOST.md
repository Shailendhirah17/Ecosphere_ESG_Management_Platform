# 🌐 EcoSphere - Local Development Access Guide

## ⚡ Quick Access URLs

Copy and paste these URLs into your browser:

### **Frontend (React Application)**
```
http://localhost:5173
```

### **Backend API**
```
http://localhost:8000/api/v1
```

### **Health Check Endpoint**
```
http://localhost:8000/health
```

---

## 📋 Port Configuration

| Service | Port | URL | Status |
|---------|------|-----|--------|
| Frontend (React - Vite) | 5173 | http://localhost:5173 | Running |
| Backend (Express API) | 8000 | http://localhost:8000 | Running |
| MySQL Database | 3306 | localhost:3306 | Connected |

---

## 🚀 Start Both Servers

### **Option 1: Manual Start (Recommended for Development)**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### **Option 2: Using NPM Scripts**

Run from project root:
```bash
# Install globally (one time)
npm install -g npm-run-all

# Run both servers
npm-run-all --parallel backend:dev frontend:dev
```

---

## ✅ Verification Checklist

After starting both servers, verify everything is working:

- [ ] **Backend Running**: Visit http://localhost:5000/health
  - Should show: `{"status": "Server is running", ...}`

- [ ] **Frontend Running**: Visit http://localhost:5173
  - Should show: EcoSphere login page

- [ ] **API Accessible**: Visit http://localhost:5000/api/v1/departments
  - Might show 401 (unauthorized) - this is normal without token
  - Shows API is responding

- [ ] **Browser Console**: No CORS errors
  - Open DevTools (F12) → Console tab
  - Should be clean or show only expected warnings

---

## 🔑 First Time Login

1. Go to http://localhost:5173
2. Create a new account via "Register" link
3. Fill in the form with:
   - Name: Your name
   - Email: Any email
   - Password: Any password
   - Department: Select from dropdown
4. Click Register
5. You'll be redirected to Dashboard

---

## 📡 API Testing in Browser

### **Check Backend Health:**
```
GET http://localhost:5000/health
```

### **Get All Departments (Requires Auth):**
```
GET http://localhost:5000/api/v1/departments
```
*Requires Bearer token in Authorization header*

---

## 🗂️ File Organization

```
Your local machine:
/Users/shailendhirah/Downloads/
└── EcoSphere – ESG Management Platform/
    ├── backend/           ← npm run dev (Port 5000)
    ├── frontend/          ← npm run dev (Port 5173)
    ├── README.md
    ├── SETUP.md
    └── QUICKSTART.sh
```

---

## 🔴 Common Issues & Fixes

### **Frontend shows "Cannot reach API"**
```
1. Check if backend is running on port 5000
2. Open: http://localhost:5000/health
3. If it fails, start backend: cd backend && npm run dev
```

### **Frontend won't load on http://localhost:5173**
```
1. Check terminal for Vite errors
2. Try: cd frontend && npm run dev
3. If port 5173 is busy: PORT=5174 npm run dev
```

### **"Cannot connect to database" error**
```
1. Verify MySQL is running: brew services list
2. Start MySQL: brew services start mysql
3. Create database: mysql -u root -p
   CREATE DATABASE ecosphere_db;
```

### **Port 5000 already in use**
```
# Find what's using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

---

## 📊 Complete Server URLs

### **Development URLs:**
- **Frontend App**: http://localhost:5173
- **API Base URL**: http://localhost:5000/api/v1
- **Health Check**: http://localhost:5000/health

### **API Endpoints Categories:**
- **Auth**: http://localhost:5000/api/v1/auth
- **Departments**: http://localhost:5000/api/v1/departments
- **Employees**: http://localhost:5000/api/v1/employees
- **Environmental**: http://localhost:5000/api/v1/environmental
- **Social**: http://localhost:5000/api/v1/social
- **Gamification**: http://localhost:5000/api/v1/gamification
- **Reports**: http://localhost:5000/api/v1/reports
- **Admin**: http://localhost:5000/api/v1/admin

---

## 🎯 What You Can Do Now

✅ Access the dashboard at **http://localhost:5173**  
✅ Create test accounts and login  
✅ Create departments, employees, and challenges  
✅ Track environmental metrics  
✅ Manage CSR activities  
✅ View leaderboards  
✅ Monitor ESG scores  

---

## 📱 Mobile Device Access

To access from another device on the same network:

1. Find your machine's IP: `ipconfig getifaddr en0`
2. Use: `http://<YOUR_IP>:5173` for frontend
3. Update API URL in `frontend/src/api/axiosInstance.js`:
   ```javascript
   const API_BASE_URL = 'http://<YOUR_IP>:5000/api/v1';
   ```

---

## 🛠️ Development Tools

### **Recommended Extensions for VS Code:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- REST Client
- Thunder Client
- MySQL extension

### **Browser DevTools:**
- Open: Press F12 or Cmd+Option+I
- Check Console for errors
- Check Network tab for API calls

---

## 📝 Environment Summary

```
┌──────────────────────────────────────────┐
│         LOCAL DEVELOPMENT SETUP           │
├──────────────────────────────────────────┤
│ Frontend:  http://localhost:5173         │
│ Backend:   http://localhost:5000         │
│ Database:  localhost:3306                │
│ Status:    ✅ Ready for Development     │
└──────────────────────────────────────────┘
```

---

## 🚀 You're All Set!

Everything is configured and ready to use locally.

**Frontend URL**: http://localhost:5173  
**Backend URL**: http://localhost:5000  
**API Docs**: See SETUP.md and README.md  

Happy developing! 🎉

---

*For more detailed information, see README.md and SETUP.md*
