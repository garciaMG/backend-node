require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
 
app.listen(process.env.PORT, () => (
    console.log('Servidor corriendo', process.env.PORT)
));
