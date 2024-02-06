const express = require('express');

const app = express();
const port = 8000;

function greetHandler(req, res) {
    const name = req.query.name;
    if(name){
        res.send(`Hello ${name}`);
    }else{
        res.send('Hello Guest');
    }
}

app.get('/greet', greetHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));