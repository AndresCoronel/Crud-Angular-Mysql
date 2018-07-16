const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'elcoro'
})

let clienteModel = {

};

clienteModel.getClientes = (callBack) => {
    if (connection) {
        connection.query('SELECT * FROM cliente ORDER BY id', (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                callBack(null, rows);
            }
        })
    }
}
clienteModel.getCliente = (id, callBack) => {
    if (connection){
        var sqlExists = `
        SELECT * FROM cliente WHERE id = ${connection.escape(id)}
      `;
      
    connection.query(sqlExists, (err, row) => {
        if (row) {
           callBack(null, row);
           }
           else {
               console.log("pailas")
           }
   })
    }
}

clienteModel.insertCliente = (clienteData, callBack) => {
    if (connection) {
        connection.query(
            'INSERT INTO cliente SET ?', clienteData, (err, result) => {

                if (err) {
                    throw err;
                }
                else {
                    callBack(null, {
                        'insertId': result.insertId
                    })
                }
            }

        )
    }
}

clienteModel.updateCliente = (clienteData, callBack) => {
    if (connection) {
        var sql = `UPDATE cliente SET
        cedulaCliente=${connection.escape(clienteData.cedulaCliente)}, 
        nombreCliente=${connection.escape(clienteData.nombreCliente)}, 
        apellidoCliente=${connection.escape(clienteData.apellidoCliente)},
        telefonoCliente=${connection.escape(clienteData.telefonoCliente)}
        WHERE id = ${connection.escape(clienteData.id)}`;
        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                callBack(null, {
                    "msg": "success"
                })
            }
        })
    }
}

clienteModel.deletedCliente = async (id, callback) => {
    if (connection) {
        var sqlExists = `
        SELECT * FROM cliente WHERE id = ${connection.escape(id)}
      `;
      await connection.query(sqlExists, (err, row) => {
            if (row) {
                var sql = `DELETE FROM cliente WHERE id=` + connection.escape(id);
               connection.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log('usuario eliminado')
                    }
                });
            } else {
                callback(null, {
                    msg: "not Exists"
                });
            }
        });
    }
}

module.exports = clienteModel;