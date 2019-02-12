import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { PatientComponent } from './pages/patient/patient.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ClinicComponent } from './pages/clinic/clinic.component';
import { CaretakerComponent } from './pages/caretaker/caretaker.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'patient/:id', component:  PatientComponent },
  { path: 'caretaker/:id', component:  CaretakerComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'clinic/:id', component: ClinicComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
