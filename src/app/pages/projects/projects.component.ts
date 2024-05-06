import { Component, inject, OnInit } from '@angular/core';
import { InterviewService } from '../../service/interview.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  service = inject(InterviewService);

  projects: any[] = [];
  ngOnInit(): void {
    this.getAllProject();
  }
  getAllProject() {
    this.service.getAllProjects().subscribe((res: any) => {
      this.projects = res.data;
    })
  }
}
