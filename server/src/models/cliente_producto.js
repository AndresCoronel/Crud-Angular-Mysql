const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'elcoro'
})

let clienteproductoModel = {

};

clienteproductoModel.getClienteProducto = (callback) => {
    if (connection) {
        var sqlExists = `select c.id, c.nombreCliente, GROUP_CONCAT(p.nombreProducto)
        from cliente c INNER JOIN cliente_has_producto cp ON c.id = cp.cliente_id
        INNER JOIN producto p ON cp.producto_id = p.id GROUP BY c.id, c.nombreCliente `;

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

clienteproductoModel.getClientesProductos = (callBack) => {
    if (connection) {
        connection.query('SELECT * FROM cliente_has_producto ORDER BY id', (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                callBack(null, rows);
            }
        })
    }
}

clienteproductoModel.insertClientesProductos = (cliente_productoData, callBack) => {
    if (connection) {
        connection.query(
            'INSERT INTO cliente_has_producto SET ?', cliente_productoData, (err, result) => {

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

clienteproductoModel.updateClientesProductos = (cliente_productoData, callBack) => {
    if (connection) {
        var sql = `UPDATE cliente_has_producto SET
        cliente_id=${connection.escape(cliente_productoData.cliente_id)}, 
        producto_id=${connection.escape(cliente_productoData.producto_id)}
        WHERE id = ${connection.escape(cliente_productoData.id)}`;
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

clienteproductoModel.deletedClientesProductos = async (id, callback) => {
    if (connection) {
        var sqlExists = `
        SELECT * FROM cliente_has_producto WHERE id = ${connection.escape(id)}
      `;
        await connection.query(sqlExists, (err, row) => {
            if (row) {
                var sql = `DELETE FROM cliente_has_producto WHERE id=` + connection.escape(id);
                connection.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log('Registro eliminado')
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

clienteproductoModel.getProductoXcliente = (nombreCliente, callBack) => {

    if (connection) {
        var sqlExists = `SELECT * FROM cliente WHERE nombreCliente = ${connection.escape(nombreCliente)}`;

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

module.exports = clienteproductoModel;