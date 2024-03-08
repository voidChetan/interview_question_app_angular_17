import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-count.component.html',
  styleUrl: './question-count.component.css'
})
export class QuestionCountComponent {
  @Input() languageCountList: any [] = [];

}
