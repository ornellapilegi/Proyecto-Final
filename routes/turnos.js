var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function (req, res, next) {
    res.render('turnos', {
        isTurnos: true
    });

});

router.post('/', async function (req, res, next) {
    // console.log(req.body);
    var nombre = req.body.nombre;
    var email = req.body.email;
    var numero = req.body.numero;
    var comentario = req.body.consulta;


    var obj = {
        to: 'patitaspeludas@gmail.com',
        subject: 'Contacto',
        html: nombre + ' se contacto a traves de la web y quiere saber más info a este correo: ' + email + '.<br> Su telefono de contacto es ' + numero + '.<br> y su comentario es: ' + comentario + '.'
    }
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    var info = await transport.sendMail(obj);

    res.render('turnos', {
        message: 'Mensaje enviado correctamente'
    })

});


module.exports = router;