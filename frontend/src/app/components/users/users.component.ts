import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  addUser(form: NgForm ){
    this.userService.postUser(form.value).subscribe(res=>{
      console.log(res)
    })

  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }

  }

}
