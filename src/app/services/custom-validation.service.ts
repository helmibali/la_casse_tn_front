import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor(private http: HttpClient) { }

  validateUsernameNotTaken(control: AbstractControl) {
    return this.checkUsernameNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { usernameTaken: true };
      })
    );
  }
  checkUsernameNotTaken(username: string):Observable<Boolean> {
    return this.http.get("http://localhost:8081/api/usernames").pipe(
      map((usernameList: Array<any>) =>
        usernameList.filter(user => user.username === username)
      ),
      map(users => !users.length)
    );
  }
  usernameExist(username:string) {
   
   
  } 

 
}
