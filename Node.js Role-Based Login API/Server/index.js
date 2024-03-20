import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './src/routes/userRoutes.js'
import adminRoutes from './src/routes/adminRoutes.js'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get("/", (req, res) => {
  res.json("Hello Test");
});

app.use('/user', userRoutes);
app.use('/admin' , adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

export default app;
