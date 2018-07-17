import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  selectedProducto: Producto;
  productos: Producto[];
  readonly URL_API = 'http://localhost:3000/producto';

  constructor(private http: HttpClient) {
    this.selectedProducto = new Producto();
  }

  getProducto() {
    return this.http.get(this.URL_API);
   }

  postProducto(Producto: Producto) {
    return this.http.post(this.URL_API, Producto);
   }

   putProducto(producto: Producto){
    return this.http.put(this.URL_API+ `/${producto.id}`, producto);
  }

  deleteProducto(id: number) {
    return this.http.delete(this.URL_API+`/${id}`);
   }



}
