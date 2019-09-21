import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

/* 
    aqui creamos la configuracion y las opciones de cada una de las acciones que seran
    disparadas desde la clase server, con el objetivo de tener aqui la logica mas centralizada,
    para asi tener un codigo mas mantenible y escalable.
*/

//    instancia para manejar nuestros usuarios conectados mediante el patron singleton
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {

    //    creamos un nuevo usuario
    const usuario = new Usuario( cliente.id );
    //    agregamos el usuario conectado a la lista
    usuariosConectados.agregar( usuario );
}


export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {
    
    cliente.on('disconnect', () => {

        console.log('Cliente desconectado');
        //    llamamos el metodo borrar para eliminar el cliente de la lista
        usuariosConectados.borrarUsuario( cliente.id );
        //    emitimos a los usuarios activos la lista de usuarios conectados
        io.emit( 'usuarios-activos', usuariosConectados.getLista() );
    });
}


//    Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    //    escuchamos el evento mensaje
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log('Mensaje recibido', payload );

        //    emitir mensajes a todos los usuarios conectados a nuestra aplicacion
        io.emit('mensaje-nuevo', payload );

        //    emitimos mensaje privado

    });
}

//    Escuchar configurar-usuario

export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    //    escuchamos el evento configurar-usuario
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        //    llamamos al metodo para actualizar nombre de usuario
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        //    emitimos a los usuarios activos la lista de usuarios conectados
        io.emit( 'usuarios-activos', usuariosConectados.getLista() );

        //    llamamos al callback
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre } configurado`
        });
    });
}

//    Obtener Usuarios: Escuchar por emision de obtenerUsuarios del lado de Angular
//    Se debe escuchar el evento y emitir la lista
//    emitir unicamente al usuario que lo esta solicitando

export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {

    //    escuchamos el evento obtener-usuarios
    cliente.on('obtener-usuarios', () => {

        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getLista() );
    });
}