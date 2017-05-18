import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BugModule } from './bugs/bug.module';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  imports: [
    BrowserModule,
    BugModule,
    AppRouterModule,
    CoreModule.forRoot()
  ],
  declarations: [ AppComponent, NavbarComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule { };
