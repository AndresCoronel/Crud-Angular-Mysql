export class Cliente {
    constructor(id='',cedulaCliente=0, nombreCliente='', apellidoCliente ='', telefonoCliente='' ){
        this.id= id;
        this.cedulaCliente= cedulaCliente;
        this.nombreCliente=nombreCliente;
        this.apellidoCliente=apellidoCliente;
        this.telefonoCliente=telefonoCliente;
    }
    id: string;
    cedulaCliente: number;
    nombreCliente: string;
    apellidoCliente:string;
    telefonoCliente:string;
    
}
