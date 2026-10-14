import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';

import env from './config/env.ts';
import { AppError } from './errors/AppError.ts';
import authRoutes from './routes/auth.routes.ts';
import foodRoutes from './routes/food.routes.ts';
import moodRoutes from './routes/mood.routes.ts';
import savedRecipeRoutes from './routes/savedRecipes.routes.ts';
import tasksRoutes from './routes/tasks.routes.ts';
import transactionRoutes from './routes/transactions.routes.ts';

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/saved-recipes', savedRecipeRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/tasks', tasksRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'PLA Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

const globalErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(statusCode).json({
    status: 'error',
    message,
    stack:
      env.NODE_ENV === 'development' && err instanceof Error
        ? err.stack
        : undefined,
  });
};

app.use(globalErrorHandler);

export default app;
