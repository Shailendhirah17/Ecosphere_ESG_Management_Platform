# 🌍 EcoSphere - ESG Management Platform

## 📚 Complete Application Documentation

A production-ready **ESG (Environmental, Social, and Governance) Management Platform** built with modern technologies for tracking, managing, and improving organizational ESG performance.

---

## 🎯 What is EcoSphere?

EcoSphere is an comprehensive platform that enables organizations to:

✅ **Track Environmental Impact** - Carbon emissions, sustainability metrics  
✅ **Manage Social Initiatives** - CSR activities, employee engagement  
✅ **Ensure Governance Compliance** - Policies, audits, compliance tracking  
✅ **Gamify Participation** - Challenges, leaderboards, rewards  
✅ **Generate Analytics** - Real-time dashboards, comprehensive reports  

---

## 🏗️ Application Architecture

### **Frontend Stack**
```
React.js (v19) + Vite
├── React Router (navigation)
├── Context API (authentication & state)
├── Axios (API client)
├── Recharts (data visualization)
├── Tailwind CSS (styling)
└── Lucide Icons (UI icons)
```

### **Backend Stack**
```
Node.js + Express.js
├── MySQL Database with Sequelize ORM
├── JWT Authentication + RBAC
├── Layered Architecture (Routes → Controllers → Services → Models)
└── Business Logic & Database Operations
```

---

## 🚀 QUICK START GUIDE

### **Step 1: Prerequisites**

Install required software on your macOS:

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (includes npm)
brew install node

# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Verify installations
node --version
npm --version
mysql --version
```

### **Step 2: Navigate to Project**

```bash
cd "/Users/shailendhirah/Downloads/EcoSphere – ESG Management Platform"
```

### **Step 3: Create MySQL Database**

```bash
# Login to MySQL (default password: 'password123' or press Enter if no password)
mysql -u root -p

# In MySQL shell, create database:
CREATE DATABASE ecosphere_db;
EXIT;
```

### **Step 4: Install Dependencies**

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

---

## ⚡ Running the Application

### **Terminal 1: Start Backend Server**

```bash
cd backend
npm run dev
```

**Expected Output:**
```
✓ Database connection established
✓ Server started on port 5000
✓ Environment: development
✓ API Base URL: http://localhost:5000/api/v1
```

### **Terminal 2: Start Frontend Server**

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

---

## 🌐 Access the Application

| Service | URL |
|---------|-----|
| **Frontend (React App)** | http://localhost:5173 |
| **Backend API** | http://localhost:5000/api/v1 |
| **Health Check** | http://localhost:5000/health |

---

## 🔐 Default Login Credentials

First, you'll need to create a user account through registration or use the API.

### Create Test User via API

```bash
# Using curl
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "department_id": 1,
    "role": "Employee"
  }'

# Then login with:
# Email: test@example.com
# Password: password123
```

---

## 📊 Localhost URLs & Ports Summary

```
┌─────────────────────────────────────────┐
│         🏠 LOCAL DEVELOPMENT PORTS       │
├─────────────────────────────────────────┤
│ Frontend (React):     localhost:5173    │
│ Backend (Express):    localhost:5000    │
│ MySQL Database:       localhost:3306    │
│                                         │
│ ✅ All running on your local machine    │
└─────────────────────────────────────────┘
```

### Direct Access Links:
- 🎨 **Frontend**: [http://localhost:5173](http://localhost:5173)
- 🔌 **API Dashboard**: [http://localhost:5000/health](http://localhost:5000/health)
- 📡 **API Base**: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)

---

## 🗂️ Project Structure

```
EcoSphere/
├── backend/
│   ├── config/
│   │   ├── database.js          # MySQL connection config
│   │   └── sequelize.js         # Sequelize initialization
│   ├── controllers/             # Request handlers
│   │   ├── authController.js
│   │   ├── departmentController.js
│   │   ├── employeeController.js
│   │   ├── environmentalController.js
│   │   ├── socialController.js
│   │   └── gamificationController.js
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── rbacMiddleware.js    # Role-based access control
│   ├── models/                  # Database models (22 tables)
│   │   ├── Department.js
│   │   ├── Employee.js
│   │   ├── CarbonTransaction.js
│   │   ├── CSRActivity.js
│   │   ├── Challenge.js
│   │   ├── Badge.js
│   │   └── ...
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── departmentRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── environmentalRoutes.js
│   │   ├── socialRoutes.js
│   │   ├── gamificationRoutes.js
│   │   ├── governanceRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── adminRoutes.js
│   │   └── index.js
│   ├── services/                # Business logic
│   │   ├── departmentService.js
│   │   ├── employeeService.js
│   │   ├── environmentalService.js
│   │   ├── socialService.js
│   │   └── gamificationService.js
│   ├── utils/
│   │   ├── jwtUtils.js
│   │   ├── passwordUtils.js
│   │   └── responseUtils.js
│   ├── server.js               # Express app entry point
│   ├── package.json
│   └── .env                    # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosInstance.js    # Axios configuration
│   │   │   └── endpoints.js        # API endpoint definitions
│   │   ├── components/
│   │   │   ├── Layout.jsx          # Main layout wrapper
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   └── ProtectedRoute.jsx  # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ChallengesPage.jsx
│   │   │   └── LeaderboardPage.jsx
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # React DOM entry
│   │   └── index.css               # Tailwind styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
│
├── SETUP.md                    # Setup documentation
├── QUICKSTART.sh               # Quick start script
├── README.md                   # This file
└── install-deps.sh             # Installation script
```

---

## 🔌 API Endpoints Overview

### **Base URL**: `http://localhost:5000/api/v1`

