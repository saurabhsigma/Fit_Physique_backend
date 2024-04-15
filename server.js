
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Razorpay = require('razorpay');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
 
require.dotenv().config();
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@fit-physique.glqfmh0.mongodb.net/login-db`)



app.use(bodyParser.json());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Define a route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"Fit_Physique", 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile('register.html',{root:__dirname });
});

app.get('/Fit_Physique/login',(req, res) => {
  res.sendFile('login.html',{root:__dirname });
});

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

//PAYMENT

const razorpay = new Razorpay({
  key_id: 'rzp_test_QP8gEswhYezBTn',
  key_secret: 'GWxFawyWDJ5x7SOgRnIzZP6J',
});

app.post('/createOrder', async (req, res) => {
  const options = {
    amount: 50000, // amount in the smallest currency unit (e.g., paise in INR)
    currency: 'INR',
    receipt: 'order_receipt',
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
