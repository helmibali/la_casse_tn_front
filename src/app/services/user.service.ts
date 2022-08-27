import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../model/user.model';

const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:User[];
  baseUrl:'/api/user';
  public dataForm: FormGroup;

  constructor(private http: HttpClient, private authService : AuthService) { }

  uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
    return this.http.request(req);
  }
  getUserById(user_id: number):Observable<User> {
    return this.http.get<User>(`${'http://localhost:8081/api/infoUserById'}/${user_id}`);
  }
  getUserByUsername(username: string):Observable<User> {
    return this.http.get<User>(`${'http://localhost:8081/api/info'}/${username}`);
  }
  getAllUsername():Observable<any> {
    return this.http.get<any>('http://localhost:8081/api/usernames');
  }

  getUserByDiscussion(username: string):Observable<any> {
    return this.http.get<any>(`${'http://localhost:8081/api/user-contact'}/${username}`);
  }
  createData(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/api/signup', formData);
  }
  createDataSocial(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/api/user/social', formData);
  }
  createDataWithFile(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/api/signupwithimg', formData);
  }
  getRoleslist(){
    return  this.http.get('http://localhost:8081/api/role/liste');
  }
  updateData(formData: FormData ,user_id): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put(`${'http://localhost:8081/api/user'}/${user_id}`, formData,{headers:httpHeaders});
  }

  updateRole(u:User,user_id:number): Observable<User> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<User>(`${'http://localhost:8081/api/user'}/${user_id}`, u,{headers:httpHeaders});
  }
updateImageUser(formData:FormData , user_id):Observable<any> {
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.put(`${'http://localhost:8081/api/userImg'}/${user_id}`, formData,{headers:httpHeaders})
}
updateImagePw(formData:FormData , user_id):Observable<any> {
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.put(`${'http://localhost:8081/api/userPw'}/${user_id}`, formData,{headers:httpHeaders})
}


supprimerUtilisateur(id: number){
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  const url = `${'http://localhost:8081/api/user'}/${id}`;
  return this.http.delete(url,{headers:httpHeaders});
  }
}
