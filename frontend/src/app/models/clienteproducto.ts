export class ClienteProducto {
    constructor(id='',cliente_id='', producto_id='' ){
        this.id= id;
        this.cliente_id= cliente_id;
        this.producto_id=producto_id;
    }
    id: string;
    cliente_id: string;
    producto_id: string;
    
}
