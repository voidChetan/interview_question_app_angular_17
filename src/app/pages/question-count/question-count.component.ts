import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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
   
  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

}
