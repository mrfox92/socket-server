
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

//    utilizamos router para crear nuestras API endpoints

const router = Router();

//    definimos nuestros endpoints que seran consumidos

router.get('/mensajes', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta OK'
    });

});

router.post('/mensajes', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    //    creamos nuestro payload
    const payload = {
        de,
        cuerpo
    };

    //    utilizamos la instancia de nuestro server para crear un objeto
    const server = Server.instance;
    //    emitimos el mensaje
    server.io.emit( 'mensaje-nuevo', payload );

    res.json({
        ok: true,
        mensaje: 'POST - Listo!',
        cuerpo,
        de
    });

});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    //    obtenemos el parametro id desde la url
    const id = req.params.id

    //    creamos nuestro payload
    const payload = {
        de,
        cuerpo
    };

    //    Aqui debemos conectar nuestro servicio REST con nuestro servicio de Sockets
    const server = Server.instance;    //    utilizamos la misma instancia de nuestro Server, mediante el patron Singleton
    //    el metodo in: nos sirve para enviar un mensaje a un usuario que se encuentre en un canal en particular
    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        mensaje: 'POST - Listo!',
        cuerpo,
        de,
        id
    });

});

//    Servicio para obtener todos los IDs de los usuarios

router.get('/usuarios', ( req: Request, res: Response ) => {

    //    obtener la sesion o los IDs de los sockets utilizamos la instancia de io que esta en nuestro server
    const server = Server.instance;

    //    barremos todos los clientes mediante la funcion de io.clients y retornamos la respuesta
    server.io.clients( ( err: any, clientes: string[] ) => {

        if ( err ) {
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        });
    });
});

//    Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) => {
    //    importamos usuariosConectados que es la instancia de mi usuariosLista
    
    usuariosConectados

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

});

//    exportamos nuestro router

export default router;