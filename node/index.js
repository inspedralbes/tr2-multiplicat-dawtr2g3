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

let restarVidaSagnar = 1;

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
            case 2:

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

    /**
     * Envia la llista de partides
     * @param {Array} arrayRoomMinim Array que conté la informació de les partides
     */
    socket.emit('llista partides', arrayRoomMinim);

    /**
     * Entra a una partida
     * @param {string} roomID Identificador de la partida
     * @param {string} nom Nom de l'usuari que entra a la partida
     */
    socket.on('join', (roomID, nom) => {
        socket.join(roomID);
        let user = createNewUser(socket.id, nom)
        let userMinim = createUserMinim(user);

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
        io.emit('llista partides', arrayRoomMinim);
    })

    /**
     * Crea una nova partida
     * @param {string} nom Nom de la partida
     * @param {int} maxJugadors Màxim de jugadors de la partida
     * @param {string} nick Nom de l'usuari que crea la partida
     */

    socket.on('crearPartida', (nom, maxJugadors, nick) => {
        socket.join(socket.id);
        let user = createNewUser(socket.id, nick)
        let userMinim = createUserMinim(user);
        arrayRoom.push({
            "id": socket.id,
            "nom": nom,
            "maxJugadors": maxJugadors,
            "jugadors": [user],
            "arrayPreg": [],
            "preguntasMal": [],
            "start": Date.now()
        });
        arrayRoomMinim.push({
            "id": socket.id,
            "nom": nom,
            "maxJugadors": maxJugadors,
            "jugadors": [userMinim],
        })
        iniciarLobby(socket.id);
        io.to(socket.id).emit('update players', [userMinim]);
        io.emit('llista partides', arrayRoomMinim);
    })

    /**
     * Elimina el jugador de la partida i de la llista de jugadors, si és l'últim jugador de la partida o el creador, la tanca
     */
    socket.on('disconnecting', () => {
        let rooms = socket.rooms;
        let roomID;
        rooms.forEach((room) => {
            roomID = room;
        });

        if (roomID != undefined) {
            let index = arrayRoom.findIndex((room) => room.id == roomID);
            if (roomID == socket.id && index != '-1') {

                io.to(roomID).emit('lobby tencada');
                let idOrig = socket.id;
                let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
                arrayRoom.splice(index, 1);

                llistatUsuaris.forEach((user) => {
                    socket.id = user.idSocket;
                    socket.leave(roomID);
                });
                socket.id = idOrig;

                if (arrayRoomMinim.findIndex((room) => room.id == roomID) != undefined) {
                    arrayRoomMinim.splice(index, 1);
                    io.emit('llista partides', arrayRoomMinim);
                }

            } else if (index != '-1') {


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

                    let userMinim = createUserMinim(user);

                    llistatUsuarisMinim.push(userMinim);
                });

                io.to(roomID).emit('update players', llistatUsuarisMinim);
            }
        }
    });

    /**
     * Inicia la partida
     */

    socket.on('start', () => {
        let arrayPreg = arrayRoom.find((room) => room.id == socket.id).arrayPreg;
        if (arrayRoom.find(room => room.id == socket.id).jugadors.length >= 2) {
            io.to(socket.id).emit('play', arrayPreg[0]);
            let index = arrayRoomMinim.findIndex((room) => room.id == socket.id);
            arrayRoomMinim.splice(index, 1);
            io.emit('llista partides', arrayRoomMinim);
        }

    });

    /**
     * Envia el missatge a tots els usuaris de la sala
     * @param {string} missatge Missatge a enviar
     * @param {string} nick Nom de l'usuari que envia el missatge
     */

    socket.on('enviar missatge', (missatge, nick) => {
        let rooms = socket.rooms;
        let roomID;
        rooms.forEach((room) => {
            roomID = room;
        });

        let obj = {
            "nick": nick,
            "msg": missatge
        }
        io.to(roomID).emit('update chat', obj);
    });

    /**
     * Comprova si la resposta és correcta o no, i si és la última pregunta
     * @param {int} idPreg Identificador de la pregunta
     * @param {int} posResp Posició de la resposta
     */
    socket.on('answer', (idPreg, posResp) => {

        let correcte = false;
        let acabat = false;

        let rooms = socket.rooms;
        let roomID;

        rooms.forEach((room) => {
            roomID = room;
        });

        let arrayPreg = arrayRoom.find((room) => room.id == roomID).arrayPreg;
        let preguntasMal = arrayRoom.find((room) => room.id == roomID).preguntasMal;
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let start = arrayRoom.find((room) => room.id == roomID).start;
        let llistatUsuarisMinim = [];

        // encerta la pregunta
        if (arrayPreg[idPreg].respostes[posResp] == (preguntasMal[idPreg].respostes[respuestaCorrecta])) {
            correcte = true;
            llistatUsuaris.map((user) => {
                if (user.idSocket == socket.id) {
                    user.encertades++;
                    user.falladesConsecutives = 0;
                    user.preguntaActual++;
                    user.falladesConsecutives = 0;
                }

                if (user.encertades == 3) {
                    user.encertades = 0;

                    let poder = getRandomPoder(user);
                    user.poder = poder;

                }
            });

            llistatUsuaris.forEach((user) => {

                let userMinim = createUserMinim(user);
                llistatUsuarisMinim.push(userMinim);
            })

            arrayRoom.map((room) => {
                if (room.id == roomID) {
                    room.jugadors = llistatUsuaris;
                }
            });



            io.to(roomID).emit("update players", llistatUsuarisMinim)


        } else {
            let mort = false
            llistatUsuaris.map((user) => {
                if (user.idSocket == socket.id) {
                    user.vida -= 10;
                    if (user.vida <= 0) {
                        user.temps = Date.now() - start;
                        mort = true;
                    }
                    user.falladesConsecutives++;
                    if (user.falladesConsecutives == 3) {
                        user.preguntaActual++;
                        user.falladesConsecutives = 0;
                        socket.emit('tres fallades');
                        socket.emit('new question', arrayPreg[user.preguntaActual]);
                    }
                }
            });
            if (mort) {
                let userVius = jugadorsVius(llistatUsuaris);
                if (userVius.length == 1) {
                    acabat = true;
                }
            }
            llistatUsuaris.sort((a, b) => { return b.vida - a.vida });

            llistatUsuaris.forEach((user) => {

                let userMinim = createUserMinim(user);

                llistatUsuarisMinim.push(userMinim);
            })

            arrayRoom.map((room) => {
                if (room.id == roomID) {
                    room.jugadors = llistatUsuaris;
                }
            });

            io.to(roomID).emit("update players", llistatUsuarisMinim)
        }
        socket.emit('check', correcte, acabat);

        if (acabat) {
            let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
            let perdedors = llistatUsuaris.sort((a, b) => { return b.temps - a.temps });
            let guanyador = jugadorsVius(llistatUsuaris);

            perdedors.pop();

            io.to(roomID).emit('end', guanyador[0], perdedors);

            let idOrig = socket.id;
            llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
            let index = arrayRoom.findIndex((room) => room.id == roomID);
            arrayRoom.splice(index, 1);
            llistatUsuaris.forEach((user) => {
                socket.id = user.idSocket;
                socket.leave(roomID);
            });
            socket.id = idOrig;
        }
    })

    /**
     * Salta la pregunta actual si l'usuari té skips disponibles, si no, li resta vida
     */
    socket.on('skip', () => {
        let rooms = socket.rooms;
        let roomID;
        rooms.forEach((room) => {
            roomID = room;
        });
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;

        llistatUsuaris.map((user) => {
            if (user.idSocket == socket.id) {
                user.preguntaActual++;
                if (user.skip > 0) {
                    user.skip--;
                } else {
                    user.vida -= -10 * user.falladesConsecutives + 30;
                }
                user.falladesConsecutives = 0;
            }
        });
        let user = llistatUsuaris.find((usuari) => {
            return usuari.idSocket == socket.id;
        });
        arrayRoom.map((room) => {
            if (room.id == roomID) {
                room.jugadors = llistatUsuaris;
            }
        });
        let llistatUsuarisMinim = [];
        llistatUsuaris.forEach((user) => {

            let userMinim = createUserMinim(user);

            llistatUsuarisMinim.push(userMinim);
        })
        io.to(roomID).emit("update players", llistatUsuarisMinim)
        socket.emit('new question', arrayRoom.find((room) => room.id == roomID).arrayPreg[user.preguntaActual]);
    });

    /**
     * Envia la pregunta actual a l'usuari
     */
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

    socket.on('utilitzar poder', (poder, objectiu) => {
        let rooms = socket.rooms;
        let roomID;
        rooms.forEach((room) => {
            roomID = room;
        });
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let user = llistatUsuaris.find((usuari) => {
            return usuari.idSocket == socket.id;
        });
        let userObjectiu = llistatUsuaris.find((usuari) => {
            return usuari.idSocket == objectiu;
        });
        switch (poder) {
            case "salt":
                utilitzarPoderSalt(user, userObjectiu, roomID);

                break;
            case "vida":
                utilizarPoderVida(user, userObjectiu, roomID);
                break;
            case "escut":
                utilitzarPoderEscut(user, userObjectiu, roomID);
                break;
            default:
                break;
        }
        user.poder = "";
        let llistatUsuarisMinim = [];
        llistatUsuaris.forEach((user) => {

            let userMinim = createUserMinim(user);

            llistatUsuarisMinim.push(userMinim);
        })
        io.to(roomID).emit("update players", llistatUsuarisMinim)
    })

    socket.on('sagnar vida', () => {
        let rooms = socket.rooms;
        let roomID;
        rooms.forEach((room) => {
            roomID = room;
        });
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let user = llistatUsuaris.find((usuari) => {
            return usuari.idSocket == socket.id;
        });
        user.vida -= restarVidaSagnar;
        let llistatUsuarisMinim = [];
        llistatUsuaris.forEach((user) => {

            let userMinim = createUserMinim(user);

            llistatUsuarisMinim.push(userMinim);
        })
        io.to(roomID).emit("update players", llistatUsuarisMinim)
    })


})

