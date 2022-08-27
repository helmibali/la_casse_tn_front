import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Gouvernorat } from '../model/gouvernorat.model';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {

  constructor(private http : HttpClient,private authService: AuthService) { }

  listeGouvernorats():Observable<Gouvernorat[]>{
  
    return this.http.get<Gouvernorat[]>('http://localhost:8081/api/gouvernorats');
  }
  ajouter(d : Gouvernorat):Observable<Gouvernorat>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Gouvernorat>('http://localhost:8081/api/gouvernorat',d,{headers:httpHeaders});
  }
}
