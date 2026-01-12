import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './Config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./Inngest/index.js";


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware({
  apiKey: process.env.CLERK_SECRET_KEY,
}));

app.get('/', (req, res) => {
  res.send('Welcome to the QuickFlicks Server!');
});

app.use('/api/inngest', serve({ client: inngest, functions }));

//Listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});