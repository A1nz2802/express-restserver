const express = require('express')
const cors = require('express');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    // Middleware
    this.middlewares();

    // Rutas de mi app
    this.routes();
  }

  middlewares() {

    // Cors
    this.app.use( cors() );

    // Lectura y parseo del boddy (cualquier información que venga del put, post, delete, etc o del boddy será parseado a json)
    this.app.use( express.json() );

    // Directorio público
    this.app.use( express.static('public') );
  }

  routes() {
    this.app.use( this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log('Servidor corriendo en puerto', this.port )
    });
  }
}

module.exports = Server;