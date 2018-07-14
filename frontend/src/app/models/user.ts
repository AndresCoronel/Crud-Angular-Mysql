export class User {
    constructor(id=0, username='', email ='', password='' ){
        this.id= id;
        this.username=username;
        this.email=email;
        this.password=password;
    }

    id: number;
    username: string;
    email:string;
    password:string;
    
}
