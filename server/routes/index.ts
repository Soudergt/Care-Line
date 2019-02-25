import { UserRouter } from './User/user-router';
import { PatientRouter } from './Patient/patient-router';
import { ScheduleRouter } from './Schedule/schedule-router';
import { NoteRouter } from './Note/note-router';
import { AuthRouter } from './Auth/auth-router';


export default [
  PatientRouter,
  UserRouter,
  ScheduleRouter,
  NoteRouter,
  AuthRouter
];
