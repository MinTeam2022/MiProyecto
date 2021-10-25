require('dotenv').config()
const express = require("express");
const cors = require('cors');
const pino = require('pino-http')()
const passport = require('passport')
const passportConfig = require('./config/passport');

const app = express();
const port = process.env.PORT || 8081;

const usersRoute = require('./routes/users')
const productsRoute = require('./routes/products')
const ordersRoute = require('./routes/orders')
const authMiddleware = require('./middlewares/authentication')

app.use(express.json())
app.use(cors())
app.use(pino)
passportConfig(app)



app.get('/', (req, res) => {
    res.send("Hola mundo")
});

app.get('/checkAuth', authMiddleware, (req, res) => {
    res.status(200).json({ message: "Authenticated" })
})
app.get('/auth/google', passport.authenticate('google'))
app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        const { req: reqInfo, ...userInfo } = req.user
        const auth = JSON.stringify(userInfo)
        res.redirect(`http://localhost:3000/callback?auth=${auth}`)
    }
)

app.get('/error', (req, res) => res.send("error logging in"));
app.use('/users', usersRoute)
app.use('/products', productsRoute)
app.use('/orders', ordersRoute)


app.listen(port, () => {
    console.log(`Manoscampesinas app listening at http://localhost:${port}`);
});