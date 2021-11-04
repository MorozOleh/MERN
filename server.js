const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
const userRoute = require('./routers/userRoute');
const loginRoute = require('./routers/loginRouter');
const config = require('config');
const PORT = config.get('port') || 8000

const connect = async() => {
    await mongoose.connect(config.get("mongoDB"))
}

connect()

app.use(cors())
app.use(express.json())
app.use("/redirect", express.static('public'));
app.use('/api/users', userRoute);
app.use('/api', loginRoute);

app.get('/', (req, res) => {
    res.redirect('/redirect')
})

app.get('/redirect', (req, res) => {
    res.send('index.html')

})


app.listen(PORT, () => { console.log(`port is ${PORT}`) })