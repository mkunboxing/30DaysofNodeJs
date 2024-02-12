const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "yourSecretKey"; 

const authenticateToken = (req, res, next) => {
   const header = req.headers['authorization'];

  console.log('header',header);

  const token = header && header.split(' ')[1];

  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    // console.error('Token Verification Error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

const generateToken = (userId) => {
  const payload = {
    userId: userId,
    
  };

  const options = {
    expiresIn: "1h", 
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.get("/generate-token", (req, res) => {
  const userId = "123456";
  const token = generateToken(userId);
  res.json({ token });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
