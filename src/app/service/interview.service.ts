import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIResponsModel } from '../model/language.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  apiEndPoint: string = "https://freeapi.gerasim.in/api/Interview/";
  apiEndPoint2: string = "https://freeapi.gerasim.in/api/miniproject/";

  selectedLanguage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  


  constructor(private http: HttpClient) { }

  setSelectedLanguage(languageId: number) {
    debugger;
    this.selectedLanguage$.next(languageId);
  }

  readSelectedLanguage() {
    return this.selectedLanguage$;
  }

  private apiUrl = 'https://projectapi.gerasim.in/api/BudgetPlanner/'; // Adjust to your API URL


  getAllLanguage(): Observable<APIResponsModel> {
    return this.http.get<APIResponsModel>(this.apiEndPoint +"GetAllLanguage");
  }

  getTopicsBYLangId(langId: number): Observable<APIResponsModel> {
    return this.http.get<APIResponsModel>(this.apiEndPoint +"GetLanguageTopicById?id=" +langId );
  } 

  getQuestionBtTopicId(topicId: number): Observable<APIResponsModel> {
    return this.http.get<APIResponsModel>(this.apiEndPoint +"GetQuestionByTopicId?id=" +topicId );
  }  
  getQuestionBtLangId(langId: number): Observable<APIResponsModel> {
    return this.http.get<APIResponsModel>(this.apiEndPoint +"GetAllQuestionsByLanguageId?id=" +langId );
  }  

  getQuestionCountByLanguage(): Observable<APIResponsModel> {
    return this.http.get<APIResponsModel>(this.apiEndPoint +"GetQuestionCountByLanguage");
  }
  getQuestionBysearchquery(str: string): Observable<APIResponsModel> {
    return this.http.get<APIResponsModel>(this.apiEndPoint +"search?searchquery="+str);
  }
  getAllProjects() {
    return this.http.get(this.apiEndPoint2 +"GetAllProjects")
  }
  getAllVideos(): Observable<VideoDetails[]> {
    return this.http.get<VideoDetails[]>(this.apiUrl+'getAllVideos');
  }
  getVideoByTitle(title: string): Observable<VideoDetails[]> {
    return this.http.get<VideoDetails[]>(this.apiUrl+'getAllVideos?title='+title);
  }
  getVideoByuType(title: string): Observable<VideoDetails[]> {
    return this.http.get<VideoDetails[]>(this.apiUrl+'getAllVideos?videoType='+title);
  }

  // Get video detail by ID
  getVideoDetail(id: number): Observable<VideoDetails> {
    return this.http.get<VideoDetails>(`${this.apiUrl}/${id}`);
  }

  // Create new video detail
  createVideoDetail(videoDetail: VideoDetails): Observable<VideoDetails> {
    return this.http.post<VideoDetails>(this.apiUrl +'AddNewvideo', videoDetail);
  }

  // Update existing video detail
  updateVideoDetail(id: number, videoDetail: VideoDetails): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}updateVideo/`, videoDetail);
  }

  // Delete video detail
  deleteVideoDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}deletVideo?id=${id}`);
  }
  
}

export interface VideoDetails {
  id: number;
  title: string;
  url: string;
  liveVersion: string;
  videoType: string;
  apiSwaggerUrl: string;
  duration: string;
  description: string;
}