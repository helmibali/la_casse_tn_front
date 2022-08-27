import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Cart } from '../model/cart.model';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public dataForm: FormGroup;
  constructor(private http: HttpClient, 
     private authService : AuthService) { }
  createCart(formData: FormData):Observable<Cart>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Cart>('http://localhost:8081/api/add-to-cart',formData,{headers:httpHeaders});
  }

  getAll():Observable<any>{
    return this.http.get('http://localhost:8081/api/liste-cart');
      }

      getByUsername(username:string):Observable<any>{
        const url = `${'http://localhost:8081/api/liste-cart'}/${username}`;
        return this.http.get(url);
          }

          prixByUsername(username:string):Observable<any>{
            const url = `${'http://localhost:8081/api/prix-cart'}/${username}`;
            return this.http.get(url);
              }

              getByUsernameEnCours(username:string):Observable<any>{
                const url = `${'http://localhost:8081/api/liste-cart-en-cours'}/${username}`;
                return this.http.get(url);
                  }

        getByUsernameEnCommade(username:string):Observable<any>{
          const url = `${'http://localhost:8081/api/liste-cart-en-commande'}/${username}`;
          return this.http.get(url);
            }

              
supprimerCart(id: number){
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  const url = `${'http://localhost:8081/api/cart'}/${id}`;
  return this.http.delete(url,{headers:httpHeaders});
  }

}
