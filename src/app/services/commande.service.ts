import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Cmt } from '../model/cmt.model';
import { Commande } from '../model/commande.model';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  public dataForm: FormGroup;
  constructor(private http: HttpClient, 
    private authService : AuthService) { }


   
  
  
    getAll():Observable<any>{
      return this.http.get('http://localhost:8081/api/commande/liste');
        }

        create(formData: FormData):Observable<any>{
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.post('http://localhost:8081/api/commande', formData , {headers:httpHeaders});
        }
}
