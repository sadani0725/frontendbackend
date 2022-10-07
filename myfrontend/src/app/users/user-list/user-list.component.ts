import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../user.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {

  users!:User[];
  isNew!:Boolean;
  modalRef!:BsModalRef;
  userForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('string'),
    lastName: new FormControl('string'),
    birth: new FormControl('2020-09-08T06:01:10.899Z')
  });

  constructor(private datePipe:DatePipe, private service: UserService, public formBuilder: FormBuilder, private modalService: BsModalService) { }

  reload() {
    this.isNew = true;

    this.service.getUser().subscribe((data:any) => {
      this.users = data;
    });

    this.userForm = this.formBuilder.group({
      id: 0,
      firstName: "",
      lastName: "",
      birth: this.datePipe.transform(new Date(),"yyyy-MM-dd")
    });
  }

  newUser(template:TemplateRef<any>){
    this.reload();
    this.modalRef = this.modalService.show(template);

  };

  createUser() {
    this.service.create(this.userForm.value).subscribe((resp:any) => {
      this.reload();
      console.log("A felhasználó létrehozásra került!");
      this.modalRef.hide();
    });
  };

  updateUser() {
    this.service.update(this.userForm.value).subscribe((resp:any) => {
      this.reload();
      console.log("A felhasználó megváltoztatásra került!");
      this.modalRef.hide();
    });
  };

  editUser(user:User, template:TemplateRef<any>) {
    this.isNew = false;

    this.userForm = this.formBuilder.group({
      id: [user.id],
      firstName: [user.firstName],
      lastName: [user.lastName],
      birth: this.datePipe.transform(user.birth,"yyyy-MM-dd")
    });

    this.modalRef = this.modalService.show(template);
  };

  deleteUser(id:number) {
    if(confirm("Biztosan törölni szeretné a felhasználót?")) {
      this.service.delete(id).subscribe((resp:any) => {
        this.reload();
        console.log("A felhasználó törlésre került!");
      });
    }
  };

  ngOnInit(): void {
    this.reload();
  }

}
