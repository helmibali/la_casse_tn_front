import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Article } from 'src/app/model/article.model';
import { Produit } from 'src/app/model/produit.model';
import { User } from 'src/app/model/user.model';
import { ProduitService } from 'src/app/produit.service';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit {
articles:Article[];
produits:Produit[];
user:User;
p:number=1;

  constructor(public articleService:ArticleService,private userService: UserService ,private produitService:ProduitService,public authService:AuthService) { }

  ngOnInit(): void {
    this.articleService.listeArticles().subscribe(a=>{
      this.articles=a;
    })
    this.produitService.listeProduits().subscribe(a=>{
      this.produits=a;
    })
    this.userService.getUserByUsername(this.authService.loggedUser).subscribe(u=>{this.user=u})
  }
}
