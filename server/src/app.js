const express = require('express');
const app = express();

//setings
app.set('port', process.env.PORT || 3000 );
app.listen(app.get('port'),()=> {
    console.log('server on port 3000')
}
 );