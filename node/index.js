import express from 'express';
import { fetchPreguntas } from "./preguntes.js";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
const preguntasDuelo = [
    {
        "idPregunta": 0,
        "pregunta": "Quant és 1500 mil·lilitres en litres?",
        "categoria": 1,
        "tipus": 0,

        "respostes": [
            "1.5 L",
            "2.5 L",
            "3.5 L",
            "5 L"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null
        }

    },
    {
        "idPregunta": 1,
        "pregunta": "Quant és 4 quilòmetres en metres?",
        "categoria": 1,
        "tipus": 0,


        "respostes": [
            "4000 m",
            "5000 m",
            "6000 m",
            "7000 m"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null
        }

    },
    {
        "idPregunta": 2,
        "pregunta": "Quants grams són 0.5 quilograms?",
        "categoria": 2,
        "tipus": 0,


        "respostes": [
            "500 g",
            "750 g",
            "1000 g",
            "1250 g"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null
        }

    },
    {
        "idPregunta": 3,
        "pregunta": "Quina és l'àrea d'un cercle amb radi de 2 centímetres?",
        "categoria": 3,
        "tipus": 0,


        "respostes": [
            "4π cm²",
            "8π cm²",
            "12π cm²",
            "16π cm²"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null
        }

    },
    {
        "idPregunta": 4,
        "pregunta": "Quant temps es tarda en recórrer 60 km si la velocitat és de 30 km/h?",
        "categoria": 4,
        "tipus": 0,


        "respostes": [
            "2 h",
            "3 h",
            "4 h",
            "5 h"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null
        }

    },
    {
        "idPregunta": 5,
        "pregunta": "Quants mil·lilitres hi ha en 0.75 litres?",
        "categoria": 1,
        "tipus": 0,


        "respostes": [
            "750 mL",
            "1000 mL",
            "1250 mL",
            "1500 mL"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null
        }

    },
    {
        "idPregunta": 6,
        "pregunta": "Quant és 5.5 quilòmetres en metres?",
        "categoria": 1,
        "tipus": 0,


        "respostes": [
            "5500 m",
            "6000 m",
            "6500 m",
            "7000 m"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null
        }

    },
    {
        "idPregunta": 7,
        "pregunta": "Quants grams són 1.2 quilograms?",
        "categoria": 2,
        "tipus": 0,


        "respostes": [
            "1200 g",
            "1400 g",
            "1600 g",
            "1800 g"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null
        }

    },
    {
        "idPregunta": 8,
        "pregunta": "Quina és l'àrea d'un quadrat amb costat de 3 centímetres?",
        "categoria": 3,
        "tipus": 0,


        "respostes": [
            "9 cm²",
            "12 cm²",
            "15 cm²",
            "18 cm²"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null

        }
    },
    {
        "idPregunta": 9,
        "pregunta": "Quant temps es tarda en recórrer 80 km si la velocitat és de 40 km/h?",
        "categoria": 4,
        "tipus": 0,


        "respostes": [
            "2 h",
            "3 h",
            "4 h",
            "5 h"
        ],
        "unitats": {
            "valorInicial": null,
            "unitatInicial": null,
            "unitatFinal": null

        }
    }
]
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
    socket.emit('games list', arrayRoomMinim);

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
        socket.emit('info partida', arrayRoom.find((room) => room.id == roomID).nom, arrayRoom.find((room) => room.id == roomID).maxJugadors);
        let jugadorsMinim = arrayRoomMinim.find((room) => room.id == roomID).jugadors;
        io.to(roomID).emit('update players', jugadorsMinim);
        io.emit('games list', arrayRoomMinim);
    })

    /**
     * Crea una nova partida
     * @param {string} nom Nom de la partida
     * @param {int} maxJugadors Màxim de jugadors de la partida
     * @param {string} nick Nom de l'usuari que crea la partida
     */

    socket.on('create game', (nom, maxJugadors, nick) => {
        let roomID = "Partida" + socket.id;
        socket.join(roomID);
        let user = createNewUser(socket.id, nick)
        let userMinim = createUserMinim(user);
        arrayRoom.push({
            "id": roomID,
            "nom": nom,
            "maxJugadors": maxJugadors,
            "jugadors": [user],
            "arrayPreg": [],
            "preguntasMal": [],
            "start": 0
        });
        arrayRoomMinim.push({
            "id": roomID,
            "nom": nom,
            "maxJugadors": maxJugadors,
            "jugadors": [userMinim],
        })
        iniciarLobby(roomID);
        io.to(socket.id).emit('update players', [userMinim]);
        socket.emit('info partida', arrayRoom.find((room) => room.id == roomID).nom, arrayRoom.find((room) => room.id == roomID).maxJugadors);
        io.emit('games list', arrayRoomMinim);
    })

    /**
     * Elimina el jugador de la partida i de la llista de jugadors, si és l'últim jugador de la partida o el creador, la tanca
     */
    socket.on('disconnecting', () => {
        const roomID = trobarRoom(socket);
        console.log(socket.id);
        if (roomID != undefined) {
            let index = arrayRoom.findIndex((room) => room.id == roomID);
            if (roomID == "Partida" + socket.id && index != '-1') {

                io.to(roomID).emit('closed lobby');
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
                    io.emit('games list', arrayRoomMinim);
                }

            } else if (index != '-1') {

                console.log("me voy aqui");
                let room = arrayRoom.find((room) => room.id == roomID);
                let llistatUsuaris = room.jugadors;

                let index = llistatUsuaris.findIndex((user) => user.idSocket == socket.id);
                console.log(index);
                llistatUsuaris.splice(index, 1);
                console.log(arrayRoom.find((room) => room.id == roomID).jugadors);

                if (arrayRoomMinim.find((room) => room.id == roomID) != undefined) {
                    arrayRoomMinim.map((room) => {
                        if (room.id == roomID) {
                            let index = room.jugadors.findIndex((idSocket) => idSocket == socket.id);
                            room.jugadors.splice(index, 1);
                        }
                    });
                    io.emit('games list', arrayRoomMinim);
                }
                arrayRoom.map((room) => {

                    if (room.id == roomID) {
                        room.jugadors = llistatUsuaris;
                    }
                });

                llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
                let llistatUsuarisMinim = [];
                llistatUsuarisMinim = llistaMinim(llistatUsuaris);

                io.to(roomID).emit('update players', llistatUsuarisMinim);
            }
        }
    });

    /**
     * Inicia la partida
     */

    socket.on('start', () => {
        let roomID = trobarRoom(socket);
        let arrayPreg = arrayRoom.find((room) => room.id == roomID).arrayPreg;
        arrayRoom.start = Date.now();
        if (arrayRoom.find(room => room.id == roomID).jugadors.length >= 2) {
            io.to(roomID).emit('play', arrayPreg[0]);
            let index = arrayRoomMinim.findIndex((room) => room.id == roomID);
            arrayRoomMinim.splice(index, 1);
            io.emit('games list', arrayRoomMinim);
        }

    });

    /**
     * Envia el missatge a tots els usuaris de la sala
     * @param {string} missatge Missatge a enviar
     * @param {string} nick Nom de l'usuari que envia el missatge
     */

    socket.on('send message', (missatge, nick) => {
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
    socket.on('sortir duelo', () => {
        let roomID = trobarRoom(socket);
        let roomDuelo = findRoomDuelo(socket);
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        if (llistatUsuaris != undefined) {
            llistatUsuaris.map((user) => {
                if (user.idSocket == socket.id) {
                    user.duelo.enDuelo = false;
                    user.duelo.encertades = 0;
                    user.duelo.oponent = {};
                }
            });
        }
        socket.leave(roomDuelo)
        arrayRoom.map((room) => {
            if (room.id == roomID) {
                room.jugadors = llistatUsuaris;
            }
        });

    });
    /**
     * Comprova si la resposta és correcta o no, i si és la última pregunta
     * @param {int} idPreg Identificador de la pregunta
     * @param {int} posResp Posició de la resposta
     */
    socket.on('answer', (idPreg, posResp) => {

        let correcte = false;
        let acabat = false;

        let roomID = trobarRoom(socket);

        let arrayPreg = arrayRoom.find((room) => room.id == roomID).arrayPreg;
        let preguntasMal = arrayRoom.find((room) => room.id == roomID).preguntasMal;
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let start = arrayRoom.find((room) => room.id == roomID).start;
        let llistatUsuarisMinim = [];
        let duelo = false;
        let idOponent;
        // encerta la pregunta
        if (arrayPreg[idPreg].respostes[posResp] == (preguntasMal[idPreg].respostes[respuestaCorrecta])) {
            correcte = true;
            llistatUsuaris.map((user) => {
                if (user.idSocket == socket.id) {

                    duelo = user.duelo.enDuelo;

                    if (!duelo) {
                        user.encertades++;
                        user.falladesConsecutives = 0;
                        user.preguntaActual++;
                        user.falladesConsecutives = 0;
                        if (user.infoPoders.robarVida > 0) {
                            if (!user.vida <= 0) {
                                user.vida += 10;
                                if (user.vida > 100) {
                                    user.vida = 100;
                                }
                            }
                            user.infoPoders.robarVida--;
                        }

                        if (!comprovarMort(user)) {
                            if (user.encertades % 3 == 0) {

                                let poder = getRandomPoder(user);
                                user.poder = poder;
                            }
                        } else {
                            if (user.encertades % 5 == 0) {

                                let poder = getRandomPoderMort(user);
                                user.poder = poder;
                            }
                        }
                    } else {
                        user.duelo.encertades++;
                        if (user.duelo.encertades == 3) {
                            let duelo = findRoomDuelo(socket);
                            io.to(duelo).emit('finalitzar duelo');
                        }
                        let indexPregunta = user.duelo.encertades;
                        idOponent = user.duelo.oponent.id;
                        let preguntaDuelo = preguntasDuelo[indexPregunta];
                        socket.emit('new question', preguntaDuelo);
                    }
                }
            });
            if (duelo) {
                llistatUsuaris.map((user) => {
                    if (user.idSocket == idOponent) {
                        user.duelo.oponent.encertades++;
                    }
                });
            }
            llistatUsuaris.forEach((user) => {

                let userMinim = createUserMinim(user);
                llistatUsuarisMinim.push(userMinim);
            })

            arrayRoom.map((room) => {
                if (room.id == roomID) {
                    room.jugadors = llistatUsuaris;
                }
            });

            llistatUsuaris.sort((a, b) => { return b.vida - a.vida });

            io.to(roomID).emit("update players", llistatUsuarisMinim)


        } else {
            let mort = false;

            llistatUsuaris.map((user) => {
                if (!user.duelo.enDuelo) {
                    if (user.idSocket == socket.id) {
                        user.vida -= 10;

                        if (user.infoPoders.escut) {
                            user.infoPoders.escut = false;
                            user.vida += 10;
                        }

                        if (user.infoPoders.robarVida > 0) {
                            user.infoPoders.robarVida = 0;
                        }

                        user.falladesConsecutives++;

                        if (comprovarMort(user)) {
                            matarJugador(user, start);
                            socket.emit('die');
                            mort = true;
                        }

                        if (user.falladesConsecutives == 3) {
                            user.preguntaActual++;
                            user.falladesConsecutives = 0;
                            let preguntaEnviar = arrayPreg[user.preguntaActual];
                            if (user.infoPoders.tempspregunta > 0) {
                                preguntaEnviar.temps -= user.infoPoders.tempspregunta;
                                user.infoPoders.tempspregunta = 0;
                                socket.emit('less time');
                                //!!!! aquest encara s'ha de fer
                            }
                            socket.emit('new question', preguntaEnviar);
                        }
                    }
                }
            });
            if (mort) {
                if (jugadorsVius(llistatUsuaris).length == 1) {
                    acabat = true;
                }
            }
            llistatUsuaris.sort((a, b) => { return b.vida - a.vida });

            llistatUsuarisMinim = llistaMinim(llistatUsuaris);

            arrayRoom.map((room) => {
                if (room.id == roomID) {
                    room.jugadors = llistatUsuaris;
                }
            });

            io.to(roomID).emit("update players", llistatUsuarisMinim)
        }
        socket.emit('check', correcte, acabat);

        if (acabat) {
            acabarPartida(socket, roomID);
        }
    })

    /**
     * Salta la pregunta actual si l'usuari té skips disponibles, si no, li resta vida
     */
    socket.on('skip', () => {
        let roomID = trobarRoom(socket);
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let start = arrayRoom.find((room) => room.id == roomID).start;

        llistatUsuaris.map((user) => {
            if (user.idSocket == socket.id) {
                user.preguntaActual++;
                if (user.skip > 0) {
                    user.skip--;
                } else {
                    user.vida -= -10 * user.falladesConsecutives + 30;
                    if (jugadorsVius(llistatUsuaris).length == 1) {
                        acabarPartida(socket, roomID);
                    } else {
                        if (comprovarMort(user) && !user.mort) {
                            matarJugador(user, start)
                            socket.emit('die');

                        }
                    }
                    llistatUsuaris.sort((a, b) => { return b.vida - a.vida });
                }
                user.falladesConsecutives = 0;
            }
        });
        if (jugadorsVius(llistatUsuaris).length > 1) {
            let user = llistatUsuaris.find((usuari) => {
                return usuari.idSocket == socket.id;
            });
            arrayRoom.map((room) => {
                if (room.id == roomID) {
                    room.jugadors = llistatUsuaris;
                }
            });
            let llistatUsuarisMinim = [];
            llistatUsuarisMinim = llistaMinim(llistatUsuaris);
            io.to(roomID).emit("update players", llistatUsuarisMinim);

            let preguntaEnviar = arrayRoom.find((room) => room.id == roomID).arrayPreg[user.preguntaActual];
            if (user.infoPoders.tempspregunta > 0) {
                preguntaEnviar.temps -= user.infoPoders.tempspregunta;
                user.infoPoders.tempspregunta = 0;
                socket.emit('menys temps');
            }

            socket.emit('new question', preguntaEnviar);
            //arrayRoom.find((room) => room.id == roomID).arrayPreg[user.preguntaActual]
        }
    });

    /**
     * Envia la pregunta actual a l'usuari
     */
    socket.on('send', () => {
        let roomID = trobarRoom(socket);
        let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let arrayPreg = arrayRoom.find((room) => room.id == roomID).arrayPreg;
        let user = llistatUsuaris.find((usuari) => {
            return usuari.idSocket == socket.id;
        });

        let preguntaEnviar = arrayPreg[user.preguntaActual];

        if (user.infoPoders.tempspregunta > 0) {
            preguntaEnviar.temps -= user.infoPoders.tempspregunta;
            user.infoPoders.tempspregunta = 0;
            socket.emit('menys temps');
        }

        socket.emit('new question', preguntaEnviar);
    })

    /**
     * utilitza el poder que té l'usuari
     */
    socket.on('use power', (poder, objectiu) => {
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

        if (user.poder == poder) {
            switch (poder) {
                case "salt":
                    utilitzarPoderSalt(user, userObjectiu, roomID);

                    break;
                case "vida":
                    utilizarPoderVida(user, llistatUsuaris);
                    break;
                case "escut":
                    utilitzarPoderEscut(user, userObjectiu, roomID);
                    break;
                case "robarVida":
                    utilitzarPoderRobarVida(user, userObjectiu, roomID);
                    break;
                case "pararTemps":
                    utilitzarPoderPararTemps(socket);
                    break;
                case "menysTemps":
                    utilitzarPoderMenysTemps(user, userObjectiu, roomID);
                    break;
                case "duelo":
                    utilitzarPoderDuelo(user, userObjectiu, roomID, socket);
                    break;
                default:
                    break;
            }
            user.poder = "";
            let llistatUsuarisMinim = [];
            llistatUsuarisMinim = llistaMinim(llistatUsuaris);
            io.to(roomID).emit("update players", llistatUsuarisMinim)
        }
    })

    socket.on('bleed', () => {
        let roomID = trobarRoom(socket);
        let room = arrayRoom.find((room) => room.id == roomID);
        let llistatUsuaris = undefined;
        let start
        console.log(roomID);
        if (room != undefined) {
            llistatUsuaris = room.jugadors;
            start = room.start;
        }
        if (llistatUsuaris != undefined) {
            console.log(llistatUsuaris);
            let user = llistatUsuaris.find((usuari) => {
                return usuari.idSocket == socket.id;
            });
            if (!user.mort) {
                user.vida -= restarVidaSagnar;
                let llistatUsuarisMinim = [];
                if (comprovarMort(user) && !user.mort) {
                    matarJugador(user, start);
                    socket.emit('die');
                }
                if (jugadorsVius(llistatUsuaris).length == 1) {
                    acabarPartida(socket, roomID);
                }
                llistatUsuaris.sort((a, b) => { return b.vida - a.vida });
                llistatUsuarisMinim = llistaMinim(llistatUsuaris);
                io.to(roomID).emit("update players", llistatUsuarisMinim)
            }
        }
    })
    socket.on('duelo entrar', (userObjectiu, user) => {
        socket.join('duelo' + user + userObjectiu);

    });


})
function llistaMinim(llistatUsuaris) {
    let llistatUsuarisMinim = [];
    llistatUsuaris.forEach((user) => {

        let userMinim = createUserMinim(user);
        llistatUsuarisMinim.push(userMinim);
    });
    return llistatUsuarisMinim;
}


