import { Injectable } from '@angular/core';
import { ClienteProducto } from '../../models/clienteproducto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteProductoService {
  selectedClienteProducto: ClienteProducto;
  clientesproductos: ClienteProducto[];
  readonly URL_API = 'http://localhost:3000/clienteproducto';

  constructor(private http: HttpClient) {
    this.selectedClienteProducto = new ClienteProducto();
  }

  getClientesProductos() {
    return this.http.get(this.URL_API);
  }

  getClienteProducto(clienteproducto: ClienteProducto) {
    return this.http.put(this.URL_API + `/${clienteproducto.id}`, clienteproducto);
  }

  postClientesProductos(ClienteProducto: ClienteProducto) {
    return this.http.post(this.URL_API, ClienteProducto);
  }

  putClientesProductos(clienteproducto: ClienteProducto) {
    return this.http.put(this.URL_API + `/${clienteproducto.id}`, clienteproducto);
  }

  deleteClientesProductos(id: number) {
    return this.http.delete(this.URL_API + `/${id}`);
  }

}
