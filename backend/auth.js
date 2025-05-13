const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// حافظه لوکالی برای کاربران
const users = [];

// ثبت‌نام
router.post('/signup', async (req, res) => {
  const { firstName, lastName, password } = req.body;

  if (!firstName || !lastName || !password)
    return res.status(400).json({ message: 'لطفاً همه فیلدها را پر کنید.' });

  const existingUser = users.find(u => u.firstName === firstName);
  if (existingUser)
    return res.status(409).json({ message: 'کاربر با این نام قبلاً ثبت‌نام کرده.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, firstName, lastName, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'ثبت‌نام موفق بود.' });
});

// ورود
router.post('/login', async (req, res) => {
  const { firstName, password } = req.body;

  const user = users.find(u => u.firstName === firstName);
  if (!user)
    return res.status(401).json({ message: 'کاربر پیدا نشد.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: 'رمز عبور اشتباه است.' });

  const token = jwt.sign({ id: user.id, firstName: user.firstName }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'ورود موفق', token });
});

module.exports = router;
