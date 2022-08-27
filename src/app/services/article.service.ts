import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Article } from '../model/article.model';

const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public dataForm: FormGroup;

  constructor(private http: HttpClient,private authService : AuthService) { }
  uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
    return this.http.request(req);
  }
  getArticleById(id: number):Observable<Article> {
    return this.http.get<Article>(`${'http://localhost:8081/api/article'}/${id}`);
  }
  createData(formData: FormData): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post('http://localhost:8081/api/article', formData,{headers:httpHeaders});
  }
  createDataWithImg(formData: FormData): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post('http://localhost:8081/api/articleWithImg', formData,{headers:httpHeaders});
  }
  updateData(formData: FormData,id:number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put(`${'http://localhost:8081/api/article'}/${id}`, formData ,{headers:httpHeaders});
  }
  listeArticles():Observable<Article[]>{
  
    return this.http.get<Article[]>('http://localhost:8081/api/articles');
  }
  listeArticlesByUser(username:string):Observable<Article[]>{
  
    return this.http.get<Article[]>(`${'http://localhost:8081/api/article-par-utlisateur'}/${username}`);
  }
  supprimerArticle(id: number){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${'http://localhost:8081/api/article'}/${id}`;
    return this.http.delete(url ,{headers:httpHeaders});
    }

}