/**
 * et dona un poder aleatori
 * @param {obj} user l'usuari i per conseqüencia el quadrant al qual es troba, per saber quin poder donar-li
 * @returns el poder que li ha tocat
 */
function getRandomPoder(user) {
    let random = Math.floor(Math.random() * 3) + 1;
    let poder = "";
    switch (random) {
        case 1:
            poder = "salt";
            break;
        case 2:
            poder = "vida";
            break;
        case 3:
            poder = "escut";
            break;
        default:
            break;
    }
    return poder;
}

/**
 * Utilitza el poder d'aconseguir un salt
 * @param {obj} user l'usuari que utilitza el poder
 * @param {obj} userObjectiu l'usuari que rep el poder
 * @param {int} roomID identificador de la sala
 */

function utilitzarPoderSalt(user, userObjectiu, roomID) {
    user.skip++;
}

/**
 * Utilitza el poder de recuperar vida
 * @param {obj} user l'usuari que utilitza el poder
 * @param {obj} userObjectiu l'usuari que rep el poder
 * @param {int} roomID identificador de la sala
 */

function utilizarPoderVida(user, userObjectiu, roomID) {
    userObjectiu.vida += 20;
    if (userObjectiu.vida > 100) {
        userObjectiu.vida = 100;
    }
}

