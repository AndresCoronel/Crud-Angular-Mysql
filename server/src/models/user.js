const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'testapirest'
})

let userModel = {

};

userModel.getUsers = (callBack) => {
    if (connection) {
        connection.query('SELECT * FROM users ORDER BY id', (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                callBack(null,{
                    "msg": "uno"
                } );
            }
        })
    }
}
userModel.getUser = (id, callBack) => {

    var sqlExists = `
    SELECT * FROM users WHERE id = ${connection.escape(id)}
  `;
    connection.query(sqlExists, (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            callBack(null, rows);
        }
    })
}

userModel.insertUser = (userData, callBack) => {
    if (connection) {
        connection.query(
            'INSERT INTO users SET ?', userData, (err, result) => {

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

userModel.updateUser = (userData, callBack) => {
    if (connection) {
        const sql = `UPDATE users SET
        username=${connection.escape(userData.username)}, 
        password=${connection.escape(userData.password)},
        email=${connection.escape(userData.email)}
        WHERE id = ${connection.escape(userData.id)}
        `

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

userModel.deleteUser = (id, callback) => {
    if (connection) {
        var sqlExists = `
        SELECT * FROM users WHERE id = ${connection.escape(id)}
      `;
        connection.query(sqlExists, (err, row) => {
            if (row) {
                var sql = `DELETE FROM users WHERE id=` + connection.escape(id);
                connection.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            "msg": "deleted"
                        });
                    }
                });
            } else {
                callback(null, {
                    "msg": "not Exists"
                });
            }
        });
    }
}

module.exports = userModel;