import { Component, HostListener, OnInit, inject } from '@angular/core';
import { InterviewService } from '../../service/interview.service';
import { APIResponsModel, ILanguage, LanguageTopic, Question } from '../../model/language.model';
import { CommonModule } from '@angular/common';
import { Observable, map, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { QuestionCountComponent } from '../question-count/question-count.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, QuestionCardComponent, QuestionCountComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  languageList: ILanguage[] = [];
  service = inject(InterviewService);
  topicList$: Observable<LanguageTopic[]> | undefined;
  selectedLanguage: number = 0;
  selectedTopic: number = 0;
  questionList: Question[] = [];
  questionCountList: Question[] = [];
  youtubeUrl: any;
  selectedTopicData!: LanguageTopic;
  languageTopiocList: LanguageTopic[] = [];
  showPlayer: boolean = false;

  constructor(private sanitizer: DomSanitizer) { }
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
    //event.preventDefault();
  }

  loadLanguages() {
    this.service.getAllLanguage().subscribe((res: APIResponsModel) => {
      this.languageList = res.data;
    })
  }

  getCount() {
    this.service.getQuestionCountByLanguage().subscribe((res: APIResponsModel) => {
      this.questionCountList = res.data.filter((item: any) => {
        if (item.language != null) {
          return item
        }
      })

    })
  }
  getyoutubeUrl() {
    debugger;
    let url = '';
    if (this.selectedLanguage != 0 && this.selectedTopic !== 0) {
      const getTopciUrl = this.languageTopiocList.find(m => m.languageTopicId == Number(this.selectedTopic));
      if (getTopciUrl && getTopciUrl?.youtubeVideoUrl !== '' && getTopciUrl?.youtubeVideoUrl !== null)
        url = `https://www.youtube.com/embed/${getTopciUrl?.youtubeVideoUrl}?autoplay=1`;
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    if (this.selectedLanguage != 0 && this.selectedTopic === 0) {
      const getTopciUrl = this.languageList.find(m => m.languageId == Number(this.selectedLanguage));
      if (getTopciUrl && getTopciUrl?.youtubePlayListUrl !== '' && getTopciUrl?.youtubePlayListUrl !== null)
        url = "https://www.youtube.com/embed/"+getTopciUrl?.youtubePlayListUrl;
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    setTimeout(() => {
      this.showPlayer = true;
    }, 2000);
  }

  onLanguageChange() {
    debugger;
    this.questionList = [];
    this.getyoutubeUrl();
    this.getQuesByLang(this.selectedLanguage)
    this.topicList$ = this.service.getTopicsBYLangId(this.selectedLanguage).pipe(
      map((item: APIResponsModel) => {
        return item.data;
      }),
      tap((data: any) => {
        this.languageTopiocList = data;
      })
    )
  }

  onTopicChange() {
    this.getyoutubeUrl();
    this.service.getQuestionBtTopicId(this.selectedTopic).subscribe((res: APIResponsModel) => {
      this.questionList = res.data;
    })
  }
  getQuesByLang(id: number) {
    this.service.getQuestionBtLangId(id).subscribe((res: APIResponsModel) => {
      this.questionList = res.data;
    })
  }
}
