const Cliente = require('../models/cliente');
const Producto = require('../models/producto');
const ClienteProducto = require ('../models/cliente_producto.js');

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
        // res.redirect('/clientes/' + data.insertid);
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

  /********************************** Productos ****************************/

  //obtener un producto
  app.get('/producto/:id', (req, res) => {
    var id = req.params.id;
    Producto.getProducto(id, (err, data) => {
      if (data) {
        res.status(200).json(data);
    }
  })
  });

//obtener todos los usuarios
  app.get('/producto', (req, res) => {
    Producto.getProductos((err, data) => {
      res.status(200).json(data);
    })
  });

//ingresart datos
  app.post('/producto', (req, res) => {
    var productoData = {
      id: null,
      nombreProducto: req.body.nombreProducto,
      precioProducto: req.body.precioProducto,
    };
    Producto.insertProducto(productoData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Nuevo producto agregado",
          data: data
        });
        // res.redirect('/Productos/' + data.insertid);
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    });
  });


//actualizar datos
  app.put('/producto/:id', (req, res) => {
    const productoData = {
      id: req.params.id,
      nombreProducto: req.body.nombreProducto,
      precioProducto: req.body.precioProducto,
    };
    Producto.updateProducto(productoData, (err, data) => {
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
  app.delete('/producto/:id', (req, res) => {
    var id = req.params.id;
    Producto.getProductos((err, data) => {
      console.log("recibio los ussuarios")
      res.status(200).json(data);
    })

    Producto.deletedProducto(id, (err, data) => {
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



/**************************************Cliente_has_Producto*****************************/
//cliente producto por cliente
app.get('/clienteproducto/:nombreCliente', (req, res) => {
  var nombreCliente = req.params.nombreCliente;
  ClienteProducto.getProductoXcliente(nombreCliente, (err, data) => {
    if (data) {
      res.status(200).json(data);
  }
})
});

//traer el cliente producto por id
app.get('/clienteproducto', (req, res) => {
  var id = req.params.id;
  ClienteProducto.getClienteProducto(id, (err, data) => {
    if (data) {
      res.status(200).json(data);
  }
})
});

//obtener todos los usuarios
app.get('/clienteproducto', (req, res) => {
  ClienteProducto.getClientesProductos((err, data) => {
    res.status(200).json(data);
  })
});

//ingresart datos
app.post('/clienteproducto', (req, res) => {
  console.log('llego al post')
  var cliente_productoData = {
    id: null,
    cliente_id: req.body.cliente_id,
    producto_id: req.body.producto_id
  };
  ClienteProducto.insertClientesProductos(cliente_productoData, (err, data) => {
    if (data && data.insertId) {
      res.status(200).json({
        success: true,
        msg: "Nuevo registro agregado",
        data: data
      });
      // res.redirect('/clienteproductos/' + data.insertid);
    } else {
      res.status(500).json({
        success: false,
        msg: "Error"
      });
    }
  });
});


//actualizar datos
app.put('/clienteproducto/:id', (req, res) => {
  const cliente_productoData = {
    id: req.params.id,
    cliente_id: req.body.cliente_id,
    producto_id: req.body.producto_id
  };
  ClienteProducto.updateClientesProductos(cliente_productoData, (err, data) => {
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
app.delete('/clienteproducto/:id', (req, res) => {
  var id = req.params.id;
  ClienteProducto.getClientesProductos((err, data) => {
    console.log("recibio los ussuarios")
    res.status(200).json(data);
  })

  ClienteProducto.deletedClientesProductos(id, (err, data) => {
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

