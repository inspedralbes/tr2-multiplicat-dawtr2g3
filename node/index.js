import express from "express";
import { fetchPreguntas } from "./preguntes.js";
import { fetchPreguntasDuelo } from "./preguntes.js";
import { fetchPreguntaNuke } from "./preguntes.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";

const app = express();
//A pro 3590, a pro 3589
const port = 3589;
app.use(cors());
const server = createServer(app);

let torneig = {
  storage: new InMemoryDatabase(),
  manager: null,
};

torneig.manager = new BracketsManager(torneig.storage);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Access-Control-Allow-Origin"],
  },
});
const respuestaCorrecta = 0;

let restarVidaSagnar = 1;

let arrayRoom = [];
let arrayRoomMinim = [];
async function iniciarLobby(roomID) {
  const data = await fetchPreguntas();
  let room = arrayRoom.find((room) => room.id == roomID);

  if (room.tipus == "royale") {
    const fetchDuelo = await fetchPreguntasDuelo();
    let preguntasDueloMal = JSON.parse(JSON.stringify(fetchDuelo));
    let preguntasDuelo = JSON.parse(JSON.stringify(preguntasDueloMal));
    preguntasDuelo.forEach((pregunta) => {
      pregunta.respostes = randomArray(pregunta.respostes);
    });
    let preguntasMal = data;
    randomArray(preguntasMal);
    let arrayPreg = [];
    preguntasMal.forEach((preguntaMal, index) => {
      let pregunta = tipusTest(preguntaMal, index);

      let arrayResp = "[" + pregunta.respostes + "]";
      preguntasMal[index].respostes = JSON.parse(arrayResp);
      pregunta.respostes = randomArray(JSON.parse(arrayResp));
      arrayPreg.push(pregunta);
    });
    arrayRoom.map((room) => {
      if (room.id == roomID) {
        room.arrayPreg = arrayPreg;
        room.preguntasMal = preguntasMal;
        room.preguntasDueloMal = preguntasDueloMal;
        room.preguntasDuelo = preguntasDuelo;
      }
    });
  } else if (room.tipus == "torneo") {
    let preguntasMal = data;
    randomArray(preguntasMal);
    let arrayPreg = [];
    preguntasMal.forEach((preguntaMal, index) => {
      let pregunta = tipusTest(preguntaMal, index);

      let arrayResp = "[" + pregunta.respostes + "]";
      preguntasMal[index].respostes = JSON.parse(arrayResp);
      pregunta.respostes = randomArray(JSON.parse(arrayResp));
      arrayPreg.push(pregunta);
    });

    arrayRoom.map((room) => {
      if (room.id == roomID) {
        room.arrayPreg = arrayPreg;
        room.preguntasMal = preguntasMal;
      }
    });
  }
}

