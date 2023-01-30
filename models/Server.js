const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const router = require('../routes/user');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/usuarios';


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

    routes() {
        this.app.use( this.usersPath, require('../routes/user') );
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en', this.port);
        });
    };
}

module.exports = Server;