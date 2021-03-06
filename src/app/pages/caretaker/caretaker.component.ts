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
  activeUser: any;
  newFeedback: any;
  faComment = faComment;
  showNewFeedback: boolean;
  showCreateRating: boolean;
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
      rating: []
    });
  }

  ngOnInit() {
    this.comments = [];
    this.showNewFeedback = false;
    this.newFeedback = {};

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getCaretaker(JSON.parse(this.id));
      this.getCaretakerRatings(this.id);
    });
  }

  getActiveUser(): void {
    this.userService.getActiveUser().subscribe(user => {
      this.activeUser = user;
      if (this.activeUser.UserType.toLowerCase() !== 'caretaker') {
        this.showCreateRating = true;
      }
    });
  }

  getCaretaker(id: number): void {
    this.userService.getUser(id).subscribe(caretaker => {
      this.caretaker = caretaker
      this.userPhoto = `url(/assets/images/people/caretaker/${this.caretaker.NameFirst.toLowerCase()}${this.caretaker.NameLast.toLowerCase()}.png)`;
    });
  }

  getCaretakerRatings(id: string): void {
    this.ratingService.getCaretakerRatings(id).subscribe(ratings => {
      this.comments = ratings;
    });
  }

  getRating(rating: number) {
    this.feedbackForm.value.rating = rating;
  }

  createRating() {
    this.showNewFeedback = false;
    let newDate = moment().hour(0).minutes(0).seconds(0).milliseconds(0);

    this.newFeedback = {
      Title: this.feedbackForm.value.title,
      Desc: this.feedbackForm.value.desc,
      Rating: this.feedbackForm.value.rating,
      Date: newDate.toISOString(),
      user: this.caretaker
    };

    this.ratingService.addCaretakerRating(this.newFeedback).subscribe((comment:any) => {
      console.log(comment);
      this.comments.push(comment);
    });
    this.feedbackForm.reset();  
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