io.on("connection", (socket) => {
  /**
   * Envia la llista de partides
   * @param {Array} arrayRoomMinim Array que conté la informació de les partides
   */
  socket.emit("games list", arrayRoomMinim);

  /**
   * Entra a una partida
   * @param {string} roomID Identificador de la partida
   * @param {string} nom Nom de l'usuari que entra a la partida
   */
  socket.on("join", (roomID, nom) => {
    let partida = arrayRoom.find((room) => room.id == roomID);
    if (partida) {
      if (partida.maxJugadors) {
        if (partida.maxJugadors <= partida.jugadors.length) {
          socket.emit("max jugadors");
        } else {
          socket.join(roomID);
          let user;
          let userMinim;
          if (partida.tipus != 'torneo') {
            user = createNewUser(socket.id, nom);
            userMinim = createUserMinim(user);

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
          } else {
            user = createUserTorneig(socket.id, nom, partida.maxJugadors);

            arrayRoom.map((room) => {
              if (room.id == roomID) {
                room.jugadors.push(user);
              }
            });


            arrayRoomMinim.map((room) => {
              if (room.id == roomID) {
                room.jugadors.push(user);
              }
            });
          }


          socket.emit("push a lobby");
          socket.emit(
            "info partida",
            arrayRoom.find((room) => room.id == roomID).nom,
            arrayRoom.find((room) => room.id == roomID).maxJugadors
          );
          let jugadorsMinim = arrayRoomMinim.find(
            (room) => room.id == roomID
          ).jugadors;
          io.to(roomID).emit("update players", jugadorsMinim);
          io.emit("games list", arrayRoomMinim);
        }
      }
    }
  });

  /**
   * Crea una nova partida
   * @param {string} nom Nom de la partida
   * @param {int} maxJugadors Màxim de jugadors de la partida
   * @param {string} nick Nom de l'usuari que crea la partida
   */

  socket.on("create game", (nom, maxJugadors, tipus, nick) => {
    let roomID = "Partida" + socket.id;
    socket.join(roomID);
    console.log(tipus);

    if (tipus == 'torneo') {
      arrayRoom.push({
        id: roomID,
        nom: nom,
        tipus: tipus,
        maxJugadors: maxJugadors,
        professor: socket.id,
        jugadors: [],
      });
      arrayRoomMinim.push({
        id: roomID,
        nom: nom,
        tipus: tipus,
        maxJugadors: maxJugadors,
        jugadors: [],
      });
      io.to(socket.id).emit("update players", []);

    } else {
      let user = createNewUser(socket.id, nick);
      let userMinim = createUserMinim(user);
      
      arrayRoom.push({
        id: roomID,
        nom: nom,
        tipus: tipus,
        maxJugadors: maxJugadors,
        jugadors: [user],
        arrayPreg: [],
        preguntasMal: [],
        preguntasDuelo: [],
        preguntasDueloMal: [],
      });
      arrayRoomMinim.push({
        id: roomID,
        nom: nom,
        tipus: tipus,
        maxJugadors: maxJugadors,
        jugadors: [userMinim],
      });
      io.to(socket.id).emit("update players", [userMinim]);
    }

    iniciarLobby(roomID);
    socket.emit(
      "info partida",
      arrayRoom.find((room) => room.id == roomID).nom,
      arrayRoom.find((room) => room.id == roomID).maxJugadors
    );
    io.emit("games list", arrayRoomMinim);
  });

  /**
   * Elimina el jugador de la partida i de la llista de jugadors, si és l'últim jugador de la partida o el creador, la tanca
   */
  socket.on('sortir lobby', () => {
    const roomID = trobarRoom(socket);
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

        let room = arrayRoom.find((room) => room.id == roomID);
        let llistatUsuaris = room.jugadors;

        let index = llistatUsuaris.findIndex((user) => user.idSocket == socket.id);
        llistatUsuaris.splice(index, 1);

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
        let start = arrayRoom.find((room) => room.id == roomID).start;
        io.to(roomID).emit('update players', llistatUsuarisMinim);
        if (start) {
          if (jugadorsVius(llistatUsuaris).length == 1) {
            acabarPartida(socket, roomID);
            io.to(roomID).emit('finalitzar duelo');
          }
        }
      }
    }
  });

  socket.on('disconnecting', () => {
    const roomID = trobarRoom(socket);
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

        if (
          arrayRoomMinim.findIndex((room) => room.id == roomID) != undefined
        ) {
          arrayRoomMinim.splice(index, 1);
          io.emit("games list", arrayRoomMinim);
        }
      } else if (index != "-1") {
        let room = arrayRoom.find((room) => room.id == roomID);
        let llistatUsuaris = room.jugadors;

        let index = llistatUsuaris.findIndex(
          (user) => user.idSocket == socket.id
        );
        llistatUsuaris.splice(index, 1);

        if (arrayRoomMinim.find((room) => room.id == roomID) != undefined) {
          arrayRoomMinim.map((room) => {
            if (room.id == roomID) {
              let index = room.jugadors.findIndex(
                (idSocket) => idSocket == socket.id
              );
              room.jugadors.splice(index, 1);
            }
          });
          io.emit("games list", arrayRoomMinim);
        }
        arrayRoom.map((room) => {
          if (room.id == roomID) {
            room.jugadors = llistatUsuaris;
          }
        });

        llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let llistatUsuarisMinim = [];
        llistatUsuarisMinim = llistaMinim(llistatUsuaris);
        let start = arrayRoom.find((room) => room.id == roomID).start;
        io.to(roomID).emit("update players", llistatUsuarisMinim);
        if (start) {
          if (jugadorsVius(llistatUsuaris).length == 1) {
            acabarPartida(socket, roomID);
            io.to(roomID).emit("finalitzar duelo");
          }
        }
      }
    }
  });
  socket.on("tornar a lobby", () => {
    const roomID = trobarRoom(socket);
    if (roomID != undefined) {
      let index = arrayRoom.findIndex((room) => room.id == roomID);
      if (roomID == "Partida" + socket.id && index != "-1") {
        io.to(roomID).emit("closed lobby");
        let idOrig = socket.id;
        let llistatUsuaris = arrayRoom.find(
          (room) => room.id == roomID
        ).jugadors;
        arrayRoom.splice(index, 1);

        llistatUsuaris.forEach((user) => {
          socket.id = user.idSocket;
          socket.leave(roomID);
        });
        socket.id = idOrig;

        if (
          arrayRoomMinim.findIndex((room) => room.id == roomID) != undefined
        ) {
          arrayRoomMinim.splice(index, 1);
          io.emit("games list", arrayRoomMinim);
        }
      } else if (index != "-1") {
        let room = arrayRoom.find((room) => room.id == roomID);
        let llistatUsuaris = room.jugadors;

        let index = llistatUsuaris.findIndex(
          (user) => user.idSocket == socket.id
        );
        llistatUsuaris.splice(index, 1);

        if (arrayRoomMinim.find((room) => room.id == roomID) != undefined) {
          arrayRoomMinim.map((room) => {
            if (room.id == roomID) {
              let index = room.jugadors.findIndex(
                (idSocket) => idSocket == socket.id
              );
              room.jugadors.splice(index, 1);
            }
          });
          io.emit("games list", arrayRoomMinim);
        }
        arrayRoom.map((room) => {
          if (room.id == roomID) {
            room.jugadors = llistatUsuaris;
          }
        });

        llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
        let llistatUsuarisMinim = [];
        llistatUsuarisMinim = llistaMinim(llistatUsuaris);

        io.to(roomID).emit("update players", llistatUsuarisMinim);
        if (jugadorsVius(llistatUsuaris).length == 1) {
          acabarPartida(socket, roomID);
          io.to(roomID).emit("finalitzar duelo");
        }
      }
    }
  });
  /**
   * Inicia la partida
   */

  socket.on("start", () => {
    let roomID = trobarRoom(socket);
    let room = arrayRoom.find((room) => room.id == roomID);
    if (room) {
      let arrayPreg = arrayRoom.find((room) => room.id == roomID).arrayPreg;
      if (room.jugadors.length >= 2 && room.tipus == "royale") {
        room.start = Date.now();
        io.to(roomID).emit("play", arrayPreg[0]);
        let index = arrayRoomMinim.findIndex((room) => room.id == roomID);
        arrayRoomMinim.splice(index, 1);
        io.emit("games list", arrayRoomMinim);
      }

      //   if (room.jugadors.length == room.maxJugadors && room.tipus == "torneo") {
      if (room.tipus == "torneo") {
        randomArray(room.jugadors);

        room.start = Date.now();



        /*
        PROVES!!!!
        */

        let torneo = {
          id: "PartidayxEpbmMqLoR-htTVAAAH",
          nom: "asdf",
          tipus: "torneo",
          maxJugadors: 8,
          jugadors: [
            {
              idSocket: "yxEpbmMqLoR-htTVAAAH",
              nick: "admin",
              encertades: 0,
              vida: 100,
              mort: false,
              duelo: {
                enDuelo: false,
                encertades: 0,
                indexPreg: [],
                oponent: { id: "", encertades: "" },
              },
            },
            {
              idSocket: "vJinmMhqMgEjymCyAAAF",
              nick: "asd",
              encertades: 0,
              vida: 100,
              mort: false,
              duelo: {
                enDuelo: false,
                encertades: 0,
                indexPreg: [],
                oponent: { id: "", encertades: "" },
              },
            },
            {
              idSocket: "KJ-wdzJ5p9_Tb31DAAAL",
              nick: "aasd",
              encertades: 0,
              vida: 100,
              mort: false,
              duelo: {
                enDuelo: false,
                encertades: 0,
                indexPreg: [],
                oponent: { id: "", encertades: "" },
              },
            },
            {
              idSocket: "T3bLh7Mezr2qNCxLAAAO",
              nick: "asdf",
              encertades: 0,
              vida: 100,
              mort: false,
              duelo: {
                enDuelo: false,
                encertades: 0,
                indexPreg: [],
                oponent: { id: "", encertades: "" },
              },
            },
            {
              idSocket: "Wj11CwTCeSkC_GcmAAAN",
              nick: "asdfasf",
              encertades: 0,
              vida: 100,
              mort: false,
              duelo: {
                enDuelo: false,
                encertades: 0,
                indexPreg: [],
                oponent: { id: "", encertades: "" },
              },
            },
            {
              idSocket: "CS_h44J77QEpPyyMAAAE",
              nick: "dfasfagf",
              encertades: 0,
              vida: 100,
              mort: false,
              duelo: {
                enDuelo: false,
                encertades: 0,
                indexPreg: [],
                oponent: { id: "", encertades: "" },
              },
            },
            {
              idSocket: "yVP3KutzoVUyHN59AAAB",
              nick: "fgfgfgfg",
              encertades: 0,
              vida: 100,
              mort: false,
              duelo: {
                enDuelo: false,
                encertades: 0,
                indexPreg: [],
                oponent: { id: "", encertades: "" },
              },
            },
            {
              idSocket: "dd1mYp-WXdO7O9c1AAAP",
              nick: "asdsadgdf",
              encertades: 0,
              vida: 100,
              mort: false,
              duelo: {
                enDuelo: false,
                encertades: 0,
                indexPreg: [],
                oponent: { id: "", encertades: "" },
              },
            },
          ],
          arrayPreg: null,
          preguntasMal: null,
          preguntasDuelo: null,
          preguntasDueloMal: null,
        };

        /*
        ELIMINAR QUAN DINÀMIC
        */

        generarTorneig(room)
          .then(() => {
            socket.emit("tournament info", { data: room.dataTorneig, players: torneo.jugadors })
          })
          .catch((error) => {
            console.error(error);
          });


        // io.to(roomID).emit("play", arrayPreg[0]);
        // let index = arrayRoomMinim.findIndex((room) => room.id == roomID);
        // arrayRoomMinim.splice(index, 1);
        // io.emit("games list", arrayRoomMinim);
      }
    }
  });

  /**
   * Envia el missatge a tots els usuaris de la sala
   * @param {string} missatge Missatge a enviar
   * @param {string} nick Nom de l'usuari que envia el missatge
   */

  socket.on("send message", (missatge, nick) => {
    let rooms = socket.rooms;
    let roomID;
    rooms.forEach((room) => {
      roomID = room;
    });

    let obj = {
      nick: nick,
      msg: missatge,
    };
    io.to(roomID).emit("update chat", obj);
  });
  socket.on("sortir duelo", () => {
    let roomID = trobarRoom(socket);
    let roomDuelo = findRoomDuelo(socket);
    let room = arrayRoom.find((room) => room.id == roomID);
    if (room != undefined) {
      let arrayPreg = room.arrayPreg;
      let llistatUsuaris = room.jugadors;

      if (llistatUsuaris != undefined) {
        llistatUsuaris.map((user) => {
          if (user.idSocket == socket.id) {
            user.duelo.enDuelo = false;
            user.duelo.encertades = 0;
            user.duelo.oponent = {};
            if (arrayPreg != undefined) {
              let preguntaEnviar = arrayPreg[user.preguntaActual];
              if (preguntaEnviar != undefined) {
                socket.emit("new question", preguntaEnviar);
              } else {
                user.preguntaActual = 0;
                preguntaEnviar = arrayPreg[0];
                socket.emit("new question", preguntaEnviar);
              }
            }
          }
        });
      }
      arrayRoom.map((room) => {
        if (room.id == roomID) {
          room.jugadors = llistatUsuaris;
        }
      });
      let llistatUsuarisMinim = [];
      llistatUsuaris.forEach((user) => {
        let userMinim = createUserMinim(user);
        llistatUsuarisMinim.push(userMinim);
      });
      io.to(roomID).emit("update players", llistatUsuarisMinim);
    }
    socket.leave(roomDuelo);
  });
  /**
   * Comprova si la resposta és correcta o no, i si és la última pregunta
   * @param {int} idPreg Identificador de la pregunta
   * @param {int} posResp Posició de la resposta
   */
  socket.on("answer", (idPreg, posResp) => {

    let correcte = false;
    let acabat = false;
    let roomID = trobarRoom(socket);
    let room = arrayRoom.find((room) => room.id == roomID);
    if (room != undefined) {
      if (room.tipus == 'torneo') {

      } else {
        let preguntasDueloMal = arrayRoom.find((room) => room.id == trobarRoom(socket)).preguntasDueloMal;
        let arrayPreg = room.arrayPreg;
        let preguntasMal = room.preguntasMal;
        let llistatUsuaris = room.jugadors;
        let start = room.start;
        let llistatUsuarisMinim = [];
        let idOponent;
        let preguntasDuelo = room.preguntasDuelo;
        let user = llistatUsuaris.find((usuari) => {
          return usuari.idSocket == socket.id;
        });
        let mort = false;
        if (user.duelo.enDuelo) {

          if (preguntasDuelo[user.duelo.encertades].respostes[posResp] == (preguntasDueloMal[user.duelo.encertades].respostes[respuestaCorrecta])) {
            correcte = true;
            user.duelo.encertades++;

            if (user.duelo.encertades == 3) {
              let duelo = findRoomDuelo(socket);
              io.to(duelo).emit('finalitzar duelo');

              idOponent = user.duelo.oponent.id;

              llistatUsuaris.map((user) => {
                if (user.idSocket == idOponent) {
                  user.vida -= 30;
                  user.encertades = 0;
                  if (user.vida <= 0) {
                    user.vida = 1;
                  }

                }
              });




              arrayRoom.map((room) => {
                if (room.id == roomID) {
                  room.jugadors = llistatUsuaris;
                }
              });

              llistatUsuaris.sort((a, b) => { return b.vida - a.vida });
              llistatUsuaris.forEach((user) => {

                let userMinim = createUserMinim(user);
                llistatUsuarisMinim.push(userMinim);
              })
              io.to(roomID).emit("update players", llistatUsuarisMinim)

            } else {
              let indexPregunta = user.duelo.encertades;
              let preguntaDuelo = preguntasDuelo[indexPregunta];
              socket.emit('new question', preguntaDuelo);
            }
          } else {
            user.encertades = 0;
          }
        } else if (user.preguntaNuke) {

          if (user.preguntaNukeMal.respostes[posResp] != (user.preguntaNuke.respostes[respuestaCorrecta])) {
            user.vida -= 55;
            respostaFallada(user, roomID, socket);

          }
          user.preguntaNuke = undefined;
          user.preguntaNukeMal = undefined;
          let preguntaEnviar = arrayPreg[user.preguntaActual];
          if (preguntaEnviar != undefined) {
            socket.emit('new question', preguntaEnviar);
          } else {
            user.preguntaActual = 0;
            let preguntaEnviar = arrayPreg[0];

            socket.emit('new question', preguntaEnviar);

          }

        } else {
          // encerta la pregunta
          if (arrayPreg[idPreg].respostes[posResp] == (preguntasMal[idPreg].respostes[respuestaCorrecta])) {
            correcte = true;



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
                if (user.poder != 'nuke') {
                  let poder = getRandomPoder(user);
                  user.poder = poder;
                }
              }
              if (user.encertades == 20) {
                user.poder = 'nuke';
              }
            } else {
              if (user.encertades % 5 == 0) {

                let poder = getRandomPoderMort(user);
                user.poder = poder;
              }

            };

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
            socket.emit('new question', arrayPreg[user.preguntaActual]);


          } else {
            respostaFallada(user, roomID, socket);
          }
        }
      }
    }
  })

  /**
   * Salta la pregunta actual si l'usuari té skips disponibles, si no, li resta vida
   */
  socket.on("skip", () => {
    let roomID = trobarRoom(socket);
    let room = arrayRoom.find((room) => room.id == roomID);
    if (room != undefined) {
      let llistatUsuaris = room.jugadors;
      let start = room.start;
      let arrayPreg = room.arrayPreg;
      llistatUsuaris.map((user) => {
        if (user.idSocket == socket.id) {
          user.preguntaActual++;
          if (user.skip > 0) {
            user.skip--;
          } else {
            user.vida -= -10 * user.falladesConsecutives + 30;
            if (user.vida < 0) {
              user.vida = 0;
              matarJugador(user, start);
              socket.emit("die");
            }
            if (jugadorsVius(llistatUsuaris).length == 1) {
              acabarPartida(socket, roomID);
            }
            llistatUsuaris.sort((a, b) => {
              return b.vida - a.vida;
            });
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

        if (user.infoPoders.tempspregunta > 0) {
          preguntaEnviar.temps -= user.infoPoders.tempspregunta;
          user.infoPoders.tempspregunta = 0;
          socket.emit("menys temps");
        }
        let preguntaEnviar = arrayPreg[user.preguntaActual];
        if (preguntaEnviar != undefined) {
          socket.emit("new question", preguntaEnviar);
        } else {
          user.preguntaActual = 0;
          preguntaEnviar = arrayPreg[0];
          socket.emit("new question", preguntaEnviar);
        }
        //arrayRoom.find((room) => room.id == roomID).arrayPreg[user.preguntaActual]
      }
    }
  });

  /**
   * Envia la pregunta actual a l'usuari
   */
  socket.on("send", () => {
    let roomID = trobarRoom(socket);
    let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
    let arrayPreg = arrayRoom.find((room) => room.id == roomID).arrayPreg;
    let user = llistatUsuaris.find((usuari) => {
      return usuari.idSocket == socket.id;
    });

    let preguntaEnviar = arrayPreg[user.preguntaActual];
    if (user.infoPoders.tempspregunta > 0) {
      if (preguntaEnviar) {
        preguntaEnviar.temps -= user.infoPoders.tempspregunta;
      }
      user.infoPoders.tempspregunta = 0;
      socket.emit("menys temps");
    }

    if (preguntaEnviar != undefined) {
      socket.emit("new question", preguntaEnviar);
    } else {
      user.preguntaActual = 0;
      preguntaEnviar = arrayPreg[0];
      socket.emit("new question", preguntaEnviar);
    }
  });

  /**
   * utilitza el poder que té l'usuari
   */
  socket.on("use power", (poder, objectiu) => {
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
          if (!user.mort) {
            utilitzarPoderSalt(user, roomID);
          } else {
            utilitzarPoderSalt(userObjectiu, roomID);
          }
          break;
        case "vida":
          if (!user.mort) {
            utilizarPoderVida(user, llistatUsuaris);
          } else {
            utilizarPoderVida(userObjectiu, llistatUsuaris);
          }
          break;
        case "escut":
          if (!user.mort) {
            utilitzarPoderEscut(user, roomID);
          } else {
            utilitzarPoderEscut(userObjectiu, roomID);
          }
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
        case "nuke":
          utilitzarPoderNuke(user, roomID);
        default:
          break;
      }
      user.poder = "";
      let llistatUsuarisMinim = [];
      llistatUsuarisMinim = llistaMinim(llistatUsuaris);
      io.to(roomID).emit("update players", llistatUsuarisMinim);
    }
  });

  socket.on("bleed", () => {
    let roomID = trobarRoom(socket);
    let room = arrayRoom.find((room) => room.id == roomID);
    let llistatUsuaris = undefined;
    let start;
    if (room != undefined) {
      llistatUsuaris = room.jugadors;
      start = room.start;
    }
    if (llistatUsuaris != undefined) {
      let user = llistatUsuaris.find((usuari) => {
        return usuari.idSocket == socket.id;
      });
      if (!user.mort) {
        user.vida -= restarVidaSagnar;
        let llistatUsuarisMinim = [];
        if (comprovarMort(user) && !user.mort) {
          matarJugador(user, start);
          socket.emit("die");
        }
        if (jugadorsVius(llistatUsuaris).length == 1) {
          acabarPartida(socket, roomID);
        }
        llistatUsuaris.sort((a, b) => {
          return b.vida - a.vida;
        });
        llistatUsuarisMinim = llistaMinim(llistatUsuaris);
        io.to(roomID).emit("update players", llistatUsuarisMinim);
      }
    }
  });
  socket.on("duelo entrar", (userObjectiu, user) => {
    socket.join("duelo" + user + userObjectiu);
  });
});
async function utilitzarPoderNuke(userNuke, roomID) {
  let room = arrayRoom.find((room) => room.id == roomID);
  let llistatUsuaris = room.jugadors;
  let usersAfectats = llistatUsuaris.filter((user) => { return user != userNuke });
  let preguntaNuke = await fetchPreguntaNuke();
  let preguntaNukeMal = JSON.parse(JSON.stringify(preguntaNuke));
  preguntaNukeMal.respostes = randomArray(preguntaNukeMal.respostes);
  io.to(roomID).emit('nuke', userNuke.nick);
  setTimeout(() => {
    usersAfectats.forEach((user) => {
      user.preguntaNuke = preguntaNuke;
      user.preguntaNukeMal = preguntaNukeMal;
      io.to(user.idSocket).emit('pregunta nuke', preguntaNukeMal);
    });
  }, 5000);
}

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
    if (room.includes("Partida")) {
      roomID = room;
    }
  });
  return roomID;
}
function findRoomDuelo(socket) {
  let rooms = socket.rooms;
  let roomID;
  rooms.forEach((room) => {
    if (room.includes("duelo")) {
      roomID = room;
    }
  });
  return roomID;
}
function acabarPartida(socket, roomID) {
  let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
  let guanyador = jugadorsVius(llistatUsuaris);
  let perdedors = llistatUsuaris.filter((user) => {
    return user.idSocket != guanyador[0].idSocket;
  });
  perdedors = perdedors.sort((a, b) => {
    return b.temps - a.temps;
  });

  io.to(roomID).emit("end", guanyador[0], perdedors);

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
  let random = Math.floor(Math.random() * 7) + 1;
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

    case 7:
      poder = "duelo";
      break;
    default:
      break;
  }

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

