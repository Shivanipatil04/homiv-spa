import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploads static folder
const uploadsPath = path.join(process.cwd(), 'backend', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Also serve src/assets/images statically if needed
const srcAssetsPath = path.join(process.cwd(), 'src', 'assets');
app.use('/src/assets', express.static(srcAssetsPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/services', serviceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HOMIV Spa API Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
