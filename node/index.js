import express from 'express';
import { fetchPreguntas } from "./preguntes.js";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express()
const port = 3000
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: ["Access-Control-Allow-Origin"],
    }
});
const data = await fetchPreguntas();
const respuestaCorrecta = 0
let preguntasMal = data;
let pregunta = {};

let arrayPreg = [];


randomArray(preguntasMal);
function iniciarArrayPreg() {
    preguntasMal.forEach((preguntaMal, index) => {
        switch (preguntaMal.tipus) {
            case 1:

                let pregunta = tipusTest(preguntaMal, index);
                let arrayResp = '['+pregunta.respostes+']';
                pregunta.respostes = JSON.parse(arrayResp);
                preguntasMal[index].respostes = JSON.parse(arrayResp);
                // console.log(pregunta.respostes);
                arrayPreg.push(pregunta);
                break;

            default:
                break;
        }
    })

}
iniciarArrayPreg();

let llistatUsuaris = [];


io.on('connection', (socket) => {
    console.log('hola');
    socket.on('join', (nom) => {
        // console.log(nom);
        let user = {
            "idSocket": socket.id,
            "nick": nom,
            "preguntaActual": 0,
            "encertades": 0
        }
        llistatUsuaris.push(user);
        // console.log(llistatUsuaris);
        let llistatUsuarisMinim = [];

        llistatUsuaris.forEach((user) => {

            let userMinim = {
                "nick": user.nick,
                "encertades": user.encertades

            }

            llistatUsuarisMinim.push(userMinim);
        })

        io.emit('update players', llistatUsuarisMinim);
        
    })
    socket.on('disconnect', () => {
        // console.log("adeu");
        const disconnectedUser = llistatUsuaris.find((user) => user.idSocket === socket.id);
        if (disconnectedUser) {
            const index = llistatUsuaris.indexOf(disconnectedUser);
            llistatUsuaris.splice(index, 1);
            // console.log(llistatUsuaris);
        }
        io.emit('update players', llistatUsuaris);
    });
    socket.on('start', () => {
        if (llistatUsuaris.length >= 2) {
            io.emit('play', arrayPreg[0]);
        }
    });
    socket.on('answer', (idPreg, posResp) => {

        let correcte = false;
        let acabat = false;
        // console.log(preguntasMal[idPreg].respostes[respuestaCorrecta]);
        if (arrayPreg[idPreg].respostes[posResp] == (preguntasMal[idPreg].respostes[respuestaCorrecta])) {
            correcte = true;

            if (idPreg == arrayPreg.length - 1) {
                acabat = true;
            }

            let llistatUsuarisMinim = [];

            let user = llistatUsuaris.find((usuari) => {
                return usuari.idSocket == socket.id;
            });
            user.encertades++;
            user.preguntaActual++;

            llistatUsuaris.sort((a, b) => { return b.preguntaActual - a.preguntaActual });

            console.log(llistatUsuaris);

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
                function resetearDatos() {
                    preguntasMal = data;
                    pregunta = {};
                    arrayPreg = [];
                    randomArray(preguntasMal);
                    llistatUsuaris = [];
                }
                resetearDatos();
                iniciarArrayPreg();

            }
        }
        socket.emit('check', correcte, acabat);
    })

    socket.on('send', () => {
        let user = llistatUsuaris.find((usuari) => {
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
        "respostes": JSON.parse('['+preguntaaModificar.respostes+']'),
        "unitats": {
            "valorInicial": 0,
            "unitatInicial": "",
            "unitatFinal": ""
        }


    }
    return bien;
}
// console.log(arrayPreg);


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


server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})