
import { Router, Request, Response } from 'express';

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