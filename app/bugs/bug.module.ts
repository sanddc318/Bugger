import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BugRouterModule } from './bug-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { BugListComponent } from './bug-list/bug-list.component';
import { BugDetailComponent } from './bug-detail/bug-detail.component';

import { BugService } from './service/bug.service';


@NgModule({
  imports: [ SharedModule, BugRouterModule, ReactiveFormsModule ],
  declarations: [ BugListComponent, BugDetailComponent ],
  exports: [ ],
  providers: [ BugService ]
})

export class BugModule { };
