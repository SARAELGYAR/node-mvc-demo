const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectToDatabase = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();
connectToDatabase();

const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', itemRoutes);


app.use((err, req, res, next) => {
    console.error(" Error:", err.message);
    res.status(500).send("Internal Server Error");
});


app.listen(port, () => console.log(` Server is running on http://localhost:${port}`));
