require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes will be added here
app.use('/api/v1', require('./routes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Initialize database and start server
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    console.log('\n🔄 Initializing EcoSphere Server...');
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📍 Database: ${process.env.DB_NAME} @ ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log('');

    // Test database connection
    console.log('🔗 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully!');
    
    // Auto-sync database models
    console.log('🔄 Syncing database tables...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synced successfully!\n');

    // Start listening
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('═══════════════════════════════════════════════════');
      console.log('       🌍 ECOSPHERE SERVER IS RUNNING 🌍');
      console.log('═══════════════════════════════════════════════════');
      console.log(`✅ Server listening on PORT: ${PORT}`);
      console.log(`✅ API Base URL: http://localhost:${PORT}/api/v1`);
      console.log(`✅ Health Check: http://localhost:${PORT}/health`);
      console.log('═══════════════════════════════════════════════════\n');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('📌 SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('✅ HTTP server closed');
        sequelize.close().then(() => {
          console.log('✅ Database connection closed');
          process.exit(0);
        });
      });
    });

  } catch (error) {
    console.error('');
    console.error('═══════════════════════════════════════════════════');
    console.error('           ❌ SERVER STARTUP ERROR ❌');
    console.error('═══════════════════════════════════════════════════');
    console.error('Error Details:', error.message);
    console.error('');
    
    if (error.message.includes('Access denied')) {
      console.error('🔍 TROUBLESHOOTING:');
      console.error('   1. Is MySQL running? Start it with:');
      console.error('      macOS: brew services start mysql');
      console.error('   2. Check credentials in .env file');
      console.error('   3. Does database "ecosphere_db" exist?');
      console.error('      Create it with:');
      console.error('      mysql -u root -p -e "CREATE DATABASE ecosphere_db;"');
    } else if (error.message.includes('connect ECONNREFUSED')) {
      console.error('🔍 TROUBLESHOOTING:');
      console.error('   MySQL is not running. Start it with:');
      console.error('   macOS: brew services start mysql');
    }
    
    console.error('═══════════════════════════════════════════════════\n');
    process.exit(1);
  }
};

startServer();

module.exports = app;
