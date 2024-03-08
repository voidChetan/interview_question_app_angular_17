import { Component, Input } from '@angular/core';
import { Question } from '../../model/language.model';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {
 
  @Input() question!: Question;
  
}
