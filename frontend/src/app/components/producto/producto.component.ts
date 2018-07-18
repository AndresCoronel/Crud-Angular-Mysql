import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto';
import { NgForm } from '@angular/forms';
declare var M: any;
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],  
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProducto()
      .subscribe(res => {
        this.productoService.productos = res as Producto[];
      })
  };

  addProducto(form: NgForm ){
    console.log("esto llego del form" + form.value.id)
    if(form.value.id){
      console.log("llego al put")
      this.productoService.putProducto(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Producto actualizado'})
        this.getProductos();
     
      })
    }else{
      console.log("llego al post")
      this.productoService.postProducto(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Producto agregado'})
        this.getProductos();
      })
    }
    

  }

  editProducto(producto: Producto){
    this.productoService.selectedProducto = producto;
  }

  deletedProducto(id: number){
    if(confirm('¿Quieres eliminar este producto?')){
      this.productoService.deleteProducto(id)
      .subscribe(res=>{
        M.toast({html: 'Producto Eliminado'});
        this.getProductos();
      })
    }
  };

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.productoService.selectedProducto = new Producto();
    }
  }

}
