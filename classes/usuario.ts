
export class Usuario {

    public id: string;    //    id del socket que se esta conectando
    public nombre: string;
    public sala: string;    //    un usuario puede estar presente en una o muchas salas

    constructor( id: string ) {
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
}