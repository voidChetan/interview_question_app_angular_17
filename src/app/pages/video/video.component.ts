import { Component, OnInit } from '@angular/core';
import { InterviewService, VideoDetails } from '../../service/interview.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video', 
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {
  videoDetailsList: VideoDetails[] = [];
  selectedVideoDetail: VideoDetails = {
    id: 0,
    title: '',
    url: '',
    liveVersion: '',
    videoType: '',
    apiSwaggerUrl: '',
    duration: '',
    description: ''
  };
  isEditMode = false;
  title: string ='';
  videoTye: string = '';
  constructor(private videoDetailsService: InterviewService) {}

  ngOnInit(): void {
    this.loadVideoDetails();
  }
  getSearch() {
    if(this.title !='') {
      this.videoDetailsService.getVideoByTitle(this.title).subscribe((data:any) => {
        this.videoDetailsList = data.data;
      });
    } 
    if( this.videoTye != '') {
      this.videoDetailsService.getVideoByuType(this.videoTye).subscribe((data:any) => {
        this.videoDetailsList = data.data;
      });
    }
  }

  // Load all video details
  loadVideoDetails() {
    this.title = '';
    this.videoTye = '';
    this.videoDetailsService.getAllVideos().subscribe((data:any) => {
      this.videoDetailsList = data.data;
    });
  }

  // Select video detail for editing
  selectVideoDetail(videoDetail: VideoDetails) {
    this.selectedVideoDetail = { ...videoDetail };
    this.isEditMode = true;
  }

  // Clear form
  clearForm() {
    this.selectedVideoDetail = {
      id: 0,
      title: '',
      url: '',
      liveVersion: '',
      videoType: '',
      apiSwaggerUrl: '',
      duration: '',
      description: ''
    };
    this.isEditMode = false;
  }

  // Add or update video detail
  saveVideoDetail() {
    if (this.isEditMode) {
      // Update existing video detail
      this.videoDetailsService.updateVideoDetail(this.selectedVideoDetail.id, this.selectedVideoDetail).subscribe(() => {
        this.loadVideoDetails();
        this.clearForm();
      });
    } else {
      // Create new video detail
      this.videoDetailsService.createVideoDetail(this.selectedVideoDetail).subscribe(() => {
        this.loadVideoDetails();
        this.clearForm();
      });
    }
  }

  // Delete video detail
  deleteVideoDetail(id: number) {
    this.videoDetailsService.deleteVideoDetail(id).subscribe(() => {
      this.loadVideoDetails();
    });
  }
}