function trobarRoom(socket) {
    let rooms = socket.rooms;
    let roomID;
    rooms.forEach((room) => {
        if (room.includes('Partida')) {
            roomID = room;
        }
    });
    console.log(roomID);
    return roomID;

}
function findRoomDuelo(socket) {
    let rooms = socket.rooms;
    let roomID;
    rooms.forEach((room) => {
        if (room.includes('duelo')) {
            roomID = room;
        }
    });
    console.log(roomID);
    return roomID;

}
function acabarPartida(socket, roomID) {
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

/**
 * et dona un poder aleatori
 * @param {obj} user l'usuari i per conseqüencia el quadrant al qual es troba, per saber quin poder donar-li
 * @returns el poder que li ha tocat
 */
function getRandomPoder() {
    let random = Math.floor(Math.random() * 6) + 1;
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
        case 4:
            poder = "robarVida";
            break;
        case 5:
            poder = "pararTemps";
            break;
        case 6:
            poder = "menysTemps";
            break;
            //si se quiere añadir el duelo, descomentar el case 7 y aumentar el random a 7
        // case 7:
        //     poder = "duelo";
        //     break;
        default:
            break;
    }
    poder = "duelo";

    return poder;
}

function getRandomPoderMort() {
    let random = Math.floor(Math.random() * 2) + 1;
    let poder = "";
    switch (random) {
        case 1:
            poder = "vida";
            break;
        case 2:
            poder = "menysTemps";
            break;
        default:
            break;
    }
    return poder;
}

