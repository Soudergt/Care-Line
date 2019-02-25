import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Note } from 'src/app/classes/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) { }

  getNotes(selectedDate: Date): Observable<Note> {
    return this.http.get<Note>(
      `${environment.api}/backend/note/getNotes?selectedDate=${selectedDate}`
    ); 
  }

  addNote(newNote: Note) {    
    return this.http.post<Note>(`${environment.api}/backend/note/addNote/`, newNote);
  }

  editNote(selectedNote: Note) {
    return this.http.put(`${environment.api}/backend/note/editNote/`, selectedNote);
  }

  deleteNote(uid: number) {
    return this.http.delete(`${environment.api}/backend/note/deleteNote/${uid}`);    
  }
}
