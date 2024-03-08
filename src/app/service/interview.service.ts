import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponsModel } from '../model/language.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  apiEndPoint: string = "https://freeapi.gerasim.in/api/Interview/";

  constructor(private http: HttpClient) { }

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

  
}
