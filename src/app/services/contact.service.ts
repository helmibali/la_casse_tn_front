import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public dataForm: FormGroup;
  constructor(private http: HttpClient) { }

  createData(formData: FormData): Observable<any> {
    return this.http.post("http://localhost:8081/api/contact", formData);
  }

  getAll():Observable<any>{
return this.http.get('http://localhost:8081/api/contact/liste');
  }
}
