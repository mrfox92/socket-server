import express from 'express';
import { SERVER_PORT } from '../global/environment';

export default class Server {

    public app: express.Application;
    public port: number;
    

    constructor() {
        //    inicializamos nuestra app con express
        this.app = express();
        //    inicializamos el puerto
        this.port = SERVER_PORT;
    }

    start() {
        this.app.listen( this.port, () => console.log(`Servidor corriendo en puerto ${ this.port }`) );
    }

}