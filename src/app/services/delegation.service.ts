import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Delegation } from '../model/delegation.model';

const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class DelegationService {

  constructor(private http : HttpClient,private authService: AuthService) { }

  ListeDelegation():Observable<Delegation[]>{
    return this.http.get<Delegation[]>('http://localhost:8081/api/delegations')
  }

  ListDelegationByGouvernourat_id(id:number):Observable<any>{
    return this.http.get<any>(`${'http://localhost:8081/api/delegations'}/${id}`)
  }

  ajouterDelegation(d : Delegation):Observable<Delegation>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Delegation>('http://localhost:8081/api/delegation',d,{headers:httpHeaders});
  }
}
