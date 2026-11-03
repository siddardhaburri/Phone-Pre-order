import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import reservationRouter from './routes/reservations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'NEXTGEN MOBILE Flagship Reservation System',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api', reservationRouter);

// Serve frontend build in production
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  const indexPath = path.join(clientDist, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>NEXTGEN MOBILE API</title></head>
          <body style="font-family:sans-serif; background:#fff; color:#0f172a; padding:40px;">
            <h1 style="color:#0d9488;">NEXTGEN MOBILE API Server Running on port ${PORT}</h1>
            <p>API endpoints active at <code>/api/devices</code>, <code>/api/reservations</code>, <code>/health</code>.</p>
          </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 NEXTGEN MOBILE API Server active at http://localhost:${PORT}`);
  console.log(`📡 Devices endpoint: http://localhost:${PORT}/api/devices`);
});
