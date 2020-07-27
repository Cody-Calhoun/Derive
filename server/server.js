const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
    express.json(),
    cors({ credentials: true, origin: 'http://localhost:3000'}),
    express.urlencoded({ extended : true}),
    cookieParser()

)

require('./config/mongoose.config');

require('dotenv').config({ path: __dirname + '/../.env'});

const userRoutes = require('./routes/User.routes');
const cookieParser = require('cookie-parser');

userRoutes(app);

app.listen(8000, () => console.log("Listening on port 8000"));