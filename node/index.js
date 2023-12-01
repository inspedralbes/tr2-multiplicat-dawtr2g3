import express from 'express';
import { data } from "./preguntes.js";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';


const app = express()
const port = 3000
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

const respuestaCorrecta = 0
let preguntasMal = data;
let pregunta = {};

let arrayPreg = [];


randomArray(preguntasMal);

preguntasMal.forEach((preguntaMal, index) => {
    switch (preguntaMal.tipus) {
        case 1:

            pregunta = tipusTest(preguntaMal, index);
            arrayPreg.push(pregunta);
            break;

        default:
            break;
    }
})

let llistatUsuaris = [];


io.on('connection', (socket) => {
    console.log('hola');
    socket.on('join', (nom) => {
        let user = {
            "idSocket": socket.id,
            "nick": nom,
            "preguntaActual": 0,
            "encertades": 0
        }
        llistatUsuaris.push(user);
        let llistatUsuarisMinim = [];

        llistatUsuaris.forEach((user) => {

            let userMinim = {
                "nick": user.nick,
                "encertades": user.encertades

            }

            llistatUsuarisMinim.push(userMinim);
        })

        io.emit('update players', llistatUsuarisMinim);
        if (llistatUsuaris.length == 2) {
            io.emit('play', arrayPreg[0]);
        }
    })

    socket.on('answer', (idPreg, posResp) => {

        let correcte = false;
        let acabat = false;

        if (arrayPreg[idPreg].parametres.respostes[posResp].contains(preguntasMal[idPreg].respuestas[respuestaCorrecta])) {
            correcte = true;


            if (posResp == arrayPreg.length - 1) {
                acabat = true;
            }

            let llistatUsuarisMinim = [];

            user = llistatUsuaris.find((usuari) => {
                return usuari.idSocket == socket.id;
            });

            user.encertades++;
            user.preguntaActual++;

            llistatUsuaris.forEach((user) => {

                let userMinim = {
                    "nick": user.nick,
                    "encertades": user.encertades
                }

                llistatUsuarisMinim.push(userMinim);
            })

            io.emit("update players", llistatUsuarisMinim)

            if (acabat) {
                io.emit('end');
            }
            socket.emit('check', correcte, acabat);
        }
    })

    socket.on('send',()=>{
        user = llistatUsuaris.find((usuari) => {
            return usuari.idSocket == socket.id;
        });

        socket.emit('new question', arrayPreg[user.preguntaActual]);
    })

})


function tipusTest(preguntaaModificar, index) {
    let bien = {

        "idPregunta": index,
        "pregunta": preguntaaModificar.enunciat,
        "categoria": preguntaaModificar.categoria,
        "tipus": preguntaaModificar.tipus,
        "parametres": {
            "respostes": preguntaaModificar.respuestas,
            "unitats": {
                "valorInicial": 0,
                "unitatInicial": "",
                "unitatFinal": ""
            }

        }
    }
    return bien;
}
console.log(arrayPreg);


/**
 * Aleatoritza l'ordre d'un array
 * @param {Array} array 
 */
function randomArray(array) {

    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

}
// fetch no funcional

// const conect = 'http://jsonestatic.daw.inspedralbes.cat/data.json'
// let preguntas = getPreguntes();
// function  getPreguntes() {
//     fetch(conect)
//     .then((response) => response.json())
//     .then((jsonData) => {
//         return jsonData;
//     });
// }


//coneccio a la base de dades
/*function conectarBBDD() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: 'probanode'
    });

    return con
}


function tancarBBDD(con) {
    con.end();
    return 1;
}

function mostrarPreguntas() {
    
}
//Veura la informacio de la base de dades
app.get('/', (req, res) => {
    connexio = conectarBBDD();
    
    connexio.connect(function (err) {
        if (err) throw err;
        connexio.query("SELECT * FROM probanode", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            tancarBBDD(connexio);
          });
    });
});*/


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})