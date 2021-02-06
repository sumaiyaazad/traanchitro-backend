const express = require('express')
const app = express()
const connection=require('./db/mongoose');
const port = process.env.PORT



connection();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log("Hello from your server");
});
