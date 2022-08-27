
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ActiveCommentInterface } from 'src/app/model/activeComment';
import { Article } from 'src/app/model/article.model';
import { Cmt } from 'src/app/model/cmt.model';

import { User } from 'src/app/model/user.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments:Cmt[];
 
  activeComment:ActiveCommentInterface | null = null;

  @Input()
  a!: Article

  constructor(private commentService :CommentService,
    private router : Router,
    public authService : AuthService) { }

  ngOnInit(): void {
   this.commentService.getCommentsByArticle(this.a.id).subscribe(c => {
     this.comments=c;
   })
}

 

  addComment({
    text,
    parentId, 
    articleId
  }: {
    text:string,
    parentId: number | null,
    articleId:number;
  }):void
  {
this.commentService.createComment(text,parentId,articleId).subscribe(c=>{
  this.comments = [...this.comments, c];
  this.activeComment = null;
})
}





// getReplies(commentId: number): Cmt[] {
//   return this.a.comments
//    .filter((comment) => comment.parentId == commentId)
//     .sort(
//       (a, b) =>
//         new Date(a.dateComment).getTime() - new Date(b.dateComment).getTime()
//    );
// }

// setActiveComment(activeComment: ActiveCommentInterface | null): void {
//   this.activeComment = activeComment;
// }

deleteComment(commentId: number): void {
  this.commentService.deleteComment(commentId).subscribe(() => {
    this.comments = this.comments.filter(
      (comment) => comment.id !== commentId
    );
    
  });
  this.router.navigate(['actualite']).then(()=> {
    // window.location.reload();
  });
}

// getRootComments():Cmt[] {
//   return this.comments.filter((comment) => comment.parentId === null);
// }

}
