import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { StatusService } from 'src/app/providers/status/status.service';
import { UserService } from 'src/app/providers/user/user.service';

import { User } from 'src/app/classes/user';
import { Status } from 'src/app/classes/status';

import { faNotesMedical, faInfo, faUtensils, faComments, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
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
  sub: any;
  id: string;
  //Icons
  faNotesMedical = faNotesMedical;
  faInfo = faInfo;
  faSmile = faSmile;
  faMeh = faMeh;
  faGrinBeam = faGrinBeam;
  faFrown = faFrown;
  faTired = faTired;
  faUtensils = faUtensils;
  faComments = faComments;
  faArrowCircleRight = faArrowCircleRight;
  
  //Note Values
  showNewNote: boolean;
  notes = [
    {
      title: 'Note 1',
      desc: 'Patient is feeling better today',
      mood: 'very good'
    },
    {
      title: 'Note 2',
      desc: 'Patient has a good appetite',
      mood: 'good'
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private statusService: StatusService,
    private formBuilder: FormBuilder
  ) {
    this.noteForm = this.formBuilder.group({
      title: [''],
      desc: [''],
      mood: ['']
    });
  }

  ngOnInit() {
    this.showNewNote = false;
    // this.selectedContact = null;
    this.selectedContact = {
      name: 'Frank'
    };
    
    this.activeDay = new Date();

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getPatient(JSON.parse(this.id));
    });
  };

  getPatient(id: number): void {
    this.userService.getUser(id).subscribe(patient => {
      this.patient = patient;
    });
  };

  selectContact(contact: any) {
    this.selectedContact = {
      name: 'Frank'
    };
  };

  getNotes(day: Date) {
    this.activeDay = day;
    let updatedDay = moment(day).toISOString();

    this.statusService.getStatus(this.id, updatedDay).subscribe(notes => {
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
    this.showNewNote = false;
    this.newNote = {
      HealthRating: this.noteForm.value.desc,
      BehaviorMood: this.noteForm.value.mood,
      Date: new Date()
    };

    this.statusService.addStatus(this.newNote)
      .subscribe(note => this.notes.push(note));
    
    this.noteForm.reset();
  };

  // editNote(selectedNote: Note, index: number) {
  //   this.statusService.editNote(selectedNote)
  //     .subscribe(note => this.notes[index] = {
  //       title: note['title'],
  //       desc: note['desc'],
  //       mood: note['mood']
  //     });
  // };

  // deleteNote(noteID: number, index: number) {
  //   this.notes.splice(index, 1);
  //   this.statusService.deleteNote(noteID).subscribe();
  // };

  ngOnDestroy() {
    this.sub.unsubscribe();
  };
}
 