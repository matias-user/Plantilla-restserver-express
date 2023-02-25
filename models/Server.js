const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const router = require('../routes/user');
const { DBconnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/usuarios';
        this.authPath = '/api/auth';
        
        this.connectDB();    
        this.middlewares();
        this.routes();
    };
    
    middlewares(){
        this.app.use( express.static('public') );
        // CORS
        this.app.use( cors() );
        // BODY PARSE
        this.app.use( bodyParser.json() );
    };
    connectDB(){
        DBconnection();
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.usersPath, require('../routes/user') );
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en', this.port);
        });
    };
}

module.exports = Server;