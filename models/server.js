
const express = require('express');
const cors = require( 'cors' )

//la funcion express() crea una aplicación de express
class Server {
    constructor(){
        //cada que se hace una instancia de la clase Server se crea una aplicación de express
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user'
        //Middlewares (funciones que se ejecutan siempre que se levanta el servidor)

        this.middleWares();

        //se agrega el metodo routes en el constructor con la finalidad que luego de disparar el constructor se creen las rutas
        this.routes();
    }

    middleWares(){
        //el uso de la funcion use() le indica a express que se está creando un middleware


        // CORS
        this.app.use(cors());

        // lectura y Parseo del body
        this.app.use( express.json() );
        //Directorio Público
        this.app.use( express.static('public'));

    }

    routes(){

//midleware condicional
        this.app.use(this.userPath, require('../routes/user'));

    }

    listen(){
        this.app.listen(this.port , () => {
            console.log('Servidor corriendo en puerto', this.port );
        })
    }
}
module.exports = Server;