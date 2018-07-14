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
    this.userService.postUser(form.value).subscribe(res=>{
      console.log(res);
      this.resetForm(form);
      this.getUsers();
    })

  }
  deletedUser(id: number ){
    if(confirm('Are you sure you want delete this?')){
    this.userService.deleteUser(id)
    .subscribe(res=>{
      M.toast({html: 'deleted successfuly'})
      this.resetForm();
      this.getUsers();  
    } )
  }}
  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }

  }

}
