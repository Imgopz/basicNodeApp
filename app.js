const express = require('express');
const app = express();



app.get('/', (req, res) => {
    res.send('Hello from basic app..!')
})

app.listen(3001, () => {
    console.log('Serving on port 3000');
});