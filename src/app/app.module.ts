import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule  } from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { BlankPageComponent } from './blank-page/blank-page.component';

import { RouterModule, Routes } from '@angular/router';
import { DataPageComponent } from './data-page/data-page.component';
import {MatTableModule} from '@angular/material/table';


const routes: Routes = [
  { path: '', component: BlankPageComponent },
  { path: 'dataPage/:dataType', component: DataPageComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    BlankPageComponent,
    DataPageComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
