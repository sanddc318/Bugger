import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BugRouterModule } from './bug-routing.module';

import { BugListComponent } from './bug-list/bug-list.component';

@NgModule({
  imports: [ SharedModule, BugRouterModule ],
  declarations: [ BugListComponent ],
  exports: [ ],
  providers: [ ]
})

export class BugModule { };
