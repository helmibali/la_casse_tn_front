import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Article } from 'src/app/model/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
articles:Article[];
article:Article;
comments:Comment[];
comment:Comment;
newComment:Comment;

  constructor(private articleService:ArticleService,
    public commentService:CommentService,
    public authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {
    this.ArticlesList();
  }

  ArticlesList(){
    this.articleService.listeArticles().subscribe(a=>{
      console.log(a);
      this.articles=a;
    
    });
  }

  

}
