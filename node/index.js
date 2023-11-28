const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');

function conectarBBDD() {
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
});

app.get('/:mensage', (req, res) => {
    connexio = conectarBBDD();
    
    connexio.connect(function (err) {
        if (err) throw err;
        var sql = `INSERT INTO probanode (mensage) VALUES ('${req.params.nom}', '${req.params.mensage}')`;
        connexio.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            tancarBBDD(connexio);
          });
    });
});

app.get('/eliminar/:id', (req, res) => {
    connexio = conectarBBDD();
    
    connexio.connect(function (err) {
        if (err) throw err;
        var sql = `DELETE FROM probanode WHERE id = ${req.params.id}`;
        connexio.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            tancarBBDD(connexio);
          });
    });
});

app.get('/modificar/:id/:key/:valor', (req, res) => {
    connexio = conectarBBDD();
    
    connexio.connect(function (err) {
        if (err) throw err;
        var sql = `UPDATE probanode SET ${req.params.key} = '${req.params.valor}' WHERE id = '${req.params.id}'`;
        connexio.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            tancarBBDD(connexio);
          });
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})