import { Component, HostListener, OnInit, inject } from '@angular/core';
import { InterviewService } from '../../service/interview.service';
import { APIResponsModel, ILanguage, LanguageTopic, Question } from '../../model/language.model';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { QuestionCountComponent } from '../question-count/question-count.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,QuestionCardComponent,QuestionCountComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  languageList: ILanguage[]= [];
  service = inject(InterviewService);
  topicList$ : Observable<LanguageTopic[]> | undefined;
  selectedLanguage: number = 0;
  selectedTopic: number = 0;
  questionList: Question[] = [];
  questionCountList: Question[] = [];

  ngOnInit(): void {
    this.loadLanguages();
    this.getCount();
  }
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 50;
  }
  @HostListener('contextmenu', ['$event'])
onRightClick(event: any) {
  event.preventDefault();
}

  loadLanguages() {
    this.service.getAllLanguage().subscribe((res:APIResponsModel)=>{
      this.languageList = res.data;
    })
  }

  getCount() {
    this.service.getQuestionCountByLanguage().subscribe((res:APIResponsModel)=>{
     this.questionCountList =  res.data.filter((item:any)=>{
        if(item.language != null) {
          return item
        }
      })
     
    })
  }

  onLanguageChange(event: any) {
   debugger;
   this.questionList = [];
   this.getQuesByLang(event)
   this.topicList$ = this.service.getTopicsBYLangId(event).pipe(
    map((item:APIResponsModel)=> {
      return item.data
    })
   )
  }

  onTopicChange() {
    this.service.getQuestionBtTopicId(this.selectedTopic).subscribe((res:APIResponsModel)=>{
      this.questionList =  res.data;
    })
  }
  getQuesByLang(id: number) {
    this.service.getQuestionBtLangId(id).subscribe((res:APIResponsModel)=>{
      this.questionList =  res.data;
    })
  }
}
