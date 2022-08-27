import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Role } from './model/role.model';
import { User } from './model/user.model';

const httpOPtions = {
  headers: new HttpHeaders ({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public loggedUser:string;
public loggedUserId:number;
public loggedUserPassword:String;
public isloggedIn:Boolean=false;
public roles!:string[];
token!:string;
private helper = new JwtHelperService();
public countMsg: number;
apiURL: string = '/api/login';
apiURLall: string = '/api/users/liste';

  constructor(private router:Router, private http:HttpClient) { }

  login(user : User)
  {
  return this.http.post<User>('http://localhost:8081/login', user , {observe:'response'});
  }




  
  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
this.token = jwt;
this.isloggedIn = true;
this.decodeJWT();

    }
    decodeJWT()
{ if (this.token == undefined)
 return;
const decodedToken = this.helper.decodeToken(this.token);
this.roles = decodedToken.roles;
this.loggedUser = decodedToken.sub;
}

    loadToken() {
      this.token = localStorage.getItem('jwt')!;
this.decodeJWT();
      }
      getToken():string {
      return this.token;
      }
     
   
  getUserFromDB(username:string):Observable<User>
  {
    const url = `${'http://localhost:8081/api/info'}/${username}`;
    return this.http.get<User>(url)
  }

  getUserslist(){
    let jwt = this.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return  this.http.get('http://localhost:8081/all',{headers:httpHeaders});
  }
  setLoggedUserFromLocalStorage(login : string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    // this.getUserRoles(login);
    }
  signIn(user:User)
  {
    this.loggedUser=user.username;
    this.isloggedIn=true;
   // this.roles=user.roles;
    localStorage.setItem('jwt',this.token);
    localStorage.setItem('loggedUser',this.loggedUser);
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
 
  }




    isAdmin():Boolean{
      if (!this.roles) //this.roles== undefiened
      return false;
      return (this.roles.indexOf('ADMIN') >-1) ;
      ;
    }  


      addUser(user:User):Observable<User>{
        return this.http.post<User>('http://localhost:8081/api/user/add', user,httpOPtions);
      }
      logout() {
        this.loggedUser = undefined!;
        this.roles = undefined!;
        this.token= undefined!;
        this.isloggedIn = false;
        localStorage.removeItem('jwt');
        localStorage.removeItem('loggedUser');
        localStorage.setItem('isloggedIn',String(this.isloggedIn));
        this.router.navigate(['/login']);
        }
 
    isTokenExpired(): Boolean
    {
    return this.helper.isTokenExpired(this.token); }
    

    

    
    
   
    
}