function utilitzarPoderDuelo(user, userObjectiu, roomID, socket) {
    console.log("USER: " + user.idSocket);
    console.log("USEROBJ: " + userObjectiu.idSocket);

    let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
    console.log(llistatUsuaris);
    llistatUsuaris.map((jugador) => {
        if (jugador.idSocket == socket.id) {
            jugador.duelo.enDuelo = true;
            jugador.duelo.oponent.id = userObjectiu.idSocket;
            jugador.duelo.oponent.encertades = 0;
            user.duelo = jugador.duelo;
            console.log(user.duelo)
        }
        if (jugador.idSocket == userObjectiu.idSocket) {
            jugador.duelo.enDuelo = true;
            jugador.duelo.oponent.id = user.idSocket;
            jugador.duelo.oponent.encertades = 0;
            userObjectiu.duelo = jugador.duelo;
            console.log(userObjectiu.duelo)

        }

    });
    arrayRoom.map((room) => {
        if (room.id == roomID) {
            room.jugadors = llistatUsuaris;
        }
    });
    user.poder = "";
    socket.emit('duelo enviar', user.duelo);
    console.log(userObjectiu.idSocket);
    let preguntaDuelo = preguntasDuelo[0];
    socket.emit('new question', preguntaDuelo);
    io.to(userObjectiu.idSocket).emit('duelo recibir', userObjectiu.duelo);
    io.to(userObjectiu.idSocket).emit('new question', preguntaDuelo)
}


