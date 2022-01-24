//primero las importaciones de paquetes de terceros
require('dotenv').config();

//luego las importaciones de paquetes de node (http o fs)

//por ultimo las importaciones creadas por nosotros
const Server = require('./models/server');


// el server de express se genera creando una instancia de la clase Server
const server = new Server();
server.listen();

