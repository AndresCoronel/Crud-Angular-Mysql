const mysql = require('mysql');
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'elcoro'
})
let productoController = {

};

productoController.getProductos = (callBack) => {
    if (connection) {
        connection.query('SELECT * FROM producto ORDER BY id', (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                callBack(null, rows);
            }
        })
    }
}
productoController.getProducto = (id, callBack) => {
    if (connection){
        var sqlExists = `SELECT * FROM producto WHERE id = ${connection.escape(id)}`;
      
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

productoController.insertProducto = (productoData, callBack) => {
    if (connection) {
        connection.query(
            'INSERT INTO producto SET ?', productoData, (err, result) => {

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

productoController.updateProducto = (productoData, callBack) => {
    if (connection) {
        console.log("entro en productojs en server")
        var sql = `UPDATE producto SET
        nombreProducto=${connection.escape(productoData.nombreProducto)}, 
        precioProducto=${connection.escape(productoData.precioProducto)} 
        WHERE id = ${connection.escape(productoData.id)}`;
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

productoController.deletedProducto = async (id, callback) => {
    if (connection) {
        var sqlExists = `
        SELECT * FROM producto WHERE id = ${connection.escape(id)}
      `;
      await connection.query(sqlExists, (err, row) => {
            if (row) {
                var sql = `DELETE FROM producto WHERE id=` + connection.escape(id);
               connection.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log('producto eliminado')
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

module.exports = productoController;