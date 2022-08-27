import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Article } from 'src/app/model/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  articles:Article[];
  article:Article;
  p:number=1;

  constructor(private articleService : ArticleService,
    private router : Router,
    public authService : AuthService) { }
  ngOnInit(): void {
    this.ArticlesList();
  }

  ArticlesList(){
    this.articleService.listeArticles().subscribe(a=>{
      console.log(a);
      this.articles=a;
    });
  }

  supprimerArticle(a:Article){

    let conf = confirm("Etes vous sur ?");
    if (conf) 
    this.articleService.supprimerArticle(a.id).subscribe(()=>{
      console.log("Article supprimé");
    });
    this.router.navigate(['articles']).then(()=> {
      window.location.reload();
    });
   }

}
