require('dotenv').config();
const express = require('express');
const authRoutes = require('./auth');
const authMiddleware = require('./middleware');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

// مسیر محافظت‌شده
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: 'دسترسی موفقیت‌آمیز', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
