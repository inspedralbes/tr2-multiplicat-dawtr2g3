import express from 'express';
import { data } from "./preguntes.js";
const app = express()
const port = 3000

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

console.log("info", data);
 
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