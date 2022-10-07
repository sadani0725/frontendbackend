import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'MyFrontEnd';

  users:any;
  loadedF = "user";

  constructor(private service : UserService) 
  {
    setTheme("bs3");
  }

  ngOnInit() {
    this.service.getUser().subscribe((data:any) => {
      this.users = data;
    });
  }

  onNavigate(f:string) {
    this.loadedF = f;
  };
}