async function utilitzarPoderDuelo(user, userObjectiu, roomID, socket) {
  let preguntasDuelo = arrayRoom.find(
    (room) => room.id == roomID
  ).preguntasDuelo;
  let llistatUsuaris = arrayRoom.find((room) => room.id == roomID).jugadors;
  llistatUsuaris.map((jugador) => {
    if (jugador.idSocket == socket.id) {
      jugador.duelo.enDuelo = true;
      jugador.duelo.oponent.id = userObjectiu.idSocket;
      jugador.duelo.oponent.encertades = 0;
      user.duelo = jugador.duelo;
    }
    if (jugador.idSocket == userObjectiu.idSocket) {
      jugador.duelo.enDuelo = true;
      jugador.duelo.oponent.id = user.idSocket;
      jugador.duelo.oponent.encertades = 0;
      userObjectiu.duelo = jugador.duelo;
    }
  });
  arrayRoom.map((room) => {
    if (room.id == roomID) {
      room.jugadors = llistatUsuaris;
    }
  });
  user.poder = "";
  socket.emit("duelo enviar", user.duelo);
  let preguntaDuelo = preguntasDuelo[0];
  socket.emit("new question", preguntaDuelo);
  io.to(userObjectiu.idSocket).emit("duelo recibir", userObjectiu.duelo);
  io.to(userObjectiu.idSocket).emit("new question", preguntaDuelo);
  let llistatUsuarisMinim = [];
  llistatUsuaris.forEach((user) => {
    let userMinim = createUserMinim(user);
    llistatUsuarisMinim.push(userMinim);
  });
  io.to(roomID).emit("update players", llistatUsuarisMinim);
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
  socket.emit("parar temps");
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
  llistatUsuaris.sort((a, b) => {
    return b.vida - a.vida;
  });
}

