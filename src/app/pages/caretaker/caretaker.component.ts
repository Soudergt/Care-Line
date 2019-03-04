import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Caretaker } from 'src/app/classes/caretaker';
import { CaretakerService } from 'src/app/providers/caretaker/caretaker.service';
import { FeedbackService } from 'src/app/providers/feedback/feedback.service';
import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-caretaker',
  templateUrl: './caretaker.component.html',
  styleUrls: ['./caretaker.component.scss']
})
export class CaretakerComponent implements OnInit {
  public feedbackForm: FormGroup;
  caretaker: Caretaker;
  newFeedback: any;
  faComment = faComment;
  showNewFeedback: boolean;
  comments: any[];
  sub: any;
  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private caretakerService: CaretakerService,
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder
  ) {
    this.feedbackForm = this.formBuilder.group({
      title: [''],
      desc: [''],
      rating: ['']
    });
  }

  ngOnInit() {
    this.showNewFeedback = false;
    this.newFeedback = {};

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getCaretaker(this.id);
    });
  }

  getCaretaker(id: string): void {
    this.caretakerService.getCaretaker(id).subscribe(caretaker => {
      this.caretaker = caretaker
    });
  }

  createFeedback() {
    this.showNewFeedback = false;
    this.newFeedback = {
      title: this.feedbackForm.value.title,
      desc: this.feedbackForm.value.desc,
      rating: this.feedbackForm.value.rating
    };

    this.feedbackService.addFeedback(this.newFeedback).subscribe((comment:any) => {
      this.comments.push(comment)
    });
    
    this.feedbackForm.reset();
  }

  addFeedback() {
    this.showNewFeedback = true;
  }

  cancelAddFeedback() {
    this.showNewFeedback = false;
    this.feedbackForm.reset();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  };

}
