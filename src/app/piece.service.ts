import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Piece } from './model/piece.model';
const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class PieceService {
  pieces: Piece[];
  apiURL: string = 'http://localhost:8085/api/produits';
constructor(private http : HttpClient) {
}
listePiece(): Observable<Piece[]>{
return this.http.get<Piece[]>(this.apiURL);
}


  
}
