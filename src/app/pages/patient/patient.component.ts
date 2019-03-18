import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faNotesMedical, faInfo, faUtensils, faComments, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faSmile, faMeh, faGrinBeam, faFrown, faTired } from '@fortawesome/free-regular-svg-icons';
import { NoteService } from 'src/app/providers/note/note.service';
import { Note } from 'src/app/classes/note';
import { UserService } from 'src/app/providers/user/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  public noteForm: FormGroup;
  activeDay: Date;
  newNote: Note;
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
  selectedContact;
  
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
    private noteService: NoteService,
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
      console.log(this.patient);
    });
  };

  selectContact(contact: any) {
    this.selectedContact = {
      name: 'Frank'
    };
  };

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
      title: this.noteForm.value.title,
      desc: this.noteForm.value.desc,
      mood: this.noteForm.value.mood
    };

    this.noteService.addNote(this.newNote)
      .subscribe(note => this.notes.push(note));
    
    this.noteForm.reset();
  };

  editNote(selectedNote: Note, index: number) {
    this.noteService.editNote(selectedNote)
      .subscribe(note => this.notes[index] = {
        title: note['title'],
        desc: note['desc'],
        mood: note['mood']
      });
  };

  deleteNote(noteID: number, index: number) {
    this.notes.splice(index, 1);
    this.noteService.deleteNote(noteID).subscribe();
  };

  ngOnDestroy() {
    this.sub.unsubscribe();
  };
}
 