const express = require('express');
const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
const cors = require("cors");

// Sets up the Express App
// =============================================================
const app = express();
//LOCAL
app.use(cors())
//DEPLOYED
// app.use(cors({
//     origin:["https://reactauthdemo-front.herokuapp.com"]
// }))
const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
const { User} = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use('/',allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});