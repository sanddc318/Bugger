import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BugModule } from './bugs/bug.module';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [ BrowserModule, BugModule, AppRouterModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule { };
