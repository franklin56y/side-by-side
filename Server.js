const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/heavenlytrendy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User and Sale Schemas
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
  phone: String,
  dob: Date,
  isAdmin: { type: Boolean, default: false }
});

const saleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  status: String
});

const User = mongoose.model('User', userSchema);
const Sale = mongoose.model('Sale', saleSchema);

// User registration
app.post('/api/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: 'Signup successful' });
});

// User login (simple, no JWT for demo)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ message: 'Login successful', userId: user._id, isAdmin: user.isAdmin });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Add a sale (call this after a purchase)
app.post('/api/sale', async (req, res) => {
  const sale = new Sale(req.body);
  await sale.save();
  res.json({ message: 'Sale recorded' });
});

// Get sales history for a user (admin can see all)
app.get('/api/history/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  let sales;
  if (user.isAdmin) {
    sales = await Sale.find().populate('userId', 'email firstName lastName');
  } else {
    sales = await Sale.find({ userId: user._id });
  }
  res.json(sales);
});

// Start server
app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});