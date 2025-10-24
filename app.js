import express from 'express';
import process from 'node:process';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import categoryRoutes from './src/categories/routes.js';
import productRoutes from './src/products/routes.js';
import userRoutes from './src/users/routes.js';
import orderRoutes from './src/orders/routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
}

const whitelist = ['http://localhost:5173']

app.use(
  cors({
    origin: function (origin, callback){
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        callback(new Error(`Not allowed by CORS: $${origin}`));
      }
    },
  })
);

app.use(bodyParser.json());

app.set('port', PORT);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
