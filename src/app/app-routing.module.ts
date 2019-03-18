import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { PatientComponent } from './pages/patient/patient.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ClinicComponent } from './pages/clinic/clinic.component';
import { CaretakerComponent } from './pages/caretaker/caretaker.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
  { path: 'patient/:id', component:  PatientComponent, canActivate: [AuthGuard] },
  { path: 'caretaker/:id', component:  CaretakerComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clinic/:id', component: ClinicComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
