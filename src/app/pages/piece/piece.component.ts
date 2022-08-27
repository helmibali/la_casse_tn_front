import { Component, OnInit } from '@angular/core';
import { Piece } from 'src/app/model/piece.model';
import { PieceService } from 'src/app/piece.service';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {

  pieces : Piece[];

  constructor(private pieceService : PieceService) { }

  ngOnInit(): void {
    this.pieceService.listePiece().subscribe(ps => {
      console.log(ps);
      this.pieces = ps;
      });
  }

}
