import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'producto'
})
export class ProductoPipe implements PipeTransform {

  transform(ninjas: any, pro: any): any {
    //mirar si es undefined
    if(pro === undefined) return ninjas;
    //llenar el filtro nuevo
    return ninjas.filter(function(ninja){
      return ninja.nombreProducto.toLowerCase().includes(pro.toLowerCase());
    });
  }

}
