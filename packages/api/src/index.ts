import express from 'express';
import cors from 'cors';
import { db } from '@app/database';
import { healthRouter } from './routes/health.js';
import { tasksRouter } from './routes/tasks.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/tasks', tasksRouter);

// Error handling
app.use(errorHandler);

// Initialize database and start server
async function startServer() {
  try {
    await db.init();
    console.log('✅ Database initialized');

    app.listen(PORT, () => {
      console.log(`🚀 API Server running on http://localhost:${PORT}`);
      console.log(`📝 Health check: http://localhost:${PORT}/api/v1/health`);
      console.log(`📋 Tasks API: http://localhost:${PORT}/api/v1/tasks`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