/**
 * Utilitza el poder escut
 * @param {obj} user l'usuari que utilitza el poder
 * @param {obj} userObjectiu l'usuari que rep el poder
 * @param {int} roomID identificador de la sala
 */

function utilitzarPoderEscut(user, userObjectiu, roomID) {
    userObjectiu.escut = true;
}

/**
 * Crea un usuari
 * @param {int} idSocket Identificador del socket
 * @param {string} nick nom del jugador
 * @returns Objecte que conté la informació de l'usuari
 */
function createNewUser(idSocket, nick) {
    let user = {
        "idSocket": idSocket,
        "nick": nick,
        "preguntaActual": 0,
        "encertades": 0,
        "vida": 100,
        "skip": 1,
        "temps": 0, //Es posa el temps quan mor el jugador, de base sera 0
        "falladesConsecutives": 0,
        "poder": "",
        "infoPoders": {
            "escut": false,
            "robarVida": false,

        }
    }
    return user;
}

/**
 * Crear un usuari reduït
 * @param {obj} user Objecte que conté la informació de l'usuari
 * @returns Objecte que conté la informació de l'usuari reduïda
 */
function createUserMinim(user) {
    let userMinim = {
        "idSocket": user.idSocket,
        "nick": user.nick,
        "encertades": user.encertades,
        "vida": user.vida,
        "skip": user.skip,
        "falladesConsecutives": user.falladesConsecutives,
        "poder": user.poder,
        "infoPoders": {
            "escut": user.infoPoders.escut,
            "robarVida": user.infoPoders.robarVida,
        }

    }
    return userMinim;
}

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
        "temps": preguntaaModificar.temps,
        "unitats": {
            "valorInicial": 0,
            "unitatInicial": "",
            "unitatFinal": ""
        }


    }
    return bien;
}


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

function jugadorsVius(arrayJugadors) {
    let jugadorsVius = [];
    arrayJugadors.forEach((jugador) => {
        if (jugador.vida > 0) {
            jugadorsVius.push(jugador);
        }
    });
    return jugadorsVius;
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