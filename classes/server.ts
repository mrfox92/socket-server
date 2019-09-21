import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {

    /* 
        Declaramos una propiedad de llamada _instance de tipo Server, la cual la utilizaremos dentro de un metodo estatico
        para  poder llamarla desde fuera de la clase como una unica instancia de nuestra clase Server y asi evitar
        posibles problemas de duplicidad en la conexion de nuestros sockets.
    */

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    //    configuramos la conexion de los sockets. Esta es la propiedad encargada de emitir evento y escuchar
    public io: socketIO.Server;
    //    utilizamos la propiedad http como intermediario para comunicar node con express y sockets
    private httpServer: http.Server;

    //    ponemos en privado el constructor para poder trabajar nuestra clase Server bajo patron Singleton

    private constructor() {
        //    inicializamos nuestra app con express
        this.app = express();
        //    inicializamos el puerto
        this.port = SERVER_PORT;
        //    inicializamos la propiedad httpServer, necesaria para trabajar con sockets, le pasamos como argumento la configuracion actual de nuestra app en express
        this.httpServer = new http.Server( this.app );
        //    configuramos io para trabajar con sockets
        this.io = socketIO( this.httpServer );
        //    disparamos nuestro metodo para escuchar sockets
        this.escucharSockets();
    }

    //    un metodo estatico me permite invocar metodos haciendo referencia directa a la clase
    //    este metodo me permitira retornar el contenido de la propiedad _instance, la cual es una instancia de mi clase Server
    //    si se ejecuta por primera vez, entonces creara la nueva instancia de la clase, caso contrario retorna el contenido de esa instancia de mi clase
    public static get instance() {
        return this._instance    || ( this._instance = new this() );
    }


    private escucharSockets() {

        console.log('Escuchando conexiones - Sockets');

        this.io.on('connection', cliente => {

            //    Conectar Cliente
            socket.conectarCliente( cliente, this.io );

            //    Configurar Usuario
            socket.configurarUsuario( cliente, this.io );

            //    Obtener usuarios
            socket.obtenerUsuarios( cliente, this.io );

            //    Mensajes
            socket.mensaje( cliente, this.io );

            //    Desconectar
            socket.desconectar( cliente, this.io );

        });

    }

    start() {
        //    ahora en vez de inicializar la app con express, inicializamos httpServer
        this.httpServer.listen( this.port, () => console.log(`Servidor corriendo en puerto ${ this.port }`) );
    }

}