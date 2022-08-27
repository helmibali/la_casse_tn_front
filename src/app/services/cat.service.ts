import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Categorie } from '../model/categorie.model';

const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };
@Injectable({
  providedIn: 'root'
})
export class CatService {
  apiURL:string = 'http://localhost:8081/api/categorie';
  apiURLu:string = 'http://localhost:8081/api/categorie/update';
  apiURLd:string = 'http://localhost:8081/api/categorie/delete';

  constructor(private http : HttpClient,private authService: AuthService) { }

  listeCategories():Observable<Categorie[]>{
  
    return this.http.get<Categorie[]>('http://localhost:8081/api/categorie/liste');
  }
  consulterCategorie(id : number): Observable<Categorie>{

    const url = `${this.apiURL}/${id}`;
    return this.http.get<Categorie>(url);
  
  }

  updateCategorie(cat : Categorie ,id :number):Observable<Categorie>{
    const url = `${this.apiURLu}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Categorie>(url , cat, {headers:httpHeaders} );

  }
  ajouterCategorie(cat : Categorie):Observable<Categorie>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Categorie>('http://localhost:8081/api/categorie/add',cat,{headers:httpHeaders});
  }
  supprimerCategorie(id: number){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.apiURLd}/${id}`;
    return this.http.delete(url, {headers:httpHeaders});
    }
    listeCategorieByFamille(id:number):Observable<Categorie[]>{
      const url = `${'http://localhost:8081/api/categoriesByFamille'}/${id}`;
      return this.http.get<Categorie[]>(url);
    }
}


