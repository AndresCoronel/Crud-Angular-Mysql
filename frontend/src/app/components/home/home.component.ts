import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  seleccionar(cliente: Cliente){
    this.clienteService.selectedCliente = cliente;
  }
}
