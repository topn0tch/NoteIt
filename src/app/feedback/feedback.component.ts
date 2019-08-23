import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FeedbackService} from "../shared/feedback.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  model:FeedbackViewModel = {
    name: '',
    email: '',
    feedback: ''
  };

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
  }

  sendFeedback(): void {
    this.feedbackService.postFeedback(this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert("An error has occured while sending feedback.")
      }
    )
  }

}

export interface FeedbackViewModel {
  name: String;
  email: String;
  feedback: String;
}
