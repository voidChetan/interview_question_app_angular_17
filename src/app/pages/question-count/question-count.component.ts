import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
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

  student: any = {
    name:'',
    city:'',
    address: {
      city:'',
      pincode:'',
      contant: {
        mobileNo1: '',
        mobileno2: ''
      }
    }
  }

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
