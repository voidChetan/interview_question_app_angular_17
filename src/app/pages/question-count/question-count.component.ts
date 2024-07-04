import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InterviewService } from '../../service/interview.service';

@Component({
  selector: 'app-question-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-count.component.html',
  styleUrl: './question-count.component.css'
})
export class QuestionCountComponent implements OnChanges {
  @Input() languageCountList: any [] = [];

  loader: boolean = true;
  constructor(private service: InterviewService){}
   
  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  onLanguageSelect(languageId: number) {
    this.service.setSelectedLanguage(languageId)
  }

}
