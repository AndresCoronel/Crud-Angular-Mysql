import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../../services/cliente.service";
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
declare var M: any;
@Component({
  selector: 'app-users',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteService]
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.getClientes();
  }
  getClientes() {
    this.clienteService.getClientes()
      .subscribe(res => {
        this.clienteService.clientes = res as Cliente[];
      });
  }
  addCliente(form: NgForm ){
    console.log("esto llego del form" + form.value.id)
    if(form.value.id){
      this.clienteService.putCliente(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Cliente actualizado'})
        this.getClientes();
     
      })
    }else{
      this.clienteService.postCliente(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Cliente agregado'})
        this.getClientes();
      })
    }
    

  }
  deletedCliente(id: number ){
    if(confirm('¿Quieres eliminar este cliente?')){
    this.clienteService.deleteCliente(id)
    .subscribe(res=>{
      M.toast({html: 'Cliente eliminado'})
      this.getClientes();  
    } )
  }}

  editCliente(cliente: Cliente){
    this.clienteService.selectedCliente = cliente;

  }


  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.clienteService.selectedCliente = new Cliente();
    }

  }
  
}
