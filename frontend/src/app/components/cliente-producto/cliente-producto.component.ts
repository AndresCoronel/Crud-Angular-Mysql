import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteProductoService } from '../../services/cliente_producto/cliente-producto.service';
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
        this.clienteproductoService.clientes = res as Cliente[];
      });
  }
  addCliente(form: NgForm ){
    console.log("esto llego del form" + form.value.id)
    if(form.value.id){
      this.clienteproductoService.putCliente(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Cliente actualizado'})
        this.getClientesProductos();
     
      })
    }else{
      this.clienteproductoService.postCliente(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Cliente agregado'})
        this.getClientesProductos();
      })
    }
    

  }
  deletedCliente(id: number ){
    if(confirm('¿Quieres eliminar este cliente?')){
    this.clienteproductoService.deleteCliente(id)
    .subscribe(res=>{
      M.toast({html: 'Cliente eliminado'})
      this.getClientesProductos();  
    } )
  }}

  editCliente(cliente: Cliente){
    this.clienteproductoService.selectedCliente = cliente;

  }


  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.clienteproductoService.selectedCliente = new Cliente();
    }

  }
  
}