import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteProductoService } from '../../services/cliente_producto/cliente-producto.service';
import { ClienteProducto } from '../../models/clienteproducto';
declare var M: any;
@Component({
  selector: 'app-users',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteProductoService]
})
export class ClienteProductoComponent implements OnInit {

  constructor(private clienteproductoService: ClienteProductoService) { }

  ngOnInit() {
    this.getClientesProductos();
  }
  getClientesProductos() {
    this.clienteproductoService.getClientesProductos()
      .subscribe(res => {
        this.clienteproductoService.clientesproductos = res as ClienteProducto[];
      });
  }
  addCliente(form: NgForm ){
    console.log("esto llego del form" + form.value.id)
    if(form.value.id){
      this.clienteproductoService.putClientesProductos(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'clienteProducto actualizado'})
        this.getClientesProductos();
     
      })
    }else{
      this.clienteproductoService.postClientesProductos(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Cliente agregado'})
        this.getClientesProductos();
      })
    }
    

  }
  deletedClientesProductos(id: number ){
    if(confirm('¿Quieres eliminar este cliente?')){
    this.clienteproductoService.deleteClientesProductos(id)
    .subscribe(res=>{
      M.toast({html: 'Cliente eliminado'})
      this.getClientesProductos();  
    } )
  }}

  editClientesProductos(clienteproducto: ClienteProducto){
    this.clienteproductoService.selectedClienteProducto = clienteproducto;

  }


  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.clienteproductoService.selectedClienteProducto = new ClienteProducto();
    }

  }
  
}
