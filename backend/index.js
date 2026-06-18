const express = require('express');
const { user } = require('./db');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-local-jwt-secret';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(express.json());
app.use(cors());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      msg: 'Login required',
      status: 401,
    });
  }

  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(403).json({
      msg: 'Invalid or expired token',
      status: 403,
    });
  }
};

app.get('/api/health', (req, res) => {
  return res.json({
    msg: 'Server is running',
    status: 200,
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      msg: 'Invalid username or password',
      status: 401,
    });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });

  return res.json({
    msg: 'Login successful',
    status: 200,
    token,
  });
});

app.post('/api/addDetail', authenticateToken, async (req, res) => {
  const data = req.body;

  try {
    await user.create({
      name: data.name,
      rollNumber: data.rollNumber,
      contact: data.contact,
      currentRoom: data.currentRoom,
      allotedRoom: data.allotedRoom,
      currentHostel: data.currentHostel,
      allotedHostel: data.allotedHostel,
    });

    return res.json({
      msg: 'User added successfully',
      status: 200,
    });
  } catch (error) {
    console.log('Error while creating user', error.message);

    return res.json({
      msg: 'Error while adding user',
      status: 400,
    });
  }
});

app.get('/api/bulk', authenticateToken, async (req, res) => {
  const newfilter = (req.query.filter || '').toLowerCase();
  const data = await user.find({
    $or: [
      {
                name: {
                    $regex: newfilter,
                    $options: "i"
                }
            },

            {
                currentRoom: {
                    $regex: newfilter,
                    $options: "i"
                }
            },
            {
                allotedRoom: {
                    $regex: newfilter,
                    $options: "i"
                }
            }
    ],
  });

  return res.json({
    data,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
