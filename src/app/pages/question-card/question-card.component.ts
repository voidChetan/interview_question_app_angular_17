import { Component, Input } from '@angular/core';
import { Question } from '../../model/language.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {
 
  @Input() question!: Question;
  markRead() {
    this.question.isRead = true;
  }
}