/**
 * utilitza el poder de redüir el temps d'una pregunta a un enemic
 * @param {obj} user  l'usuari que utilitza el poder
 * @param {obj} userObjectiu  l'usuari que rep el poder
 * @param {*} roomID  identificador de la sala
 */

function utilitzarPoderMenysTemps(user, userObjectiu, roomID) {

    userObjectiu.infoPoders.tempspregunta += 5;
}
/**
 * Utilitza el poder de parar temps
 * @param {obj} user l'usuari que utilitza el poder
 * @param {obj} userObjectiu l'usuari que rep el poder
 * @param {int} roomID identificador de la sala
*/
function utilitzarPoderPararTemps(socket) {
    socket.emit('parar temps');
}

/**
 * Utilitza el poder de robar vida
 * @param {obj} user l'usuari que utilitza el poder
 * @param {obj} userObjectiu l'usuari que rep el poder
 * @param {int} roomID identificador de la sala
*/
function utilitzarPoderRobarVida(user, userObjectiu, roomID) {
    user.infoPoders.robarVida = 3;
}

/**
 * Utilitza el poder d'aconseguir un salt
 * @param {obj} user l'usuari que utilitza el poder
 */

function utilitzarPoderSalt(user) {
    user.skip++;
}

/**
 * Utilitza el poder de recuperar vida
 * @param {obj} user l'usuari que utilitza el poder
 * @param {Array} llistatUsuaris llista de tots els usuaris de la partida
 */

