const express = require("express");
const cors = require('cors');
const pino = require('pino-http')()

const app = express();
const port = 8080;

const usersRoute = require('./routes/users')
const productsRoute = require('./routes/products')
const ordersRoute = require('./routes/orders')

app.use(express.json())
app.use(cors())
app.use(pino)

app.get('/', (req, res) => {
    res.send("Hola mundo");
});

app.use('/users', usersRoute)
app.use('/products', productsRoute)
app.use('/orders', ordersRoute)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});