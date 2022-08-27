import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Modele } from '../model/modele.model';


const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
modeles:Modele[];
apiUrl:'http://localhost:8081/api/modele';
public dataForm: FormGroup;
  constructor(
    private http: HttpClient,private authService:AuthService
  ) { }

  getAll(): Observable<any> {
   
    return this.http.get('http://localhost:8081/api/modele/liste');
  }
  consulterModele(id : number): Observable<Modele>{

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Modele>(url);
  
  }
  updateCategorie(m : Modele ,id :number):Observable<Modele>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Modele>(url , m, {headers:httpHeaders} );

  }
  ajouterCategorie(formData: FormData):Observable<any>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<any>('http://localhost:8081/api/modele/add',formData,{headers:httpHeaders});
  }
  supprimerCategorie(id: number){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url,{headers:httpHeaders});
    }

    getAllModeles():Observable<any>{
      return this.http.get<any>('http://localhost:8081/api/modele/liste');
    }

    getAllModelesByMarque_id(id:number):Observable<any>{
      return this.http.get<any>(`${'http://localhost:8081/api/modeleByMarqueId'}/${id}`);
    }
    
}