/**
 * Utilitza el poder escut
 * @param {obj} user l'usuari que utilitza el poder
 * @param {obj} userObjectiu l'usuari que rep el poder
 * @param {int} roomID identificador de la sala
 */

function utilitzarPoderEscut(userObjectiu, roomID) {
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
    idSocket: idSocket,
    nick: nick,
    preguntaActual: 0,
    encertades: 0,
    vida: 100,
    skip: 1,
    preguntaNuke: null,
    preguntaNukeMal: null,
    temps: 0, //Es posa el temps quan mor el jugador, de base sera 0
    falladesConsecutives: 0,
    poder: "",
    mort: false,
    duelo: {
      enDuelo: false,
      encertades: 0,
      indexPreg: [],
      oponent: {
        id: "",
        encertades: "",
      },
    },
    infoPoders: {
      escut: false,
      robarVida: 0,
      tempspregunta: 0,
    },
  };
  return user;
}

/**
 * Crear un usuari reduït
 * @param {obj} user Objecte que conté la informació de l'usuari
 * @returns Objecte que conté la informació de l'usuari reduïda
 */
function createUserMinim(user) {
  let userMinim = {
    idSocket: user.idSocket,
    nick: user.nick,
    encertades: user.encertades,
    vida: user.vida,
    skip: user.skip,
    falladesConsecutives: user.falladesConsecutives,
    poder: user.poder,
    mort: user.mort,
    duelo: {
      enDuelo: user.duelo.enDuelo,
      encertades: user.duelo.encertades,
      indexPreg: user.duelo.indexPreg,
      oponent: {
        id: user.duelo.oponent.id,
        encertades: user.duelo.oponent.encertades,
      },
    },
    infoPoders: {
      escut: user.infoPoders.escut,
      robarVida: user.infoPoders.robarVida,
      tempspregunta: user.infoPoders.tempspregunta,
    },
  };
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
    idPregunta: index,
    pregunta: preguntaaModificar.enunciat,
    categoria: preguntaaModificar.categoria,
    tipus: preguntaaModificar.tipus,
    respostes: JSON.parse("[" + preguntaaModificar.respostes + "]"),
    temps: preguntaaModificar.temps,
    unitats: {
      valorInicial: 0,
      unitatInicial: "",
      unitatFinal: "",
    },
  };
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
  let tempsAra = Date.now();
  user.temps = Math.round(Math.abs((tempsAra - start) / 10)) / 100;
  user.poder = "";
  user.infoPoders.robarVida = 0;
}

