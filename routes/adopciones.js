var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function (req,res,next) {
    res.render('adopciones',{
        isAdopciones: true
    });

});

router.post('/', async function (req,res,next) {
    // console.log(req.body);

    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var email = req.body.email;
    var celular = req.body.celular;
    var direccion = req.body.direccion;
    var ciudad = req.body.ciudad;
    var barrio = req.body.barrio;
    var cp = req.body.cp;
    var vivienda = req.body.vivienda;
    var mascotas = req.body.mascotas;
    var adopcion = req.body.adopcion;
    var comentario = req.body.comentario;


    var obj={
        to: 'patitaspeludas@gmail.com',
        subject: 'Contacto',
        html: nombre + ' ' + apellido + ' acaba de completar la solicitud de adopción. Su mail es ' + email + '.' + ' Su celular es ' + celular + '. Quien esta viviendo en ' + direccion + ', en el barrio de '+ barrio + ', en la ciudad de ' + ciudad + ', con codigo postal ' + cp + ' y vive en un/a ' + vivienda + '.<br> Tiene ' + mascotas + ' mascotas. ' + ' Y esta interesado/a por ' + adopcion + '.<br> Dejo el siguiente comentario ' + comentario + '.'
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

      res.render('adopciones');

});

module.exports = router;