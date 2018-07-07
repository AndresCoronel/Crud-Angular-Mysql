const User = require('../models/user');

module.exports = function (app) {
//obtener un usuario
  app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    User.getUser(id, (err, data) => {
      if (data) {
        res.status(200).json(data);
    }
  })
  });

//obtener todos los usuarios
  app.get('/users', (req, res) => {
    User.getUsers((err, data) => {
      res.status(200).json(data);
    })
  });

//ingresart datos
  app.post('/users', (req, res) => {
    const userData = {
      id: null,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      created_at: null,
      updated_at: null
    };
    User.insertUser(userData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
        // res.redirect('/users/' + data.insertId);
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    });
  });


//actualizar datos
  app.put('/users/:id', (req, res) => {
    const userData = {
      id: req.params.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      created_at: null,
      updated_at: null
    };
    User.updateUser(userData, (err, data) => {
      if (data && data.msg) {
        res.status(200).json({ data });
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    })

  })

//eliminar un usuario
  app.delete('/users/:id', (req, res) => {
    var id = req.params.id;
    User.getUsers((err, data) => {
      res.status(200).json(data);
    })

    User.deleteUser(id, (err, data) => {
      if (data && data.msg === 'deleted' || data.msg == 'not Exists') {
        res.json({
          success: 'true',
          data
        });
      } else {
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });
};