function respostaFallada(user, roomID, socket) {
  let room = arrayRoom.find((room) => room.id == roomID);
  if (room != undefined) {
    let arrayPreg = room.arrayPreg;
    let preguntasMal = room.preguntasMal;
    let llistatUsuaris = room.jugadors;
    let start = room.start;
    let llistatUsuarisMinim = [];

    let mort = false;
    let acabat = false;
    user.vida -= 5;
    if (user.infoPoders.escut) {
      user.infoPoders.escut = false;
      user.vida += 5;
    }

    if (user.infoPoders.robarVida > 0) {
      user.infoPoders.robarVida = 0;
    }

    user.falladesConsecutives++;
    user.encertades = 0;
    if (comprovarMort(user)) {
      matarJugador(user, start);
      socket.emit("die");
      mort = true;
    }

    if (user.falladesConsecutives == 3) {
      user.preguntaActual++;
      user.falladesConsecutives = 0;

      let preguntaEnviar = arrayPreg[user.preguntaActual];
      if (preguntaEnviar != undefined) {
        socket.emit("new question", preguntaEnviar);
      } else {
        user.preguntaActual = 0;
        let preguntaEnviar = arrayPreg[0];

        socket.emit("new question", preguntaEnviar);
      }

      if (user.infoPoders.tempspregunta > 0) {
        preguntaEnviar.temps -= user.infoPoders.tempspregunta;
        user.infoPoders.tempspregunta = 0;
        socket.emit("less time");
        //!!!! aquest encara s'ha de fer
      }
    }

    if (mort) {
      if (jugadorsVius(llistatUsuaris).length == 1) {
        acabat = true;
      }
    }
    llistatUsuaris.sort((a, b) => {
      return b.vida - a.vida;
    });

    llistatUsuarisMinim = llistaMinim(llistatUsuaris);

    arrayRoom.map((room) => {
      if (room.id == roomID) {
        room.jugadors = llistatUsuaris;
      }
    });

    io.to(roomID).emit("update players", llistatUsuarisMinim);
    socket.emit("check", false, acabat);

    if (acabat) acabarPartida(socket, roomID);
  }
}
/**
 * Crea un torneig amb la sala que se li indiqui i l'id del torneig a utilitzars
 * @param {string} roomID L'id de la room al qual es crea el torneig
 * @param {number} tournamentId Id del torneig, augmenta en 1 cada vegada que es crea un torneig
 */
