import { PatientService } from './../../providers/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faNotesMedical, faInfo, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faSmile, faMeh, faGrinBeam, faFrown, faTired } from '@fortawesome/free-regular-svg-icons';
import { Patient } from 'src/app/classes/patient';
import { NoteService } from 'src/app/providers/note/note.service';
import { Note } from 'src/app/classes/note';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  public noteForm: FormGroup;
  newNote: Note;
  //Patient Object
  patient: Patient;
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
    private patientService:PatientService,
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

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getPatient(this.id);
    });
  };

  getPatient(id: string): void {
    this.patientService.getPatient(id).subscribe(patient => {
      this.patient = patient
    });
  }

  addNote() {
    this.showNewNote = true;
  }

  cancelAddNote() {
    this.showNewNote = false;
    this.noteForm.reset();
  }

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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  };
}
 