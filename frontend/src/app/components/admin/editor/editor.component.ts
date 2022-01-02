import { NewsService } from '../../../services/news.service';
import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { News, NewsPostResponse, NewsResponse } from 'src/app/models/news';
import { DialogComponent, dialogTypes } from '../../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { EditorConfig } from './editor.config';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { componentConfig, editorModes } from '../../component.config';

/**
 * # EditorComponent
 * 
 * ## Description
 * 
 * ## Example Usage
 * 
 * ```html
 * <app-editor></app-editor>
 * ```
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  public newsFormGroup: FormGroup;
  public mode: editorModes = editorModes.new
  public editorConfig: AngularEditorConfig = EditorConfig;

  /**
   * # Description
   * Constructs an instance of {@link EditorComponent}
   * @param news {@link NewsService} for making service calls to Innovation Lab API
   * @param formBuilder {@link FormBuilder} for creating reactive form grups
   * @param activatedRoute {@link ActivatedRoute} for passing in path parameter
   * @param snackBar {@link MatSnackBar} for displaying results of user actions
   * @param dialog {@link MatDialog} for displaying pop-up dialogs
   */
  constructor(private news: NewsService,
              private formBuilder : FormBuilder,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { 
    this.newsFormGroup = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required]),
      subject: this.formBuilder.control('', [Validators.required]),
      content: this.formBuilder.control('', [Validators.required]),
    })
    // if url path is 'update/:id', initialize form group with news data from API
    if(this.activatedRoute.snapshot.url[0].path == 'update'){
      this.mode = editorModes.edit
      this.news.getNews(this.activatedRoute.snapshot.params.id).subscribe((blog: NewsResponse)=>{
        this.newsFormGroup.controls.title.setValue(blog.results[0].title);
        this.newsFormGroup.controls.subject.setValue(blog.results[0].subject);
        this.newsFormGroup.controls.content.setValue(blog.results[0].content)
      })
    }
  }

  /**
   * # Description
   * Retrieves the dialog pop-up message based on the current value of {@link mode}. Modes are enumerated in the `enum` {@link modes}
   * @returns message to be displayed in dialog
   */
  private getDialogMessage(): string{
    if(this.mode == editorModes.edit) return componentConfig.editMsg;
    else if(this.mode == editorModes.new) return componentConfig.createMsg;
    else return componentConfig.defaultMsg;
  }

  /**
   * # Description
   * Opens a {@link MatDialog} popup to confirm the user new story submission.
   */
  public confirmSubmission(): void{
    let msg = this.getDialogMessage();
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{ message: msg, type: dialogTypes.YesOrNo, route: null }, 
      width: componentConfig.dialogWidth, height: componentConfig.dialogHeight
    });
    dialogRef.afterClosed().subscribe((confirm:boolean)=>{
      if(confirm){ this.submit(); }
    })
  }

  /**
   * 
   * @returns 
   */
  private formToNews(): News{
    console.log(Object.values(this.sanitizer.bypassSecurityTrustHtml(this.newsFormGroup.controls.content.value))[0])
    return {
      news_id: null,
      title: this.newsFormGroup.controls.title.value,
      subject: this.newsFormGroup.controls.subject.value,
      content: Object.values(this.sanitizer.bypassSecurityTrustHtml(this.newsFormGroup.controls.content.value))[0],
      submitted: new Date().toISOString().slice(0, 10)
    }
  }

  /**
   * # Description
   * Post the news story held in {@link newsFormGroup}. `FormGroup` must be valid or else submission will not occur. If {@link mode}=='new', then a new submission will be made. If {@link mode}=='edit', then an existing submission determined by the path parameter passed in through {@link activatedRoute} will be updated.
   */
  public submit(): void {
    if(this.newsFormGroup.valid){
      if(this.mode == editorModes.new){
        this.news.postNews(this.formToNews()).subscribe((__: NewsPostResponse)=>{
          this.newsFormGroup.reset()
          this.snackBar.open(componentConfig.createAlert, 'OK')
        })
      }
      else if(this.mode == editorModes.edit){
        this.news.updateNews(this.activatedRoute.snapshot.params.id, this.formToNews())
          .subscribe((__: NewsPostResponse)=>{
            this.newsFormGroup.reset()
            this.snackBar.open(componentConfig.editAlert, 'OK')
          })
      }
    }
  }
}