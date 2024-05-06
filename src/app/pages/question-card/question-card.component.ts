import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
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
  @Output() onCardClick = new EventEmitter<Question>();

  markRead(data: Question) {
    this.question.isRead = true;
    this.onCardClick.emit(data)
  }

  @HostListener('document:copy', ['$event'])
  onDocumentCopy(event: ClipboardEvent) { 
   // event.preventDefault();
  }

  @HostListener('document:paste', ['$event'])
  onDocumentPaste(event: ClipboardEvent) { 
    //event.preventDefault();
  }

  onCopy(event: ClipboardEvent) { 
    //event.preventDefault();
  }

  onPaste(event: ClipboardEvent) { 
    //event.preventDefault();
  }
}
