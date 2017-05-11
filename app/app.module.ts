import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BugModule } from './bugs/bug.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [ BrowserModule, BugModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule {};
