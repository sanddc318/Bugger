import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { Bug } from '../model/bug';


@Injectable()
export class BugService {
  private bugsDbRef = this.fireService.database.ref('/bugs');

  constructor(private fireService: FirebaseConfigService) { }

  getAddedBugs(): Observable<any> {
    return Observable.create(obsv => {
      this.bugsDbRef.on('child_added', bug => {
        const newBug = bug.val() as Bug;
        obsv.next(newBug);
      },
      err => {
        obsv.throw(err);
      })
    });
  }
};
