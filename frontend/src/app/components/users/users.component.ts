import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
declare var M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers()
      .subscribe(res => {
        this.userService.users = res as User[];
        console.log(res)
      });
  }
  addUser(form: NgForm ){
    console.log(form.value)
    if(form.value.id){
      this.userService.putUser(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Usuario actualizado'})
        this.getUsers();
     
      })
    }else{
      this.userService.postUser(form.value).subscribe(res=>{
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Usuario agregado'})
        this.getUsers();
      })
    }
    

  }
  deletedUser(id: number ){
    if(confirm('Are you sure you want delete this?')){
    this.userService.deleteUser(id)
    .subscribe(res=>{
      M.toast({html: 'deleted successfuly'})
      this.getUsers();  
    } )
  }}

  editUser(user: User){
    this.userService.selectedUser = user;

  }


  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }

  }

}
