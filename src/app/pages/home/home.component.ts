import { Component, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { InterviewService } from '../../service/interview.service';
import { APIResponsModel, ILanguage, LanguageTopic, Question } from '../../model/language.model';
import { CommonModule } from '@angular/common';
import { Observable, map, of, tap, debounceTime, switchMap, distinctUntilChanged } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { QuestionCountComponent } from '../question-count/question-count.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NumbersOnlyDirective } from '../../shared/directives/numbers-only.directive';
import { CheckForDevModeDirective } from '../../shared/directives/check-for-dev-mode.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuestionCardComponent, QuestionCountComponent, NumbersOnlyDirective, CheckForDevModeDirective],
  templateUrl: './home.component.html',
  styles: [
    `p {color: blue;font-size: 18px}`, `.text-primary {color:blue}`
  ]
})
export class HomeComponent implements OnInit {

  // @ViewChild(QuestionCardComponent) questCard: QuestionCardComponent;

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
  stateName$: Observable<string> = of('Default text');
  searchText: string = '';

  questionSearch: FormControl = new FormControl('');

  constructor(private sanitizer: DomSanitizer) {
    this.questionSearch.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.service.getQuestionBysearchquery(query))
    ).subscribe((result: APIResponsModel) => {
      debugger;
      this.questionList = result.data.sort((a: Question, b: Question) => a.orderNo - b.orderNo);
    })

  }
  ngOnInit(): void {
    this.loadLanguages();
    this.getCount();
    this.getQuestionOnLangeChange();
  }
  isSticky: boolean = false;



  onQuestionClicked(data: any) {

  }
  loadLanguages() {
    this.service.getAllLanguage().subscribe((res: APIResponsModel) => {
      this.languageList = res.data;
    })
  }
  onSearch(search: string) {
    this.service.getQuestionBysearchquery(search).subscribe((res: APIResponsModel) => {
      debugger;
      this.questionList = res.data.sort((a: Question, b: Question) => a.orderNo - b.orderNo);
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

  getQuestionOnLangeChange() {
    this.service.selectedLanguage$.subscribe((languageId: number) => {
      debugger;
      this.questionList = [];
      this.getyoutubeUrl();
      this.getQuesByLang(languageId)
      this.topicList$ = this.service.getTopicsBYLangId(languageId).pipe(
        map((item: APIResponsModel) => {
          return item.data;
        }),
        tap((data: any) => {
          this.languageTopiocList = data.sort((a: LanguageTopic, b: LanguageTopic) => a.orderNo - b.orderNo);
        })
      )
    })
  }

  onLanguageChange() { 
    this.service.setSelectedLanguage(this.selectedLanguage); 
  }

  onTopicChange() {
    this.getyoutubeUrl();
    this.service.getQuestionBtTopicId(this.selectedTopic).subscribe((res: APIResponsModel) => {
      debugger;
      this.questionList = res.data.sort((a: Question, b: Question) => a.orderNo - b.orderNo);;
    })
  }
  getQuesByLang(id: number) {
    this.service.getQuestionBtLangId(id).subscribe((res: APIResponsModel) => {
      debugger;
      this.questionList = res.data;
    })
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 50;
  }
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: any) {
    //event.preventDefault();
  }
  getyoutubeUrl() {
    debugger;
    let url = '';
    this.showPlayer = false;
    if (this.selectedLanguage != 0 && this.selectedTopic !== 0) {
      const getTopciUrl = this.languageTopiocList.find(m => m.languageTopicId == Number(this.selectedTopic));
      if (getTopciUrl && getTopciUrl?.youtubeVideoUrl !== '' && getTopciUrl?.youtubeVideoUrl !== null)
        url = `https://www.youtube.com/embed/${getTopciUrl?.youtubeVideoUrl}?autoplay=1`;
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    if (this.selectedLanguage != 0 && this.selectedTopic === 0) {
      const getTopciUrl = this.languageList.find(m => m.languageId == Number(this.selectedLanguage));
      if (getTopciUrl && getTopciUrl?.youtubePlayListUrl !== '' && getTopciUrl?.youtubePlayListUrl !== null)
        url = "https://www.youtube.com/embed/" + getTopciUrl?.youtubePlayListUrl;
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    setTimeout(() => {
      this.showPlayer = true;
    }, 2000);
  }
}
