const path = require( 'path' );
const express = require('express'); 
require('dotenv').config(); 
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear servidor de express;

const app = express(); 

//Base de datos
dbConnection(); 

//CORS
app.use(cors()); 

//Directorio Publico
app.use( express.static('public') ); 

// Lectura y parseo del body
app.use( express.json() ); 

//Rutas
//todo: auth // crear, login, renew.
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') ); 

app.use( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) ); 
});

//todo: CRUD: Eventos. 


//Escuchar peticiones
  
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
    
})
