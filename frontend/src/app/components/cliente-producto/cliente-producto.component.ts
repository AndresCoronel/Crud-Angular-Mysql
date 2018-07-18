import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteProductoService } from '../../services/cliente_producto/cliente-producto.service';
import { ClienteProducto } from '../../models/clienteproducto';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto';
import { ClienteService } from '../../services/cliente.service';
declare var M: any;
@Component({
  selector: 'app-users',
  templateUrl: './cliente-producto.component.html',
  styleUrls: ['./cliente-producto.component.css'],
  providers: [ClienteProductoService]
})
export class ClienteProductoComponent implements OnInit {

  constructor(private productoService: ProductoService,
     private clienteproductoService: ClienteProductoService,
     private clienteService: ClienteService

    ) { }

  ngOnInit() {
    this.getClientesProductos();
    this.getProductos();
    this.getClientes();
  }
  getClientes() {
    this.clienteService.getClientes()
      .subscribe(res => {
        this.clienteService.clientes = res as Cliente[];
      });
  }
  getProductos() {
    this.productoService.getProducto()
      .subscribe(res => {
        this.productoService.productos = res as Producto[];
      })
  };

  getClientesProductos() {
    this.clienteproductoService.getClientesProductos()
      .subscribe(res => {
        this.clienteproductoService.clientesproductos = res as ClienteProducto[];
      });
  }
  addClientesProductos(form: NgForm) {
    console.log("esto llego del form" + form.value.id)
    if (form.value.id) {
      this.clienteproductoService.putClientesProductos(form.value).subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({ html: 'clienteProducto actualizado' })
        this.getClientesProductos();
        this.getProductos();

      })
    } else {
      this.clienteproductoService.postClientesProductos(form.value).subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({ html: 'Cliente agregado' })
        this.getClientesProductos();

        this.getProductos();
      })
    }


  }
  deletedClientesProductos(id: number) {
    if (confirm('¿Quieres eliminar este cliente?')) {
      this.clienteproductoService.deleteClientesProductos(id)
        .subscribe(res => {
          M.toast({ html: 'Cliente eliminado' })
          this.getClientesProductos();
        })
    }
  }

  editClientesProductos(clienteproducto: ClienteProducto) {
    this.clienteproductoService.selectedClienteProducto = clienteproducto;

  }


  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.clienteproductoService.selectedClienteProducto = new ClienteProducto();
    }

  }
  seleccionarCliente(cliente: Cliente) {
    console.log('llego el cliente id: ' + cliente.id)
    this.clienteService.selectedCliente = cliente;

  }
  seleccionarProducto(producto: Producto) {
    console.log('llego el producto id: ' + producto.id)
    this.productoService.selectedProducto = producto;

  }
}
