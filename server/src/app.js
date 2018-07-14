const express = require('express');
const cors = require('cors');
const app = express();


const morgan = require ('morgan');
const bodyParser = require('body-parser');

//setings
app.set('port', process.env.PORT || 3000 );

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200' }))

//routes

require('./routes/routes')(app);

//static filess
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
  });