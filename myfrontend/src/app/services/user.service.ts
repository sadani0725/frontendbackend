import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../users/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:5293/user";

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };

  getUser() {
    return this.http.get(this.url);
  }

  create(user:User) {
    if(!user.birth) {
      user.birth = new Date();
    }

    user.id = 0;
    console.log("Itt: " + JSON.stringify(user));
    return this.http.post(this.url, JSON.stringify(user), this.httpOptions);  
  };

  update(user:User) : Observable<User> {
    return this.http.put<User>(this.url + "?id=" + user.id, JSON.stringify(user), this.httpOptions);
  };

  delete(id:number) {
    return this.http.delete<User>(this.url + "?id=" + id, this.httpOptions);
  };
}
