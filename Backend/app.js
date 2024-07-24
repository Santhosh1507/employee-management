const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');


const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const auditTrailRoutes = require('./routes/auditTrailRoutes');

app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/auditTrails', auditTrailRoutes);

app.use('/', (req, res) => res.send('Hello World!'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
