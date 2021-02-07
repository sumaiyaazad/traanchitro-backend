const express = require('express')
const app = express()
const bodyParser=require('body-parser');

const connection=require('./db/mongoose');
const port = process.env.PORT

const activityRoutes=require('./routes/activity')
const organizationRoutes=require('./routes/organization')
const userRoutes=require('./routes/user')
const locationRoutes=require('./routes/location')


connection();


app.use(bodyParser.json());
app.use(organizationRoutes);
app.use(activityRoutes);
app.use(locationRoutes);
app.use(userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log("Hello from your server");
});
