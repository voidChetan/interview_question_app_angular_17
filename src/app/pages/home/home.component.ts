import { Component, OnInit, inject } from '@angular/core';
import { InterviewService } from '../../service/interview.service';
import { APIResponsModel, ILanguage, LanguageTopic, Question } from '../../model/language.model';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { QuestionCardComponent } from '../question-card/question-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,QuestionCardComponent],
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


  ngOnInit(): void {
    this.loadLanguages();
  }

  loadLanguages() {
    this.service.getAllLanguage().subscribe((res:APIResponsModel)=>{
      this.languageList = res.data;
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
