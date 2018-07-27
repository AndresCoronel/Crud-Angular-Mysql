import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(ninjas: any, term: any): any {
    //mirar si es undefined
    if(term === undefined) return ninjas;
    //llenar el filtro nuevo
    return ninjas.filter(function(ninja){
      return ninja.nombreCliente.toLowerCase().includes(term.toLowerCase());
    });
  }

}
