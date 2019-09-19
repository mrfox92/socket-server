import { Usuario } from './usuario';

/* 
Centralizamos la logica de todos mis usuarios. Procesos para agregar, procesos para mandar un mensaje
en particular, etc.
 */
export class UsuariosLista {
    
    private lista: Usuario[] = [];

    constructor() {  }

    //    Agregar un usuario
    public agregar( usuario: Usuario ) {

        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;
    }

    public actualizarNombre( id: string, nombre: string ) {

        for ( let usuario of this.lista ) {
            
            if ( usuario.id === id ) {
                //    editamos nombre usuario
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('========== Actualizando usuario ===========');
        console.log( this.lista );
    }

    //    Obtener lista de usuarios
    public getLista() {
        return this.lista;
    }

    //    Obtener un usuario de la lista a partir de su ID
    public getUsuario( id: string ) {
        return this.lista.find( usuario => usuario.id === id );
    }

    //    Obtener usuarios en una sala en particular
    public getUsuariosEnSala( sala: string ) {

        return this.lista.filter( usuario => usuario.sala === sala );
    }

    //    Borrar usuario
    public borrarUsuario( id: string ) {
        //    buscamos el usuario por su id
        const tempUsuario = this.getUsuario( id );
        //    eliminamos el usuario de la lista
        this.lista = this.lista.filter( usuario => usuario.id !== id );
        //    retornamos la data del usuario eliminado
        return tempUsuario;
    }


}
