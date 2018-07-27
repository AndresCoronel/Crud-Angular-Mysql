
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cliente } from '../models/cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  selectedCliente: Cliente;
  clientes: Cliente[];
  cp: Cliente[];
  
  private nombreCliente: string = '';


  readonly URL_API = 'http://localhost:3000/cliente';

  constructor(private http: HttpClient) { 
    this.selectedCliente = new Cliente();
  }

  getClientes(){
    return this.http.get(this.URL_API);
  }
  getCliente(id: string){
    return this.http.delete(this.URL_API+`/${id}` );

  }
  postCliente(Cliente: Cliente){
    return this.http.post(this.URL_API, Cliente);
  }

  putCliente(cliente: Cliente){
    return this.http.put(this.URL_API+ `/${cliente.id}`, cliente);
  }

  deleteCliente(id: number) {
    return this.http.delete(this.URL_API+`/${id}` );
  }

}
