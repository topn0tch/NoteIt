import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private BASE_URL = "http://localhost:8082/api";
  private SEND_FEEDBACK_URL = `${this.BASE_URL}\\feedback`;

  constructor(private http:HttpClient) {

  }

  postFeedback(feedback: FeedbackViewModel) : Observable<any> {
    return this.http.post(this.SEND_FEEDBACK_URL, feedback);
  }

}
