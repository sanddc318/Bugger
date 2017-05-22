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
        newBug.id = bug.key; // Add id to Bug model
        obsv.next(newBug);
      },
      err => {
        obsv.throw(err);
      });
    });
  }

  onChangeListener(): Observable<any> {
    return Observable.create(obsv => {
      this.bugsDbRef.on('child_changed', bug => {
        const updatedBug = bug.val() as Bug;
        updatedBug.id = bug.key;
        obsv.next(updatedBug);
      },
      err => {
        obsv.throw(err);
      });
    });
  }

  onDeleteListener(): Observable<any> {
    return Observable.create(obsv => {
      this.bugsDbRef.on('child_removed', bug => {
        const deletedBug = bug.val() as Bug;
        deletedBug.id = bug.key;
        obsv.next(deletedBug);
      },
      err => {
        obsv.throw(err);
      });
    });
  }

  addBug(bug: Bug) {
    const newBugRef = this.bugsDbRef.push();
    newBugRef.set({
      title: bug.title,
      status: bug.status,
      severity: bug.severity,
      description: bug.description,
      createdBy: 'Dontavious',
      createdDate: Date.now()
    }).catch(err =>
      console.error('Unable to add bug to Firebase - ', err));
  }

  updateBug(bug: Bug) {
    const currentBugRef = this.bugsDbRef.child(bug.id);
    bug.id = null; // Remove id so firease doesn't duplicate
    bug.updatedBy = "Joe"; // Set updating user (hard coded because no auth yet)
    bug.updatedDate = Date.now();

    currentBugRef.update(bug);
  }

  deleteBug(bug: Bug) {
    const currentBugRef = this.bugsDbRef.child(bug.id);
    bug.id = null;

    currentBugRef.remove()
      .catch(err =>
      console.error('Unable to delete bug from Firebase - ', err));
  }
};
