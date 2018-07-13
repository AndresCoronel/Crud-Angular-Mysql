const express = require('express');
const app = express();

const morgan = require ('morgan');
const bodyParser = require('body-parser');

//setings
app.set('port', process.env.PORT || 3000 );

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes

require('./routes/routes')(app);

//static filess
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
  });