### **Authentication**
```
POST   /auth/login                   # Login with email/password
POST   /auth/register                # Create new account
POST   /auth/refresh-token           # Refresh JWT token
```

### **Departments**
```
GET    /departments                  # Get all departments
POST   /departments                  # Create department (Admin)
GET    /departments/:id              # Get specific department
PUT    /departments/:id              # Update department (Admin)
GET    /departments/:id/stats        # Get department statistics
POST   /departments/:id/calculate-scores  # Calculate ESG scores (Admin)
```

### **Employees**
```
GET    /employees                    # Get all employees
POST   /employees                    # Create employee (Admin)
GET    /employees/:id                # Get specific employee
PUT    /employees/:id                # Update employee
GET    /employees/leaderboard/all    # Get leaderboard
POST   /employees/award-badge        # Award badge (Admin)
POST   /employees/add-xp             # Add XP (Admin)
POST   /employees/add-points         # Add points (Admin)
```

### **Environmental**
```
POST   /environmental/carbon-transactions        # Create transaction
GET    /environmental/carbon-transactions        # Get transactions
GET    /environmental/carbon-transactions/:id    # Get specific transaction
GET    /environmental/departments/:id/total-emissions  # Get emissions
POST   /environmental/emission-factors           # Create factor (Admin)
GET    /environmental/emission-factors           # Get factors
GET    /environmental/emission-factors/:id       # Get specific factor
PUT    /environmental/emission-factors/:id       # Update factor (Admin)
```

### **Social (CSR)**
```
POST   /social/activities                        # Create activity (Admin/Head)
GET    /social/activities                        # Get activities
GET    /social/activities/:id                    # Get specific activity
POST   /social/participate                       # Join activity
POST   /social/participations/:id/approve        # Approve (Admin/Head)
POST   /social/participations/:id/reject         # Reject (Admin/Head)
GET    /social/employees/:id/participations     # Get employee activities
GET    /social/departments/:id/statistics       # Get CSR stats
```

### **Gamification**
```
POST   /gamification/challenges                  # Create challenge (Admin/Head)
GET    /gamification/challenges                  # Get challenges
GET    /gamification/challenges/:id              # Get specific challenge
POST   /gamification/join                        # Join challenge
POST   /gamification/submit-proof                # Submit proof
POST   /gamification/participations/:id/approve  # Approve (Admin/Head)
POST   /gamification/participations/:id/reject   # Reject (Admin/Head)
GET    /gamification/employees/:id/challenges   # Get employee challenges
GET    /gamification/employees/:id/active-challenges  # Get active challenges
GET    /gamification/challenges/:id/leaderboard # Get challenge leaderboard
GET    /gamification/employees/:id/stats        # Get gamification stats
```

---

## 📊 Database Schema (22 Tables)

### **Master Tables**
- `Department` - Organization departments
- `Employee` - Employee information & credentials
- `Category` - Activity/Challenge categories
- `Badge` - Achievement badges
- `Reward` - Redemption rewards
- `EmissionFactor` - CO2 calculation factors
- `ESGPolicy` - Governance policies
- `Setting` - Application settings

### **Transactional Tables**
- `CarbonTransaction` - Emission records
- `CSRActivity` - Social activities
- `EmployeeParticipation` - Activity participation
- `Challenge` - Gamification challenges
- `ChallengeParticipation` - Challenge enrollment
- `DepartmentScore` - ESG scores
- `EmployeeBadge` - Badge assignments
- `PolicyAcknowledgement` - Policy confirmations
- `Audit` - Compliance audits
- `ComplianceIssue` - Audit findings
- `EnvironmentalGoal` - Sustainability goals
- `ProductESGProfile` - Product ESG data
- `RewardRedemption` - Reward claims

---

## 👥 User Roles & Permissions

| Role | Permissions |
|------|-----------|
| **Employee** | View dashboard, join challenges, participate in CSR |
| **Department Head** | Create activities/challenges, approve participations |
| **ESG Admin** | Full system access, create all content, manage users |
| **Auditor** | View audits, create compliance issues |

