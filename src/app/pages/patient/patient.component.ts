import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { StatusService } from 'src/app/providers/status/status.service';
import { UserService } from 'src/app/providers/user/user.service';

import { User } from 'src/app/classes/user';
import { Status } from 'src/app/classes/status';

import { faNotesMedical, faInfo, faUtensils, faComments, faArrowCircleRight, faAngleLeft, faCommentMedical, faPrescriptionBottleAlt } from '@fortawesome/free-solid-svg-icons';
import { faSmile, faMeh, faGrinBeam, faFrown, faTired } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  public noteForm: FormGroup;
  moment = moment;
  activeDay: Date;
  newNote: any;
  selectedContact: any;
  //Patient Object
  patient: User;
  patientPhoto: string;
  sub: any;
  id: string;
  //Icons
  faNotesMedical = faNotesMedical;
  faCommentMedical = faCommentMedical;
  faPrescriptionBottleAlt = faPrescriptionBottleAlt;
  faInfo = faInfo;
  faSmile = faSmile;
  faMeh = faMeh;
  faGrinBeam = faGrinBeam;
  faFrown = faFrown;
  faTired = faTired;
  faUtensils = faUtensils;
  faComments = faComments;
  faArrowCircleRight = faArrowCircleRight;
  faAngleLeft = faAngleLeft;
  
  //Note Values
  showNewNote: boolean;
  notes: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private statusService: StatusService,
    private formBuilder: FormBuilder
  ) {
    this.noteForm = this.formBuilder.group({
      Title: [''],
      Concerns: [''],
      Activities: [''],
      Comments: [''],
      BehaviorMood: ['']
    });
  }

  ngOnInit() {
    this.showNewNote = false;
    this.selectedContact = null;
    // this.selectedContact = { name: 'Frank'};
    
    this.activeDay = new Date();

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getPatient(JSON.parse(this.id));
      this.getNotes();
    });
  };

  getPatient(id: number): void {
    this.userService.getUser(id).subscribe(patient => {
      this.patient = patient;
      this.patientPhoto = `url(/assets/images/people/patient/${this.patient.NameFirst.toLowerCase()}${this.patient.NameLast.toLowerCase()}.png)`;
    });
  };

  selectContact(contact: any) {
    this.selectedContact = {
      name: 'Frank'
    };
  };

  getNotes() {
    let updatedDay = moment(this.activeDay).hour(0).minutes(0).seconds(0).milliseconds(0);

    this.statusService.getStatus(JSON.parse(this.id), updatedDay.toISOString()).subscribe(notes => {
      this.notes = notes;
    });
  }

  getNotesForDay(day: any) {
    let updatedDay = moment(day).hour(0).minutes(0).seconds(0).milliseconds(0);

    this.statusService.getStatus(JSON.parse(this.id), updatedDay.toISOString()).subscribe(notes => {
      this.notes = notes;
    });
  }

  addNote() {
    this.showNewNote = true;
  };

  cancelAddNote() {
    this.showNewNote = false;
    this.noteForm.reset();
  };

  createNote() {
    if (this.noteForm.invalid) {
      return;
    }

    this.showNewNote = false;
    let newDate = moment().hour(0).minutes(0).seconds(0).milliseconds(0);

    this.newNote = {
      Title: this.noteForm.value.Title,
      Concerns: this.noteForm.value.Concerns,
      Activities: this.noteForm.value.Activities,
      Comments: this.noteForm.value.Comments,
      BehaviorMood: this.noteForm.value.BehaviorMood,
      Date: newDate.toISOString()
    };    

    this.statusService.addStatus(this.patient, this.newNote).subscribe(note => {
      this.notes.push(note);
    });
    
    this.noteForm.reset();
  };

  editNote(note: Status) {
    this.statusService.editStatus(note).subscribe(updatedNote => {
      console.log(updatedNote)
    });
  };

  deleteNote(note: Status) {
    this.statusService.deleteStatus(note).subscribe(removedNote => {
      console.log(removedNote);
    });
  };

  ngOnDestroy() {
    this.sub.unsubscribe();
  };
}
 