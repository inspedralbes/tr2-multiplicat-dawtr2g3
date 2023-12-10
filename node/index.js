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
const respuestaCorrecta = 0

let arrayRoom = [];
let arrayRoomMinim = [];
async function iniciarLobby(roomID) {
    const data = await fetchPreguntas();
    let preguntasMal = data;
    randomArray(preguntasMal);
    let arrayPreg = [];
    preguntasMal.forEach((preguntaMal, index) => {
        switch (preguntaMal.tipus) {
            case 1:

                let pregunta = tipusTest(preguntaMal, index);

                let arrayResp = '[' + pregunta.respostes + ']';
                preguntasMal[index].respostes = JSON.parse(arrayResp);
                pregunta.respostes = randomArray(JSON.parse(arrayResp));
                arrayPreg.push(pregunta);
                break;

            default:
                break;
        }
    })
    arrayRoom.map((room) => {
        if (room.id == roomID) {
            room.arrayPreg = arrayPreg;
            room.preguntasMal = preguntasMal;
        }
    });



}

let llistatUsuaris = [];


io.on('connection', (socket) => {
    socket.emit('llista partides', arrayRoomMinim);
    socket.on('join', (roomID, nom) => {
        socket.join(roomID);
        console.log(roomID);
        let user = {
            "idSocket": socket.id,
            "nick": nom,
            "preguntaActual": 0,
            "encertades": 0
        }
        let userMinim = {
            "idSocket": user.idSocket,
            "nick": user.nick,
            "encertades": user.encertades
        };

        arrayRoom.map((room) => {
            if (room.id == roomID) {
                room.jugadors.push(user);
            }
        });

        arrayRoomMinim.map((room) => {
            if (room.id == roomID) {
                room.jugadors.push(userMinim);
            }
        });

        let jugadorsMinim = arrayRoomMinim.find((room) => room.id == roomID).jugadors;
        io.to(roomID).emit('update players', jugadorsMinim);

    })

    socket.on('crearPartida', (nom, maxJugadors, nick) => {
        socket.join(socket.id);
        console.log(socket.id);
        let user = {
            "idSocket": socket.id,
            "nick": nick,
            "preguntaActual": 0,
            "encertades": 0
        }
        let userMinim = {
            "idSocket": socket.id,
            "nick": user.nick,
            "encertades": user.encertades
        };
        arrayRoom.push({
            "id": socket.id,
            "nom": nom,
            "maxJugadors": maxJugadors,
            "jugadors": [user],
            "arrayPreg": [],
            "preguntasMal": [],
        });
        arrayRoomMinim.push({
            "id": socket.id,
            "nom": nom,
            "maxJugadors": maxJugadors,
            "jugadors": [userMinim],
        })
        iniciarLobby(socket.id);
        io.emit('llista partides', arrayRoomMinim);
    })

    socket.on('disconnecting', () => {
        let rooms = socket.rooms;
        let roomID;
        rooms.forEach((room) => {
            roomID = room;
        });

        if (roomID != undefined) {
            arrayRoom.map((room) => {
                if (room.id == roomID) {
                    let index = room.jugadors.findIndex((idSocket) => idSocket == socket.id);
                    room.jugadors.splice(index, 1);
                }
            });
            if (arrayRoomMinim.find((room) => room.id == roomID) != undefined) {
                arrayRoomMinim.map((room) => {
                    if (room.id == roomID) {
                        let index = room.jugadors.findIndex((idSocket) => idSocket == socket.id);
                        room.jugadors.splice(index, 1);
                    }
                });
                io.emit('llista partides', arrayRoomMinim);
            }
            let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
            let llistatUsuarisMinim = [];
            llistatUsuaris.forEach((user) => {

                let userMinim = {
                    "nick": user.nick,
                    "encertades": user.encertades
                }

                llistatUsuarisMinim.push(userMinim);
            });

            io.to(roomID).emit('update players', llistatUsuarisMinim);
        }
    });

    socket.on('start', () => {
        let arrayPreg = arrayRoom.find((room) => room.id == socket.id).arrayPreg;
        if (arrayRoom.find(room => room.id == socket.id).jugadors.length >= 2) {
            io.to(socket.id).emit('play', arrayPreg[0]);
        }
        let index = arrayRoomMinim.findIndex((room) => room.id == socket.id);
        arrayRoomMinim.splice(index, 1);
        io.emit('llista partides', arrayRoomMinim);

    });

    socket.on('enviar missatge', (missatge, nick) => {
        let rooms = socket.rooms;
        let roomID;
        rooms.forEach((room) => {
            roomID = room;
        });
        console.log(roomID);

        let obj = {
            "nick": nick,
            "msg": missatge
        }
        io.to(roomID).emit('update chat', obj);
    });
    socket.on('answer', (idPreg, posResp) => {

        let correcte = false;
        let acabat = false;
        // console.log(preguntasMal[idPreg].respostes[respuestaCorrecta]);
        let rooms = socket.rooms;
        let roomID;
        rooms.forEach((room) => {
            roomID = room;
        });
        let arrayPreg = arrayRoom.find((room) => room.id == roomID).arrayPreg;
        let preguntasMal = arrayRoom.find((room) => room.id == roomID).preguntasMal;
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let llistatUsuarisMinim = [];
        if (arrayPreg[idPreg].respostes[posResp] == (preguntasMal[idPreg].respostes[respuestaCorrecta])) {
            correcte = true;

            if (idPreg == arrayPreg.length - 1) {
                acabat = true;
            }

            llistatUsuaris.map((user) => {
                if (user.idSocket == socket.id) {
                    user.encertades++;
                    user.preguntaActual++;
                }
            });



            llistatUsuaris.sort((a, b) => { return b.preguntaActual - a.preguntaActual });

            console.log(llistatUsuaris);

            llistatUsuaris.forEach((user) => {

                let userMinim = {
                    "nick": user.nick,
                    "encertades": user.encertades
                }

                llistatUsuarisMinim.push(userMinim);
            })

            arrayRoom.map((room) => {
                if (room.id == roomID) {
                    room.jugadors = llistatUsuaris;
                }
            });



            io.to(roomID).emit("update players", llistatUsuarisMinim)


        }
        socket.emit('check', correcte);
        if (acabat) {
            io.to(roomID).emit('end');
        }
    })

    socket.on('send', () => {
        let rooms = socket.rooms;
        let roomID;
        rooms.forEach((room) => {
            roomID = room;
        });
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let arrayPreg = arrayRoom.find((room) => room.id == roomID).arrayPreg;
        let user = llistatUsuaris.find((usuari) => {
            return usuari.idSocket == socket.id;
        });

        socket.emit('new question', arrayPreg[user.preguntaActual]);
    })


})

/**
 * Formata la pregunta per a que sigui correctament llegida per el client
 * @param {object} preguntaaModificar objecte que conté la pregunta a modificar
 * @param {int} index 
 * @returns  la pregunta formatada correctament
 */
function tipusTest(preguntaaModificar, index) {
    let bien = {

        "idPregunta": index,
        "pregunta": preguntaaModificar.enunciat,
        "categoria": preguntaaModificar.categoria,
        "tipus": preguntaaModificar.tipus,
        "respostes": JSON.parse('[' + preguntaaModificar.respostes + ']'),
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
    return array;

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