async function generarTorneig(room) {
  // descomentar per a dinàmic

  await rendering(room);
}
function createUserTorneig(id, nick, maxJugadors) {

  return {
    idSocket: id,
    nick: nick,
    mort: false,
    avatar: 1,
    infoPartida: {
      matchID: "",
      encertades: 0,
      loser: false,
      nJugadors: maxJugadors,
    },
    oponent: {
      id: "",
      nick: "",
      avatar: 1,
      encertades: "",
    },


  };
}
async function rendering(room) {
  let torneo = {
    id: "PartidayxEpbmMqLoR-htTVAAAH",
    nom: "asdf",
    tipus: "torneo",
    maxJugadors: 8,
    jugadors: [
      {
        idSocket: "yxEpbmMqLoR-htTVAAAH",
        nick: "admin",
        encertades: 0,
        vida: 100,
        mort: false,
        duelo: {
          enDuelo: false,
          encertades: 0,
          indexPreg: [],
          oponent: { id: "", encertades: "" },
        },
      },
      {
        idSocket: "vJinmMhqMgEjymCyAAAF",
        nick: "asd",
        encertades: 0,
        vida: 100,
        mort: false,
        duelo: {
          enDuelo: false,
          encertades: 0,
          indexPreg: [],
          oponent: { id: "", encertades: "" },
        },
      },
      {
        idSocket: "KJ-wdzJ5p9_Tb31DAAAL",
        nick: "aasd",
        encertades: 0,
        vida: 100,
        mort: false,
        duelo: {
          enDuelo: false,
          encertades: 0,
          indexPreg: [],
          oponent: { id: "", encertades: "" },
        },
      },
      {
        idSocket: "T3bLh7Mezr2qNCxLAAAO",
        nick: "asdf",
        encertades: 0,
        vida: 100,
        mort: false,
        duelo: {
          enDuelo: false,
          encertades: 0,
          indexPreg: [],
          oponent: { id: "", encertades: "" },
        },
      },
      {
        idSocket: "Wj11CwTCeSkC_GcmAAAN",
        nick: "asdfasf",
        encertades: 0,
        vida: 100,
        mort: false,
        duelo: {
          enDuelo: false,
          encertades: 0,
          indexPreg: [],
          oponent: { id: "", encertades: "" },
        },
      },
      {
        idSocket: "CS_h44J77QEpPyyMAAAE",
        nick: "dfasfagf",
        encertades: 0,
        vida: 100,
        mort: false,
        duelo: {
          enDuelo: false,
          encertades: 0,
          indexPreg: [],
          oponent: { id: "", encertades: "" },
        },
      },
      {
        idSocket: "yVP3KutzoVUyHN59AAAB",
        nick: "fgfgfgfg",
        encertades: 0,
        vida: 100,
        mort: false,
        duelo: {
          enDuelo: false,
          encertades: 0,
          indexPreg: [],
          oponent: { id: "", encertades: "" },
        },
      },
      {
        idSocket: "dd1mYp-WXdO7O9c1AAAP",
        nick: "asdsadgdf",
        encertades: 0,
        vida: 100,
        mort: false,
        duelo: {
          enDuelo: false,
          encertades: 0,
          indexPreg: [],
          oponent: { id: "", encertades: "" },
        },
      },
    ],
    arrayPreg: null,
    preguntasMal: null,
    preguntasDuelo: null,
    preguntasDueloMal: null,
  };
  //   -----
  //   Estàtic
  //   -----
  await torneig.manager.create({
    id: torneo.id,
    tournamentId: torneo.id,
    name: torneo.nom,
    type: "double_elimination",
    number: 1,
    seeding: torneo.jugadors.map((jugador) => jugador.idSocket),
    settings: {
      size: torneo.maxJugadors,
      seedOrdering: ["natural", "natural", "reverse_half_shift", "reverse"],
      grandFinal: "double",
      matchesChildCount: 0,
    },
  });
  //   -----
  //   Dinàmic
  //   -----
  //   await torneig.manager.create({
  //     id: room.id,
  //     tournamentId: room.id,
  //     name: room.nom,
  //     type: "double_elimination",
  //     number: 1,
  //     seeding: room.jugadors,
  //     settings: {
  //       size: room.maxJugadors,
  //       seedOrdering: ["natural", "natural", "reverse_half_shift", "reverse"],
  //       grandFinal: "double",
  //       matchesChildCount: 0,
  //     },
  //   });
  const tournamentData = await torneig.manager.get.stageData(0);
  room.dataTorneig = tournamentData;
}

async function modificar() {
  await this.manager.update.match({
    id: this.idModificar,
    opponent1: { score: 1 },
    opponent2: { score: 2, result: "win" },
  });

  const tourneyData = await this.manager.get.stageData(0);
  this.data = tourneyData;
}

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
