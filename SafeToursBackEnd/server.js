// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 443 || 8080;
const cors = require('cors');
const session = require('express-session');
const fileupload = require('express-fileupload');

const mongoose = require('mongoose');

const config = require('./configure.js');


const userRoute = require('./Route/user.router');
const countryRoute = require("./Route/country.router");
const placeRoute = require("./Route/place.router");
const tourRoute = require("./Route/tour.router");
const bookRoute = require("./Route/book.router");

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

  })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload({
  useTempFiles: true
}));


app.use('/user', userRoute);
app.use("/country", countryRoute);
app.use("/place", placeRoute);
app.use("/tour", tourRoute);
app.use("/book", bookRoute);







app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});