function utilizarPoderVida(user, llistatUsuaris) {
    user.vida += 15;
    if (user.vida > 100) {
        user.vida = 100;
    }
    llistatUsuaris.sort((a, b) => { return b.vida - a.vida });
}

/**
 * Utilitza el poder escut
 * @param {obj} user l'usuari que utilitza el poder
 * @param {obj} userObjectiu l'usuari que rep el poder
 * @param {int} roomID identificador de la sala
 */

function utilitzarPoderEscut(user, userObjectiu, roomID) {
    userObjectiu.infoPoders.escut = true;
}

function comprovarMort(user) {
    if (user.vida <= 0) {
        return true;
    } else {
        return false;
    }
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
        "mort": false,
        "duelo": {
            "enDuelo": false,
            "encertades": 0,
            "indexPreg": [],
            "oponent": {
                'id': "",
                'encertades': "",
            },
        },
        "infoPoders": {
            "escut": false,
            "robarVida": 0,
            "tempspregunta": 0,
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
        "mort": user.mort,
        "infoPoders": {
            "escut": user.infoPoders.escut,
            "robarVida": user.infoPoders.robarVida,
            "tempspregunta": user.infoPoders.tempspregunta,
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

function matarJugador(user, start) {
    user.mort = true;
    user.vida = 0;
    user.temps = Date.now() - start;
    user.poder = "";
    user.infoPoders.robarVida = 0;
}


server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})