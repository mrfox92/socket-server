import Server from './classes/server';
import router from './routes/router';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';


//    inicializamos nuestro servidor
const server = Server.instance;

//    configuramos nuestro body parser para transformar la data que viene desde los formularios a un objeto javascript para trabajarlo del lado de node
server.app.use( bodyParser.urlencoded( { extended: true }) );
server.app.use( bodyParser.json() );

//    CORS: configuramos el cors para no tener problemas de cross domain
server.app.use( cors({ origin: true, credentials: true }) );

//    rutas de servicios
server.app.use('/', router );

server.start();