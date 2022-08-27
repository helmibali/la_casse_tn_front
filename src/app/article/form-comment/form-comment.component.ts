import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Article } from 'src/app/model/article.model';



@Component({
  selector: 'comment-form',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.css']
})
export class FormCommentComponent implements OnInit {
@Input() submitLabel !:string;
@Input() hasCancelButton: boolean = false;
@Input() initialText: string = '';
@Input()
a!: Article;
@Output() handleSubmit = new EventEmitter<string>();
@Output()
handleCancel = new EventEmitter<void>();

user:string = this.authService.loggedUser;

form!:FormGroup;
  constructor(
    private fb: FormBuilder,
    public authService : AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.initialText,Validators.required],

      
    })
  }

  onSubmit():void{
console.log('onSubmit',this.form.value);
this.handleSubmit.emit(this.form.value.title);
this.form.reset();
  }

}
