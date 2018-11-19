import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { TextFieldModule } from '@angular/cdk/text-field';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LogindialogComponent } from './components/logindialog/logindialog.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { PatientComponent } from './pages/patient/patient.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    ContactComponent,
    TopbarComponent,
    LogindialogComponent,
    UserDashboardComponent,
    CardListComponent,
    PatientComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDividerModule,
    MatTableModule,
    MatListModule,
    TextFieldModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FontAwesomeModule,
    RoundProgressModule
  ],
  providers: [],
  entryComponents: [
    LogindialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
