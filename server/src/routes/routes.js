const Cliente = require('../models/cliente');

module.exports = function (app) {
//obtener un usuario
  app.get('/cliente/:id', (req, res) => {
    var id = req.params.id;
    Cliente.getCliente(id, (err, data) => {
      if (data) {
        res.status(200).json(data);
    }
  })
  });

//obtener todos los usuarios
  app.get('/cliente', (req, res) => {
    Cliente.getClientes((err, data) => {
      res.status(200).json(data);
    })
  });

//ingresart datos
  app.post('/cliente', (req, res) => {
    var clienteData = {
      id: null,
      cedulaCliente: req.body.cedulaCliente,
      nombreCliente: req.body.nombreCliente,
      apellidoCliente: req.body.apellidoCliente,
      telefonoCliente: req.body.telefonoCliente,
    };
    Cliente.insertCliente(clienteData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Nuevo usuario agregado",
          data: data
        });
        // res.redirect('/Clientes/' + data.insertid);
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    });
  });


//actualizar datos
  app.put('/cliente/:id', (req, res) => {
    const clienteData = {
      id: req.params.id,
      cedulaCliente: req.body.cedulaCliente,
      nombreCliente: req.body.nombreCliente,
      apellidoCliente: req.body.apellidoCliente,
      telefonoCliente: req.body.telefonoCliente,
    };
    Cliente.updateCliente(clienteData, (err, data) => {
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
  app.delete('/cliente/:id', (req, res) => {
    var id = req.params.id;
    Cliente.getClientes((err, data) => {
      console.log("recibio los ussuarios")
      res.status(200).json(data);
    })

    Cliente.deletedCliente(id, (err, data) => {
      if (data) {
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

