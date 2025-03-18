/* NPMs */
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const requestIP = require('request-ip');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const moment = require('moment-timezone');
const randomstring = require("randomstring");
const fetch = require('node-fetch');
const { createCanvas } = require('canvas');
const njs = require('newfiesjs')
const ini = require('ini');

dotenv = require('dotenv').config()
njs.config('reminderConfig', false)

/* Other Variables */
let timezone = process.env.TIMEZONE || "America/Chicago";
let rawCurrentDateTime = new Date();
let currentDateTime = moment(rawCurrentDateTime).tz(timezone).format('MMMM Do YYYY, h:mm:ss a');
const port = process.env.PORT || 1234;

/* Paths */
app.use(express.static(path.join(__dirname, 'public')));

/* Set */
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Define the folder where the ejs files will be stored
app.set('views', path.join(__dirname, '/views'));

/* Use */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/options', express.static(path.join(__dirname, 'options')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

/* Get */
// Redirects Users From "/" to "/home"
app.get('/', function(req, res) {
    res.redirect("/home");
});

app.get('/home', function(req, res) {
    const optionsDir = path.join(__dirname, 'options');
    fs.readdir(optionsDir, (err, dirs) => {
      if (err) {
        return res.status(500).send('Error reading options directory');
      }
  
      let gamesData = [];
  
      dirs.forEach((dir) => {
        const configPath = path.join(optionsDir, dir, 'config.ini');
        if (fs.existsSync(configPath)) {
          const config = ini.parse(fs.readFileSync(configPath, 'utf-8'));
  
          if (config['Loading Configurations']) {
            const game = {
              name: config['Loading Configurations'].Name || 'Unnamed Option',
              logo: '/options/' + dir + '/logo.png', // Correct path to the logo file
            };
  
            gamesData.push(game);
          } else {
            console.warn(`No 'Loading Configurations' section found in config for ${dir}`);
          }
        }
      });
  
      // Pass the game data to the home.ejs view
      res.render('home', { games: gamesData });
    });
  });

  
  

app.get('*', function(req, res) {
    res.redirect("/home");
});

app.listen(port, () => {
    njs.njsLog(`Server is running on port ${port}`);
});