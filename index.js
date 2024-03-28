const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/auth', require('./routes/authRoutes'));

// Error handler middleware
app.use(require('./middlewares/errorHandlerMiddleware'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error('MongoDB connection error:', error));
