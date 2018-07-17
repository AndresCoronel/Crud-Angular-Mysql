export class Producto {
    constructor(id='' ,precioProducto=0, nombreProducto='', ){
        this.id= id;
        this.precioProducto= precioProducto;
        this.nombreProducto=nombreProducto;
    }
    id: string;
    precioProducto: number;
    nombreProducto: string;    
}
