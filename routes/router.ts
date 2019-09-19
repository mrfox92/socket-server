
import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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

    //    emitimos el mensaje
    const server = Server.instance;
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

//    exportamos nuestro router

export default router;