import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeedbackService } from 'src/app/providers/feedback/feedback.service';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/providers/user/user.service';
import { User } from 'src/app/classes/user';
import { RatingService } from 'src/app/providers/rating/rating.service';
import * as moment from 'moment';

@Component({
  selector: 'app-caretaker',
  templateUrl: './caretaker.component.html',
  styleUrls: ['./caretaker.component.scss']
})
export class CaretakerComponent implements OnInit {
  public feedbackForm: FormGroup;
  caretaker: User;
  newFeedback: any;
  faComment = faComment;
  showNewFeedback: boolean;
  comments: any[];
  userPhoto: string;
  sub: any;
  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private feedbackService: FeedbackService,
    private ratingService: RatingService,
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
      this.getCaretaker(JSON.parse(this.id));
    });
  }

  getCaretaker(id: number): void {
    this.userService.getUser(id).subscribe(caretaker => {
      this.caretaker = caretaker
      this.userPhoto = `url(/assets/images/people/caretaker/${this.caretaker.NameFirst.toLowerCase()}${this.caretaker.NameLast.toLowerCase()}.png)`;
      console.log(this.caretaker);
    });
  }

  createRating() {
    this.showNewFeedback = false;
    this.newFeedback = {
      Title: this.feedbackForm.value.title,
      Desc: this.feedbackForm.value.desc,
      Rating: this.feedbackForm.value.rating,
      Date: moment().toISOString(),
      user: this.caretaker
    };

    console.log(this.newFeedback);

    // this.ratingService.addCaretakerRating(this.newFeedback).subscribe((comment:any) => {
    //   console.log(comment);
    //   this.comments.push(comment);
    // });
    // this.feedbackForm.reset();  
  }

  addRating() {
    this.showNewFeedback = true;
  }

  cancelAddRating() {
    this.showNewFeedback = false;
    this.feedbackForm.reset();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  };

}
