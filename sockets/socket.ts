import { Socket } from 'socket.io';
import socketIO from 'socket.io';

/* 
    aqui creamos la configuracion y las opciones de cada una de las acciones que seran
    disparadas desde la clase server, con el objetivo de tener aqui la logica mas centralizada,
    para asi tener un codigo mas mantenible y escalable.
*/


export const desconectar = ( cliente: Socket ) => {
    
    cliente.on('disconnect', () => {

        console.log('Cliente desconectado');
    });
}


//    Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    //    escuchamos el evento mensaje
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log('Mensaje recibido', payload );

        //    emitir mensajes a todos los usuarios conectados a nuestra aplicacion
        io.emit('mensaje-nuevo', payload );

    });
}