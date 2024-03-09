export interface ILanguage {
    languageId: number;
    language: string;
    logo: string;
}

export interface APIResponsModel {
    message: string;
    result: boolean;
    data: any;
}

export interface LanguageTopic {

    languageTopicId: number;
    languageId: number;
    topicName: string;
    orderNo: number;

}

export interface Question {
    question: string
    answer: string
    isRead: boolean
    topicName: string
    languageTopicId: number
    questionId: number
    language: string
    languageId: number
    orderNo: number
    logo: string
  }