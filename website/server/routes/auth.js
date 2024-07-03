const express = require('express');
const User = require('../models/user');

const { decryptText, encryptText, generateToken } = require('../auth/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = new User({ email, password: encryptText(password) });
		await user.save();
		res.send(user);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if(!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    if (decryptText(user.password) !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = generateToken('user');
    res.json({ token });
});
  
module.exports = router;