---

## 🧪 Testing the Application

### **1. Create a Test Department**
```bash
curl -X POST http://localhost:5000/api/v1/departments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Engineering",
    "code": "ENG",
    "employee_count": 50
  }'
```

### **2. Create Emission Factor**
```bash
curl -X POST http://localhost:5000/api/v1/environmental/emission-factors \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "activity_type": "Vehicle Travel",
    "unit": "km",
    "co2_per_unit": 0.21,
    "description": "Carbon emissions per km"
  }'
```

### **3. Create Carbon Transaction**
```bash
curl -X POST http://localhost:5000/api/v1/environmental/carbon-transactions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "department_id": 1,
    "source_type": "Vehicle",
    "emission_factor_id": 1,
    "quantity": 100,
    "date": "2024-01-15"
  }'
```

### **4. Create a Challenge**
```bash
curl -X POST http://localhost:5000/api/v1/gamification/challenges \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Reduce Plastic Usage",
    "category_id": 1,
    "description": "Reduce single-use plastic in office",
    "xp": 100,
    "difficulty": "Medium",
    "deadline": "2024-02-15"
  }'
```

---

## 🐛 Troubleshooting

### **Issue: "Can't connect to MySQL server"**
```bash
# Check if MySQL is running
brew services list

# Start MySQL if not running
brew services start mysql

# Verify connection
mysql -u root -p
```

### **Issue: "Port 5000 already in use"**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### **Issue: "Frontend can't connect to API"**
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Verify token is being sent in Authorization header

### **Issue: "npm: command not found"**
```bash
# Reinstall Node.js
brew install node

# Verify installation
node --version
npm --version
```

---

## 🔑 Environment Configuration

### **Backend (.env)**
```properties
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password123
DB_NAME=ecosphere_db
DB_PORT=3306

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=ecosphere_jwt_secret_key_development
JWT_EXPIRY=7d

# Email (optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@ecosphere.com
```

### **Frontend (src/api/axiosInstance.js)**
- API_BASE_URL is set to `http://localhost:5000/api/v1`
- Token is automatically attached to all requests
- Handles 401 errors by redirecting to login

---

## 📈 Performance Tips

1. **Database Optimization**
   - Add indexes on frequently queried fields
   - Use pagination for list endpoints
   - Cache DepartmentScore calculations

2. **Frontend Optimization**
   - Use React.memo for expensive components
   - Implement code splitting with React.lazy
   - Cache API responses with localStorage

3. **Backend Optimization**
   - Implement request rate limiting
   - Use connection pooling for database
   - Add response caching headers

---

## 🚀 Deployment Ready Features

✅ Environment-based configuration  
✅ JWT authentication & RBAC  
✅ Error handling & validation  
✅ CORS support  
✅ Request logging  
✅ Sequelize migrations ready  
✅ React Router setup for SPA  
✅ Responsive design with Tailwind  

---

## 📝 Next Steps

1. ✅ **Explore the Dashboard** - http://localhost:5173
2. ✅ **Create Test Data** - Use API endpoints above
3. ✅ **Review Code** - Check backend services and frontend components
4. ✅ **Extend Features** - Add more modules like Governance
5. ✅ **Deploy** - Use platforms like Heroku, Vercel, AWS

---

## 📚 Documentation Files

- `SETUP.md` - Detailed setup instructions
- `QUICKSTART.sh` - Automated setup script
- `README.md` - This comprehensive guide
- API responses follow standard JSON format with `success`, `message`, `data`, `timestamp`

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Sequelize Docs](https://sequelize.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)

---

## 💡 Pro Tips

💡 **Use Postman** for API testing - Import endpoints and test with tokens  
💡 **Enable Redux DevTools** for state management debugging  
💡 **Use MySQL Workbench** for database visualization  
💡 **Enable ESLint** in VS Code for code quality  
💡 **Use Git** for version control from the start  

---

## ✨ Features Highlight

🎯 **Real-time Dashboard** - Live ESG metrics and trends  
🎯 **Gamification** - Challenges, leaderboards, badges  
🎯 **Environmental Tracking** - Carbon emissions, goals  
🎯 **Social Management** - CSR activities, employee engagement  
🎯 **Compliance** - Policy management, audit trails  
🎯 **Analytics** - Comprehensive reports and exports  
🎯 **Role-Based Access** - Granular permissions system  
🎯 **Responsive Design** - Works on all devices  

---

## 🎉 Ready to Go!

Your EcoSphere application is now fully set up and ready for development!

**Frontend**: http://localhost:5173  
**Backend**: http://localhost:5000  
**API**: http://localhost:5000/api/v1  

**Happy coding! 🚀**

---

*Last Updated: January 2024*  
*EcoSphere - ESG Management Platform*
