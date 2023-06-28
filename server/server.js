import express from 'express';
import dotenv from 'dotenv';
import dbConfig from './config/db.js';

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 5000;

import usersRoute from './routes/usersRoute.js';
import productsRoute from './routes/productsRoute.js';
import bidsRoute from './routes/bidsRoute.js';
import notificationsRoute from './routes/notificationsRoute.js';

app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/bids', bidsRoute);
app.use('/api/notifications', notificationsRoute);

import path from 'path';

// deployment config
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Node/Express Server started on port ${port}`));

export default app;
