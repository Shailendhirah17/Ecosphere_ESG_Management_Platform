# EcoSphere - ESG Management Platform

A comprehensive ESG (Environmental, Social, and Governance) management platform built with modern web technologies.

## 🎯 Project Overview

EcoSphere is a full-stack application designed to help organizations track, manage, and improve their ESG performance through:

- **Environmental Tracking**: Carbon emissions management and sustainability metrics
- **Social Impact**: CSR activities and employee engagement
- **Governance**: Compliance issues and policy management
- **Gamification**: Challenges, leaderboards, and employee rewards
- **Analytics**: Real-time dashboards and comprehensive reporting

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT-based auth with role-based access control (RBAC)
- **Architecture**: Layered (Routes → Controllers → Services → Models)

### Frontend (React.js + Vite)
- **Framework**: React with React Router
- **State Management**: Context API
- **Styling**: Tailwind CSS
- **UI Components**: Lucide Icons, Recharts for dashboards
- **HTTP Client**: Axios with interceptors

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL 8.0+
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Setup

```bash
cd "EcoSphere – ESG Management Platform"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with database configuration
cat > .env << EOF
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecosphere_db
JWT_SECRET=your_jwt_secret_key_here
EOF

# Create database
mysql -u root -p
CREATE DATABASE ecosphere_db;
EXIT;

# Start the backend server
npm run dev
```

Backend will be available at: **http://localhost:5000**

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/v1`

### Authentication
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/refresh-token` - Refresh JWT token

### Departments
- `GET /departments` - Get all departments
- `POST /departments` - Create department (Admin only)
- `GET /departments/:id` - Get department by ID
- `PUT /departments/:id` - Update department (Admin only)
- `GET /departments/:id/stats` - Get department statistics

### Employees
- `GET /employees` - Get all employees
- `POST /employees` - Create employee (Admin only)
- `GET /employees/:id` - Get employee by ID
- `GET /employees/leaderboard/all` - Get leaderboard

### Environmental
- `POST /environmental/carbon-transactions` - Create carbon transaction
- `GET /environmental/carbon-transactions` - Get transactions (with filters)
- `GET /environmental/emission-factors` - Get emission factors
- `POST /environmental/emission-factors` - Create emission factor (Admin only)

### Social (CSR Activities)
- `POST /social/activities` - Create CSR activity (Admin/Head only)
- `GET /social/activities` - Get all CSR activities
- `POST /social/participate` - Join CSR activity
- `POST /social/participations/:id/approve` - Approve participation (Admin/Head only)

### Gamification (Challenges)
- `POST /gamification/challenges` - Create challenge (Admin/Head only)
- `GET /gamification/challenges` - Get all challenges
- `POST /gamification/join` - Join challenge
- `POST /gamification/submit-proof` - Submit challenge proof
- `POST /gamification/participations/:id/approve` - Approve completion (Admin/Head only)
- `GET /gamification/employees/:id/stats` - Get employee gamification stats
- `GET /gamification/challenges/:id/leaderboard` - Get challenge leaderboard

## 📊 Default Credentials

For testing purposes, you can create test users through the API:

```bash
# Register
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "department_id": 1,
  "role": "Employee"
}

# Login
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

## 🎮 Features

### Dashboard
- Real-time ESG metrics visualization
- Department overview
- Performance trends
- Key statistics

### Challenges
- Browse active challenges
- Filter by difficulty level
- Join and track progress
- Submit proofs of completion

### Leaderboard
- Top performers ranking
- XP and points display
- Medal system for top 3
- Real-time updates

### Environmental Module
- Carbon emission tracking
- Emission factor management
- Department-wise emission reports

### Social Module
- CSR activity creation and management
- Employee participation tracking
- Points and rewards system

### Gamification
- Challenge creation and management
- XP earning system
- Badge awards
- Points redemption

## 📁 Project Structure

```
EcoSphere/
├── backend/
│   ├── config/            # Database & Sequelize config
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Auth & RBAC middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # JWT, password, response utilities
│   ├── server.js         # Express app entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/              # API endpoints & axios instance
    │   ├── components/       # Reusable components
    │   ├── context/          # Auth context
    │   ├── pages/            # Page components
    │   ├── App.jsx           # Main app component
    │   ├── main.jsx          # React DOM entry
    │   └── index.css         # Tailwind styles
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🔐 Authentication & Authorization

The application uses JWT (JSON Web Tokens) for authentication and supports role-based access control:

**Roles:**
- `Employee` - Standard employee
- `Department Head` - Department manager
- `ESG Admin` - Platform administrator
- `Auditor` - Compliance auditor

## 🗄️ Database Schema

### Master Tables
- `Department` - Department information
- `Employee` - Employee data with credentials
- `Category` - Activity/Challenge categories
- `Badge` - Achievement badges
- `Reward` - Redemption rewards
- `EmissionFactor` - Carbon calculation factors
- `ESGPolicy` - Compliance policies

### Transactional Tables
- `CarbonTransaction` - Emission records
- `CSRActivity` - Social responsibility activities
- `EmployeeParticipation` - Activity participation
- `Challenge` - Gamification challenges
- `ChallengeParticipation` - Challenge enrollment
- `DepartmentScore` - ESG scores
- `PolicyAcknowledgement` - Policy confirmations
- `Audit` - Compliance audits
- `ComplianceIssue` - Issues from audits

## 🌐 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=ecosphere_db
JWT_SECRET=your_secret_key
JWT_EXPIRY=24h
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## 🧪 Testing the Application

1. **Create a Department**
   ```bash
   POST /api/v1/departments
   {
     "name": "Engineering",
     "code": "ENG",
     "employee_count": 50
   }
   ```

2. **Create an Emission Factor**
   ```bash
   POST /api/v1/environmental/emission-factors
   {
     "activity_type": "Car Travel",
     "unit": "km",
     "co2_per_unit": 0.21,
     "description": "CO2 per km traveled"
   }
   ```

3. **Create a Carbon Transaction**
   ```bash
   POST /api/v1/environmental/carbon-transactions
   {
     "department_id": 1,
     "source_type": "Vehicle",
     "emission_factor_id": 1,
     "quantity": 100,
     "date": "2024-01-15"
   }
   ```

4. **Create a Challenge**
   ```bash
   POST /api/v1/gamification/challenges
   {
     "title": "Reduce Plastic Usage",
     "category_id": 1,
     "description": "Reduce single-use plastic",
     "xp": 100,
     "difficulty": "Medium",
     "deadline": "2024-02-15"
   }
   ```

## 🐛 Troubleshooting

### Backend won't connect to database
- Verify MySQL is running: `mysql -u root -p`
- Check `.env` file has correct credentials
- Ensure `ecosphere_db` exists

### Frontend can't connect to API
- Verify backend is running on port 5000
- Check CORS is enabled in backend
- Verify API URL in axios instance

### Port already in use
```bash
# Backend (port 5000)
lsof -i :5000
kill -9 <PID>

# Frontend (port 5173)
lsof -i :5173
kill -9 <PID>
```

## 📝 API Response Format

All API responses follow a standard format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🤝 Contributing

This is a hackathon project. Feel free to extend with:
- Additional modules
- S3 file uploads
- Email notifications
- Advanced analytics
- Mobile app

## 📄 License

MIT License - feel free to use this project as a reference

## 🎓 Learning Resources

- [Sequelize Documentation](https://sequelize.org/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Happy coding! 🚀**
