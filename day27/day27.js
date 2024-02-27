const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateToken, authorizeRole } = require('./jwt');

const app = express();


app.get("/admin", authenticateToken, authorizeRole(["admin"]), (req, res) => {
    res.json({ message: "Admin page" });
});

app.get('/user', authenticateToken, authorizeRole(['user']), (req, res) => {
    res.json({ message: 'User route accessed successfully' });
  });

app.post('/login', (req, res) => {
    console.log('Logging in');
    // Perform authentication and generate token
    const user = { id: 1, username: 'example', role: 'admin' };
    const token = jwt.sign(user, 'mycode');

    const decodedToken = jwt.decode(token, { complete: true });
  console.log('Decoded Token:', decodedToken);

    res.json({ token });
  });


app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});